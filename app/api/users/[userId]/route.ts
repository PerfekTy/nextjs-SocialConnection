import prisma from "@/lib/prismadb";

export async function handler(req: Request, res: Response) {
  if (req.method !== "GET") {
    return new Response("Unsupported method", { status: 405 });
  }

  try {
    const url = req.url;
    const parts = url.split("/");
    const index = parts.indexOf("users") + 1;
    const userId = parts[index];

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return new Response(JSON.stringify({ ...existingUser, followersCount }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 400 });
  }
}

export { handler as GET };
