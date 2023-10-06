import { Form } from "@/components/home/form";
import { Header } from "@/components/home/header";
import { PostFeed } from "@/components/home/posts/post-feed";

export default function Home() {
  return (
    <>
      <Header showBackArrow label="Home" />
      <div className="px-5 md:px-0">
        <Form placeholder="What's happening?!" />
      </div>
      <PostFeed />
    </>
  );
}
