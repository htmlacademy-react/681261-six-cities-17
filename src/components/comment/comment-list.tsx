import { CommentItemType } from './types.ts';
import Comment from './comment.tsx';

type CommentListProps = {
  comments: CommentItemType[];
}

export default function CommentList({ comments }: CommentListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
          />
        ))
      }
    </ul>
  );
}
