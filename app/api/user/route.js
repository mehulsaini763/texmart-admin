import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/users.model';

export const PATCH = async (req) => {
  try {
    const data = await req.json();
    const { user } = await auth();
    await dbConnect();
    await User.findByIdAndUpdate(user.id, data);
    return Response.json({ message: 'Changed Avatar', success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: true }, { status: 400 });
  }
};
