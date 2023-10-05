import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";

export async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Unsupported method", { status: 405 });
  }

  try {
    const { email, username, name, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 400 });
  }
}

export { handler as POST };
