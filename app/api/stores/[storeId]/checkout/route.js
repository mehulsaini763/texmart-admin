import { razorpay } from '@/lib/razorpay';
import Product from '@/models/products.model';
import Order from '@/models/orders.model';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req, { params }) {
  try {
    const { storeId } = params;
    const { productIds, address, phone } = await req.json();

    if (!productIds || productIds.length === 0) {
      return new NextResponse('Product ids are required', { status: 400 });
    }

    if (!storeId || !address) {
      return new NextResponse('Store ID, phone, and address are required', { status: 400 });
    }

    await dbConnect();
    // Fetch products and calculate total amount
    const products = await Product.find({ _id: { $in: productIds } });

    if (!products || products.length === 0) {
      return new NextResponse('Products not found', { status: 404 });
    }

    const orderItems = products.map((product) => product._id);
    const totalAmount = products.reduce((sum, product) => sum + product.price, 0) * 100; // Razorpay expects amount in paise

    // Create Razorpay payment link
    const paymentLinkOptions = {
      amount: totalAmount,
      currency: 'INR',
      description: 'Order Payment',
      customer: {
        contact: phone,
      },
      callback_url: `${process.env.FRONTEND_URL}/cart`, // Customize this URL
      callback_method: 'get',
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkOptions);

    const paymentId = paymentLink.id;
    const url = paymentLink.short_url;

    // Create the order
    await Order.create({
      storeId,
      orderItems,
      isPaid: false,
      phone,
      paymentId,
      address,
    });

    return NextResponse.json({ url }, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.log(error);
    return new NextResponse(`Error creating order or payment link: ${error.message}`, { status: 500, headers: corsHeaders });
  }
}
