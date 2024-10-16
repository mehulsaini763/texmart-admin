import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Product from '@/models/products.model';

// CREATE PRODUCT
export const POST = async (req) => {
  try {
    const data = await req.json();
    const { user } = await auth();

    if (!user) {
      return Response.json({ success: false, message: 'Invalid User' }, { status: 400 });
    }

    await dbConnect();
    const product = await Product.create(data);

    return Response.json({ message: 'Product Created', data: product, success: true }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: 'Some Error Occurred', success: false }, { status: 400 });
  }
};
