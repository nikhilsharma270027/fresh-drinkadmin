import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/model/product';

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id'); // Retrieve product ID from query parameters

  try {
    if (id) {
      // Fetch single product if ID is provided
      const product = await Product.findOne({ _id: id });
      if (!product) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(product, { status: 200 });
    } 
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Internal Server Error | Error fetching Products' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { name, imageurl, price, _id } = await req.json();
    // const numericPrice = Number(price);
    const updatedProduct = await Product.updateOne({ _id }, { name, imageurl, price });

    if (!updatedProduct) {
      return NextResponse.json({ message: 'Product not found or update failed' }, { status: 404 });
    }
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { message: 'Internal Server Error | Error updating Product' },
      { status: 500 }
    );
  }
}
