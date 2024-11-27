import MainPage from '../../pages/main-page/main-page.tsx';

type AppProps = {
  count: number;
}
export default function App({ count }: AppProps): JSX.Element {
  return (
    <MainPage
      count={count}
    />
  );
}
