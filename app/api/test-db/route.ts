import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    console.log("START API");

    await connectDB();

    console.log("DB CONNECTED");

    return Response.json({ ok: true });
  } catch (error: unknown) {
    console.error("🔥 FULL ERROR:", error);

    return Response.json(
      {
        ok: false,
        error: error?.message || String(error),
      },
      { status: 500 },
    );
  }
}
