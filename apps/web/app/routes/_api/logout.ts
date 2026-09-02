import { data } from 'react-router';

import type { Route } from './+types/logout';
import { logoutAction } from '~/features/auth/server/actions';

export const action = async ({ request }: Route.ActionArgs) => {
  const { headers } = await logoutAction(request);

  return data(
    {
      success: true as const,
    },
    { headers },
  );
};