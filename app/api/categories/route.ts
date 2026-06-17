import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/database/category.model";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "X-Debug-Version": "NEW-CORS-123",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET() {
  await connectDB();

  const categories = await Category.find();

  return NextResponse.json(categories, {
    status: 200,
    headers: corsHeaders,
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

    return NextResponse.json(category, {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
}
