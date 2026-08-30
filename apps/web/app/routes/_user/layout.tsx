import { Outlet, redirect } from 'react-router';

import type { Route } from './+types/layout';
import { getCookies } from '~/shared/lib/server';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const cookies = getCookies(request);

  if (!cookies || !cookies['refreshToken']) {
    throw redirect('/login');
  }

  return null;
};

export default function UserLayout() {
  return <Outlet />;
}
