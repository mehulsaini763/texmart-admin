import mongoose from 'mongoose';
import { auth } from '@/lib/auth';
import Store from '@/models/stores.model';
import dbConnect from '@/lib/db';

// GET STORE
export const GET = async (req, { params }) => {
  try {
    const { storeId } = params;

    if (!mongoose.isValidObjectId(storeId)) {
      return Response.json({ success: false, message: 'Invalid Store Id' }, { status: 400 });
    }

    await dbConnect();
    const store = await Store.findById(storeId);

    return Response.json({ message: 'Store Fetched', data: store, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};

// UPDATE STORE
export const PATCH = async (req, { params }) => {
  try {
    const { storeId } = params;
    const data = await req.json();

    if (!mongoose.isValidObjectId(storeId)) {
      return Response.json({ success: false, message: 'Invalid Store Id' }, { status: 400 });
    }

    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' }, { status: 400 });
    }

    await dbConnect();
    const store = await Store.findByIdAndUpdate(storeId, data);

    return Response.json({ message: 'Store Updated', data: store, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};

// DELETE STORE
export const DELETE = async (req, { params }) => {
  try {
    const { storeId } = params;

    if (!mongoose.isValidObjectId(storeId)) {
      return Response.json({ success: false, message: 'Invalid Store Id' }, { status: 400 });
    }

    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' }, { status: 400 });
    }

    await dbConnect();
    const store = await Store.findByIdAndDelete(storeId);

    return Response.json({ message: 'Store Deleted', data: store, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};
