import { data } from 'react-router';
import { ApiError } from '@repo/shared-api/error';

import type { Route } from './+types/refresh';
import { refreshAction } from '~/features/auth/server/actions/refresh.server';

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();

  const body = { isAuto: formData.get('isAuto') === 'true' };

  try {
    const { data: loginData, headers } = await refreshAction(body);

    return data(
      {
        success: true as const,
        data: loginData,
      },
      {
        headers,
      },
    );
  } catch (e) {
    if (e instanceof ApiError) {
      return data({
        success: false as const,
        code: e.code,
      });
    }

    throw e;
  }
};
