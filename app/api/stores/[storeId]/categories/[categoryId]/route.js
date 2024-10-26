import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Category from '@/models/categories.model';
import Billboard from '@/models/billboards.model';
import { auth } from '@/lib/auth';

// GET CATEGORY
export const GET = async (req, { params }) => {
  try {
    const { categoryId } = params;

    if (!mongoose.isValidObjectId(categoryId)) {
      return Response.json({ success: false, message: 'Invalid Category Id' }, { status: 400 });
    }

    await dbConnect();
    const category = await Category.findById(categoryId).populate('billboardId');

    return Response.json({ message: 'Category Fetched', data: category, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: 'Some Error Occurred' }, { status: 400 });
  }
};

// UPDATE CATEGORY
export const PATCH = async (req, { params }) => {
  try {
    const { categoryId } = params;
    const data = await req.json();

    if (!mongoose.isValidObjectId(categoryId)) {
      return Response.json({ success: false, message: 'Invalid Category Id' }, { status: 400 });
    }

    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' });
    }

    await dbConnect();
    const category = await Category.findByIdAndUpdate(categoryId, data);

    return Response.json({ message: 'Category Updated', data: category, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: 'Some Error Occurred' }, { status: 400 });
  }
};

// DELETE CATEGORY
export const DELETE = async (req, { params }) => {
  const { categoryId } = params;

  if (!mongoose.isValidObjectId(categoryId)) {
    return Response.json({ success: false, message: 'Invalid Category Id' }, { status: 400 });
  }

  const { user } = await auth();

  if (!user) {
    return Response.json({ success: false, message: 'Invalid User' });
  }

  await dbConnect();
  const category = await Category.findByIdAndDelete(categoryId);

  return Response.json({ message: 'Category Deleted', data: category, success: true }, { status: 201 });
};
