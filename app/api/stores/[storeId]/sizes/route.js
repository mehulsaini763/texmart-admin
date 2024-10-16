import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Size from '@/models/sizes.model';

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
