import { NextResponse } from "next/server";
import { getUnavailableDates } from "@/lib/booking-service";

export async function GET() {
  try {
    const unavailableDates = await getUnavailableDates();

    return NextResponse.json({
      success: true,
      unavailableDates,
      count: unavailableDates.length,
    });
  } catch (error) {
    console.error("Unavailable dates API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch unavailable dates",
        unavailableDates: [],
      },
      { status: 500 }
    );
  }
}
