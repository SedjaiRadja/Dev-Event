import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
type AgendaItem = {
  title: string;
  time?: string;
  description?: string;
};
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 },
      );
    }

    // Parse JSON fields safely
    let tags: string[] = [];
    let agenda: AgendaItem[] = [];

    try {
      tags = JSON.parse(formData.get("tags") as string);
      agenda = JSON.parse(formData.get("agenda") as string);
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON for tags or agenda" },
        { status: 400 },
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined,
          ) => {
            if (error) return reject(error);
            if (!result) return reject(new Error("Upload failed"));
            resolve(result);
          },
        );

        stream.end(buffer);
      },
    );

    // Create event in MongoDB
    const createdEvent = await Event.create({
  title: formData.get("title"),
  description: formData.get("description"),
  overview: formData.get("overview"),

  venue: formData.get("venue"),
  location: formData.get("location"),

  date: formData.get("date"),
  time: formData.get("time"),

  mode: formData.get("mode"),
  audience: formData.get("audience"),

  organizer: formData.get("organizer"),

  category: formData.get("category"),

  image: uploadResult.secure_url,

  tags,
  agenda,
});

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      { status: 201 },
    );
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: "Event creation failed",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    console.log("✅ Connected to MongoDB");

    console.log("📦 Database Name:", Event.db.name);
    console.log("📦 Collection Name:", Event.collection.name);

    const count = await Event.countDocuments();

    console.log("📊 Total Events:", count);

    const events = await Event.find().sort({ createdAt: -1 });

    console.log("📝 Events:", JSON.stringify(events, null, 2));

    return NextResponse.json(
      {
        message: "Events fetched successfully",
        count,
        events,
      },
      { status: 200 },
    );
  } catch (e) {
    console.error("❌ GET Error:", e);

    return NextResponse.json(
      {
        message: "Event fetching failed",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}