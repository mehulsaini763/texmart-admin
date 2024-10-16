import mongoose from 'mongoose';
import Product from '@/models/products.model';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';

// GET PRODUCT
export const GET = async (req, { params }) => {
  try {
    const { productId } = params;

    if (!mongoose.isValidObjectId(productId)) {
      return Response.json({ success: false, message: 'Invalid Product Id' }, { status: 400 });
    }

    await dbConnect();
    const product = await Product.findById(productId);

    return Response.json({ message: 'Product Fetched', data: product, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};

// UPDATE PRODUCT
export const PATCH = async (req, { params }) => {
  try {
    const { productId } = params;
    const data = await req.json();

    if (!mongoose.isValidObjectId(productId)) {
      return Response.json({ success: false, message: 'Invalid Product Id' }, { status: 400 });
    }
    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' }, { status: 400 });
    }

    await dbConnect();
    const product = await Product.findByIdAndUpdate(productId, data);

    return Response.json({ message: 'Product Updated', data: product, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};

// DELETE PRODUCT
export const DELETE = async (req, { params }) => {
  try {
    const { productId } = params;

    if (!mongoose.isValidObjectId(productId)) {
      return Response.json({ success: false, message: 'Invalid Product Id' }, { status: 400 });
    }

    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' });
    }

    await dbConnect();
    const product = await Product.findByIdAndDelete(productId);

    return Response.json({ message: 'Product Deleted', data: product, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};
