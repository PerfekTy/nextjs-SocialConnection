import serverAuth from "@/lib/server-auth";
import prisma from "@/lib/prismadb";

export async function handler(req: Request, res: Response) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return new Response("Unsupported method", { status: 405 });
  }

  try {
    const { userId } = await req.json();

    const { currentUser } = await serverAuth();

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error("Invalid ID");
    }

    let updatedFollowingIds = [...(user.followingIds || [])];

    if (req.method === "POST") {
      updatedFollowingIds.push(userId);

      try {
        await prisma.notification.create({
          data: {
            body: "Someone followed you!",
            userId,
          },
        });

        await prisma.user.update({
          where: { id: userId },
          data: { hasNotification: true },
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (req.method === "DELETE")
      [updatedFollowingIds.filter((followingId) => followingId !== userId)];

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 400 });
  }
}

export { handler as POST, handler as DELETE };
