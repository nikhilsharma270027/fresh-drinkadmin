// D:\onlinecoding\fresh-drinkadmin\src\app\api\products\route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/model/product';

// Handle GET request for fetching products
export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Internal Server Error | Error fetching Products' },
      { status: 500 }
    );
  }
}
export async function PUT() {
  await dbConnect();

  try {
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Internal Server Error | Error fetching Products' },
      { status: 500 }
    );
  }
}
