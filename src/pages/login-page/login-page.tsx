import Header from '../../components/header/header.tsx';
import React, { useEffect, useState } from 'react';
import { UserLoginPayload } from '../../store/types.ts';
import { useNavigate } from 'react-router-dom';
import { LoginStatus, RoutePath } from '../../constant.ts';
import { useAppDispatch } from '../../hooks/useDispatch.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toast } from 'react-toastify';
import { loginAction } from '../../store/slices/user-slice.ts';

export default function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const authStatus = useSelector((state: RootState) => state.user.authorizationStatus);

  useEffect(() => {
    if (authStatus === LoginStatus.Auth) {
      navigate(RoutePath.Main);
    }
  }, [authStatus, navigate]);

  const validatePassword = (): boolean => {
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasLetter && hasNumber;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePassword()) {
      toast.error('Пароль должен содержать минимум одну букву и одну цифру.');
      return;
    }

    setIsLoading(true);

    const payload: UserLoginPayload = { email, password };

    dispatch(loginAction(payload))
      .unwrap()
      .then(() => {
        navigate(RoutePath.Main);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="page page--gray page--login">
      <Header/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="email">E-mail</label>
                <input
                  id="email"
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="password">Password</label>
                <input
                  id="password"
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
