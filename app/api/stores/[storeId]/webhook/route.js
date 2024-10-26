import Order from '@/models/orders.model';
import { NextResponse } from 'next/server';

export const POST = async (req, { params }) => {
  try {
    const { storeId } = params;
    const data = await req.json();
    console.log(data);

    const paymentId = data.payload.payment_link.entity.id;
    const status = data.payload.payment_link.entity === 'paid';
    console.log(status);

    const order = await Order.findOneAndUpdate({ storeId, paymentId }, { isPaid: status });
    console.log(order);

    return NextResponse.json({ success: true, message: 'Order Paid' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 400 });
  }
};
