import prisma from "@/lib/prismadb";

async function handler(req: Request, res: Response) {
  if (req.method !== "GET") {
    return new Response("Unsupported method", { status: 405 });
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 400 });
  }
}

export { handler as GET };
