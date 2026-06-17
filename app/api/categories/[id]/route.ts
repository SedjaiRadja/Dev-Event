import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/database/category.model";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return NextResponse.json(
    {
      success: true,
      id,
    },
    {
      headers: corsHeaders,
    }
  );
}
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: body.name,
        slug: body.slug,
        icon: body.icon,
        color: body.color,
      },
      { new: true }
    );

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(category, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { message: "Category deleted successfully" },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete category" },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}