import { data } from 'react-router';
import { ApiError } from '@repo/shared-api/error';

import type { Route } from './+types/profiles';
import { updateProfileRequestSchema } from '~/features/hr/profiles/schemas';
import { updateProfile } from '~/features/hr/profiles/server/actions';

export const action = async ({ request, params }: Route.ActionArgs) => {
  const id = params.id;
  const formData = await request.formData();

  if (!/^\d+$/.test(id) || BigInt(id) <= 0n) {
    return data({
      success: false as const,
      code: 'VE' as const,
    });
  }

  const parsed = updateProfileRequestSchema.safeParse({
    positionCode: formData.get('positionCode'),
    teamCode: formData.get('teamCode'),
    employeeRole: formData.get('employeeRole'),
  });

  if (!parsed.success) {
    return data({
      success: false as const,
      code: 'VE' as const,
    });
  }

  try {
    await updateProfile(parsed.data, request, id);
    return data({
      success: true as const,
    });
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
