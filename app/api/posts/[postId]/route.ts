import prisma from "@/lib/prismadb";

export async function handler(req: Request, res: Response) {
  if (req.method !== "GET") {
    return new Response("Unsupported method", { status: 405 });
  }

  try {
    const url = req.url;
    const parts = url.split("/");
    const postId = parts[5];

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: { user: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 400 });
  }
}

export { handler as GET };
