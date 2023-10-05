import prisma from "@/lib/prismadb";

export default async function handler(req: Request, res: Response) {
  if (req.method !== "GET") {
    return new Response("Unsupported method", { status: 405 });
  }

  try {
    const url = req.url;
    const parts = url.split("/");
    const index = parts.indexOf("users") + 1;
    const userId = parts[index];

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { hasNotification: false },
    });

    return new Response(JSON.stringify(notifications), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 400 });
  }
}

export { handler as GET };
