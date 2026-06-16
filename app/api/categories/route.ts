import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/database/category.model";

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3002",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function GET() {
  await connectDB();

  const categories = await Category.find();

  return NextResponse.json(categories, {
    status: 201,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3002",
    },
  });
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const category = await Category.create({
      name: body.name,
      slug: body.slug,
      icon: body.icon || "",
      color: body.color || "#6366f1",
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
}
