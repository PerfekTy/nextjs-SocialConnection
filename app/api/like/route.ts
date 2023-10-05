import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/server-auth";

export async function handler(req: Request) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return new Response("Unsupported method", { status: 405 });
  }

  try {
    const { postId } = await req.json();
    const { currentUser } = await serverAuth();

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new Error("Invalid ID");
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    if (req.method === "POST") {
      updatedLikedIds.push(currentUser.id);

      try {
        const post = await prisma.post.findUnique({ where: { id: postId } });

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: "Someone liked your tweet!",
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
    }

    if (req.method === "DELETE") {
      updatedLikedIds = updatedLikedIds.filter(
        (likedId) => likedId !== currentUser.id
      );
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 400 });
  }
}

export { handler as POST, handler as DELETE };
