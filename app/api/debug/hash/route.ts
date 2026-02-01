import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  // Replace 'your_new_password' with what you want the master password to be
  const hash = await bcrypt.hash("your_new_password", 12);
  return NextResponse.json({ 
    instruction: "Copy this hash into the 'password_hash' column in your Supabase 'users' table",
    hash 
  });
}
