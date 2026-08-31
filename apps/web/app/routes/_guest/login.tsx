import { data } from 'react-router';
import clsx from 'clsx';
import { ApiError } from '@repo/shared-api/error';

import styles from './login.module.css';
import type { Route } from './+types/login';
import { loginAction } from '~/features/auth/server/actions';
import { loginRequestSchema } from '~/features/auth/schemas';
import { LoginForm } from '~/features/auth/components/views/login';

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();

  const parsed = loginRequestSchema.safeParse({
    userName: formData.get('userName'),
    password: formData.get('password'),
    isAuto: formData.get('isAuto') === 'true',
  });

  if (!parsed.success) {
    return data({
      success: false as const,
      code: 'VE' as const,
    });
  }

  try {
    const { data: loginData, headers } = await loginAction(parsed.data);

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

export default function Login() {
  return (
    <main className="d-flex align-items-center justify-content-center min-vh-100 bg-background p-4">
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
        <div className={clsx('position-absolute', styles['glow-primary'])} />
        <div className={clsx('position-absolute', styles['glow-accent'])} />
      </div>
      <div
        className={clsx(
          'w-100 position-relative shadow-lg border-0 text-center',
          styles['glass-card'],
          'card',
        )}
      >
        <div className="text-center pb-2 card-body">
          <div className="card-title h5">로그인</div>
          <div className="card-subtitle h6 text-muted">Izen</div>
        </div>
        <div className="text-start pb-2 card-body">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
