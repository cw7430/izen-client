import { data } from 'react-router';
import { ApiError } from '@repo/shared-api/error';
import { ResponseCode } from '@repo/shared-constants/api';

import type { Route } from './+types/profiles';
import { createProfileRequestSchema } from '~/features/hr/profiles/schemas';
import { createProfile } from '~/features/hr/profiles/server/actions';

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();

  const parsed = createProfileRequestSchema.safeParse({
    employeeCode: formData.get('employeeCode'),
    employeeName: formData.get('employeeName'),
    positionCode: formData.get('positionCode'),
    teamCode: formData.get('teamCode'),
    employeeRole: formData.get('employeeRole'),
    phone: formData.get('phone'),
    email: formData.get('email'),
  });

  if (!parsed.success) {
    return data({
      success: false as const,
      code: ResponseCode.VALIDATION_ERROR,
    });
  }

  try {
    await createProfile(parsed.data, request);
    return data({
      success: true as const,
    });
  } catch (e) {
    if (e instanceof ApiError) {
      return data({
        success: false as const,
        code: e.code,
        errors: e.errors
      });
    }

    throw e;
  }
};
