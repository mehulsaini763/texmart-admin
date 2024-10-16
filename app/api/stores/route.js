import Store from '@/models/stores.model';
import dbConnect from '@/lib/db';
import { auth } from '@/lib/auth';

// CREATE STORE
export const POST = async (req) => {
  try {
    const data = await req.json();
    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' });
    }

    await dbConnect();
    const store = await Store.create({ userId: user.id, ...data });

    return Response.json({ message: 'Store Created', data: store, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occured' }, { status: 400 });
  }
};
