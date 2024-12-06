import {LoginStatus, RoutePath} from '../../constant.ts';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
  authStatus: LoginStatus;
}


export default function PrivateRoute({ children, authStatus }: PrivateRouteProps) {
  return (
    authStatus === LoginStatus.Auth ? children : <Navigate to={RoutePath.Login}/>
  );
}
