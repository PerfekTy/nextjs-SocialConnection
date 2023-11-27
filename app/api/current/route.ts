import serverAuth from "@/lib/server-auth";

async function handler(req: Request) {
  if (req.method !== "GET") {
    return new Response("Unsupported method", { status: 405 });
  }

  try {
    const { currentUser } = await serverAuth();

    return new Response(JSON.stringify(currentUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 400 });
  }
}

export { handler as GET };
