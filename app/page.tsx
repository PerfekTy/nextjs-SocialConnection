import { Form } from "@/components/posts/form";
import { HeaderLabel } from "@/components/home/header-label";
import { PostFeed } from "@/components/posts/post-feed";

export default function Home() {
  return (
    <>
      <HeaderLabel showBackArrow label="Home" />
      <div className="px-5 md:px-0">
        <Form placeholder="What's happening?!" />
      </div>
      <PostFeed />
    </>
  );
}
