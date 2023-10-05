import serverAuth from "@/lib/server-auth";
import prisma from "@/lib/prismadb";

export async function handler(req: Request, res: Response) {
  if (req.method !== "PATCH") {
    return new Response("Unsupported method", { status: 405 });
  }

  try {
    const { currentUser } = await serverAuth();

    const { name, username, bio, profileImage, coverImage } = await req.json();

    if (!name || !username) {
      throw new Error("Missing fields");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 400 });
  }
}

export { handler as PATCH };
