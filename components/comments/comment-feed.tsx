import { CommentItem } from "./comment-item";

export const CommentFeed = ({
  comments,
}: {
  comments?: Record<string, any>[];
}) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};
