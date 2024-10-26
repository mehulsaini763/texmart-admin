import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Size from '@/models/sizes.model';
import mongoose from 'mongoose';

// GET SIZES
export const GET = async (req, { params }) => {
  try {
    const { storeId } = params;

    if (!mongoose.isValidObjectId(storeId)) {
      return Response.json({ success: false, message: 'Invalid Size Id' }, { status: 400 });
    }

    await dbConnect();
    const sizes = await Size.find({ storeId });

    return Response.json({ message: 'Size Fetched', data: sizes, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: 'Some Error Occurred' }, { status: 400 });
  }
};

// CREATE SIZE
export const POST = async (req) => {
  try {
    const data = await req.json();
    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' }, { status: 400 });
    }

    await dbConnect();
    const size = await Size.create(data);

    return Response.json({ message: 'Size Created', data: size, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};
