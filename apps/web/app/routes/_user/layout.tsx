import { Outlet, redirect } from 'react-router';

import type { Route } from './+types/layout';
import { getCookies } from '~/shared/lib/server';
import { Header } from '~/shared/components/layout/header';
import { Footer } from '~/shared/components/layout/footer';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const cookies = getCookies(request);

  if (!cookies || !cookies['refreshToken']) {
    throw redirect('/login');
  }

  return null;
};

export default function UserLayout() {
  return (
    <div className="bg-light text-dark">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
