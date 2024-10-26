import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Color from '@/models/colors.model';
import mongoose from 'mongoose';

// GET COLORS
export const GET = async (req, { params }) => {
  try {
    const { storeId } = params;

    if (!mongoose.isValidObjectId(storeId)) {
      return Response.json({ success: false, message: 'Invalid Color Id' }, { status: 400 });
    }

    await dbConnect();
    const colors = await Color.find({ storeId });

    return Response.json({ message: 'Color Fetched', data: colors, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: 'Some Error Occurred' }, { status: 400 });
  }
};

// CREATE COLOR
export const POST = async (req) => {
  try {
    const data = await req.json();
    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' }, { status: 400 });
    }

    await dbConnect();
    const color = await Color.create(data);

    return Response.json({ message: 'Color Created', data: color, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};
