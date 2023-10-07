import serverAuth from "@/lib/server-auth";
import prisma from "@/lib/prismadb";

async function handler(req: Request, res: Response) {
  if (req.method !== "POST" && req.method !== "GET") {
    return new Response("Unsupported method", { status: 405 });
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth();
      const { body } = await req.json();

      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      });

      return new Response(JSON.stringify(post), { status: 200 });
    }

    if (req.method === "GET") {
      const url = req.url;
      const parts = url.split("/");
      const index = parts[4].split("=");
      const userId = index[1];

      let posts;

      if (!userId && typeof userId !== "string") {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return new Response(JSON.stringify(posts), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 400 });
  }
}

export { handler as GET, handler as POST };
