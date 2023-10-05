import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

const serverAuth = async (res: Response) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response("Not signed in", { status: 400 });
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    return new Response("Not signed in", { status: 400 });
  }

  return { currentUser };
};

export default serverAuth;
