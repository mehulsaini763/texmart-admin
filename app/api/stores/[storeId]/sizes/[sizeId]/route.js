import mongoose from 'mongoose';
import Size from '@/models/sizes.model';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';

// GET SIZE
export const GET = async (req, { params }) => {
  try {
    const { sizeId } = params;

    if (!mongoose.isValidObjectId(sizeId)) {
      return Response.json({ success: false, message: 'Invalid Size Id' }, { status: 400 });
    }

    await dbConnect();
    const size = await Size.findById(sizeId);

    return Response.json({ message: 'Size Fetched', data: size, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};

// UPDATE SIZE
export const PATCH = async (req, { params }) => {
  try {
    const { sizeId } = params;
    const data = await req.json();

    if (!mongoose.isValidObjectId(sizeId)) {
      return Response.json({ success: false, message: 'Invalid Size Id' }, { status: 400 });
    }
    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' }, { status: 400 });
    }

    await dbConnect();
    const size = await Size.findByIdAndUpdate(sizeId, data);

    return Response.json({ message: 'Size Updated', data: size, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};

// DELETE SIZE
export const DELETE = async (req, { params }) => {
  try {
    const { sizeId } = params;

    if (!mongoose.isValidObjectId(sizeId)) {
      return Response.json({ success: false, message: 'Invalid Size Id' }, { status: 400 });
    }

    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' });
    }

    await dbConnect();
    const size = await Size.findByIdAndDelete(sizeId);

    return Response.json({ message: 'Size Deleted', data: size, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};
