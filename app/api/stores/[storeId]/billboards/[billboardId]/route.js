import mongoose from 'mongoose';
import Billboard from '@/models/billboards.model';
import dbConnect from '@/lib/db';
import { auth } from '@/lib/auth';

// GET BILLBOARD
export const GET = async (req, { params }) => {
  try {
    const { billboardId } = params;

    if (!mongoose.isValidObjectId(billboardId)) {
      return Response.json({ success: false, message: 'Invalid Billboard Id' }, { status: 400 });
    }

    await dbConnect();
    const billboard = await Billboard.findById(billboardId);

    return Response.json({ message: 'Billboard Fetched', data: billboard, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: 'Some Error Occurred' }, { status: 400 });
  }
};

// UPDATE BILLBOARD
export const PATCH = async (req, { params }) => {
  try {
    const { billboardId } = params;
    const data = await req.json();

    if (!mongoose.isValidObjectId(billboardId)) {
      return Response.json({ success: false, message: 'Invalid Billboard Id' }, { status: 400 });
    }

    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' });
    }

    await dbConnect();
    const billboard = await Billboard.findByIdAndUpdate(billboardId, data);

    return Response.json({ message: 'Billboard Updated', data: billboard, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: 'Some Error Occurred' }, { status: 400 });
  }
};

// DELETE BILLBOARD
export const DELETE = async (req, { params }) => {
  try {
    const { billboardId } = params;

    if (!mongoose.isValidObjectId(billboardId)) {
      return Response.json({ success: false, message: 'Invalid Billboard Id' }, { status: 400 });
    }

    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' });
    }

    await dbConnect();
    const billboard = await Billboard.findByIdAndDelete(billboardId);

    return Response.json({ message: 'Billboard Deleted', data: billboard, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: 'Some Error Occurred' }, { status: 400 });
  }
};
