import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Category from '@/models/categories.model';

// CREATE CATEGORY
export const POST = async (req) => {
  try {
    const data = await req.json();
    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' });
    }

    await dbConnect();
    const category = await Category.create(data);

    return Response.json({ message: 'Category Created', data: category, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: 'Some Error Occurred' }, { status: 400 });
  }
};
