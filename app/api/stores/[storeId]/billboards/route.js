import Billboard from '@/models/billboards.model';
import dbConnect from '@/lib/db';
import { auth } from '@/lib/auth';

// CREATE BILLBOARD
export const POST = async (req) => {
  try {
    const data = await req.json();
    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' });
    }

    await dbConnect();
    const billboard = await Billboard.create(data);

    return Response.json({ message: 'Billboard Created', data: billboard, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: 'Some Error Occurred' }, { status: 400 });
  }
};
