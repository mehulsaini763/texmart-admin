import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Color from '@/models/colors.model';
import { auth } from '@/lib/auth';

// GET COLOR
export const GET = async (req, { params }) => {
  try {
    const { colorId } = params;

    if (!mongoose.isValidObjectId(colorId)) {
      return Response.json({ success: false, message: 'Invalid Color Id' }, { status: 400 });
    }

    await dbConnect();
    const color = await Color.findById(colorId);

    return Response.json({ message: 'Color Fetched', data: color, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};

// UPDATE COLOR
export const PATCH = async (req, { params }) => {
  try {
    const { colorId } = params;
    const data = await req.json();

    if (!mongoose.isValidObjectId(colorId)) {
      return Response.json({ success: false, message: 'Invalid Color Id' }, { status: 400 });
    }
    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' }, { status: 400 });
    }

    await dbConnect();
    const color = await Color.findByIdAndUpdate(colorId, data);

    return Response.json({ message: 'Color Updated', data: color, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};

// DELETE COLOR
export const DELETE = async (req, { params }) => {
  try {
    const { colorId } = params;

    if (!mongoose.isValidObjectId(colorId)) {
      return Response.json({ success: false, message: 'Invalid Color Id' }, { status: 400 });
    }

    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' });
    }

    await dbConnect();
    const color = await Color.findByIdAndDelete(colorId);

    return Response.json({ message: 'Color Deleted', data: color, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};
