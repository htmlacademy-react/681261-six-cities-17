import { CommentItem } from '../../types.ts';

type CommentProps = {
  commentItem: CommentItem;
};

export default function Comment({ commentItem }: CommentProps): JSX.Element {
  const { user, rating, comment, date } = commentItem;
  const { name, avatarUrl } = user;

  const formattedDate = new Date(date).toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt={`${name}'s avatar`}
          />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={new Date(date).toISOString()}>
          {formattedDate}
        </time>
      </div>
    </li>
  );
}
