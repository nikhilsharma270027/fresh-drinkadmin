import dbConnect from "@/lib/dbConnect";
import Product from "@/model/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    await dbConnect();

    try{
        const { name, imageurl, price } = await req.json();
        const newAddProduct = await Product.create({
            name,
            imageurl,
            price,
        })
        return NextResponse.json(newAddProduct, { status: 201 });
    } catch (error){
        console.log("Error in Addproducst", error);
        return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest){
    await dbConnect();

    try{
        const { searchParams } = new URL(req.url);
  const _id = searchParams.get('_id'); // Retrieve product ID from query parameters
        await Product.deleteOne({ _id })
        return NextResponse.json("ok", { status: 201 });
    } catch (error){
        console.log("Error in Addproducst", error);
        return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
    }
}