import './styles.css';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../constant.ts';

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="container__not-found">
      <div className="error">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Страница не найдена</h2>
        <p className="error-description">
          К сожалению, запрашиваемая страница не существует. Возможно, вы ввели неправильный адрес или страница была
          удалена.
        </p>
        <Link to={RoutePath.Main} className="back-home">Вернуться на главную</Link>
      </div>
    </div>
  );
}
