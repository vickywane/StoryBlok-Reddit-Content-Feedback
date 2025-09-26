export const dynamic = "force-static";

export async function GET() {
  try {
    return Response.json({
      data: {
        message: "API route is working",
        timestamp: new Date().toISOString()
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return Response.json(
      {
        error: "API error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
