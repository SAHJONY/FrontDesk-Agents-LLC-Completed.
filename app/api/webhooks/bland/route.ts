import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Move all your 'await' logic INSIDE this function
    const body = await request.json();
    
    // Example: Process the Bland AI webhook data
    console.log("Bland AI Webhook received:", body);

    // Your logic here...

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
