import {CommentItemType} from './types.ts';

type CommentProps = {
  comment: CommentItemType;
};

export default function Comment({ comment }: CommentProps): JSX.Element {
  const {userName, avatarUrl, rating, text, date} = comment;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt={`${userName}'s avatar`}
          />
        </div>
        <span className="reviews__user-name">{userName}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{text}</p>
        <time className="reviews__time" dateTime="2019-04-24">
          {date}
        </time>
      </div>
    </li>
  );
}
