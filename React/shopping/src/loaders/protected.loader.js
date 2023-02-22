import { redirect } from 'react-router-dom';

import { parseJwt } from '../helpers/jwt.helper';


export const protectedRoutesLoader = () => {
  const token = localStorage.getItem('authToken');
  const { exp } = parseJwt(token);

  const now = Date.now() / 1000;

  if (!exp || exp < now) {
    return redirect('/auth/login');
  }

  return null;
};
