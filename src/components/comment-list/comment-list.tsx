import Comment from '../comment/comment.tsx';
import { CommentItem } from '../../types.ts';

type CommentListProps = {
  comments: CommentItem[];
};

export default function CommentList({ comments }: CommentListProps): JSX.Element {
  const sortedComments = [...comments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const displayedComments = sortedComments.slice(0, 10);

  return (
    <section className="reviews">
      <ul className="reviews__list">
        {displayedComments.map((comment) => (
          <Comment key={comment.id} commentItem={comment} />
        ))}
      </ul>
    </section>
  );
}
