import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Product from '@/models/products.model';
import Category from '@/models/categories.model';
import Size from '@/models/sizes.model';
import Color from '@/models/colors.model';
import mongoose from 'mongoose';

// GET PRODUCTS
export const GET = async (req, { params }) => {
  try {
    const { storeId } = params;
    const { searchParams } = new URL(req.url);
    const query = { storeId };
    if (searchParams.get('categoryId')) query.categoryId = searchParams.get('categoryId');
    if (searchParams.get('sizeId')) query.sizeId = searchParams.get('sizeId');
    if (searchParams.get('colorId')) query.colorId = searchParams.get('colorId');
    if ([true, false].includes(searchParams.get('isFeatured'))) query.isFeatured = searchParams.get('isFeatured');

    if (!mongoose.isValidObjectId(storeId)) {
      return Response.json({ success: false, message: 'Invalid Product Id' }, { status: 400 });
    }

    await dbConnect();
    const products = await Product.find(query).populate(['categoryId', 'sizeId', 'colorId']);

    return Response.json({ message: 'Product Fetched', data: products, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: 'Some Error Occurred' }, { status: 400 });
  }
};

// CREATE PRODUCT
export const POST = async (req) => {
  try {
    const data = await req.json();
    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' }, { status: 400 });
    }

    await dbConnect();
    const product = await Product.create(data);

    return Response.json({ message: 'Product Created', data: product, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};
