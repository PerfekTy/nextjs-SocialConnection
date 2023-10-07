import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/server-auth";

async function handler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return new Response("Unsupported method", { status: 405 });
  }

  try {
    const { currentUser } = await serverAuth();
    const { body } = await req.json();
    const url = req.url;
    const parts = url.split("/");
    const index = parts[4].split("=");
    const postId = index[1];

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const comment = await prisma.comment.create({
      data: { body, userId: currentUser.id, postId },
    });

    try {
      const post = await prisma.post.findUnique({ where: { id: postId } });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone replied to your tweet!",
            userId: post.userId,
          },
        });

        await prisma.user.update({
          where: { id: postId },
          data: { hasNotification: true },
        });
      }
    } catch (error) {
      console.log(error);
    }

    return new Response(JSON.stringify(comment), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 400 });
  }
}

export { handler as POST };
