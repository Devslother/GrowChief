import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

// App Router export with error handling
export async function GET(
  req: Request,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  try {
    return await handler(req, context);
  } catch (error) {
    console.error("NextAuth GET error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(
  req: Request,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  try {
    return await handler(req, context);
  } catch (error) {
    console.error("NextAuth POST error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
