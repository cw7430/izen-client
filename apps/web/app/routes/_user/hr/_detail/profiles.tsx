import { redirect } from 'react-router';
import { ApiError } from '@repo/shared-api/error';
import { ResponseCode } from '@repo/shared-constants/api';
import { Container, Row, Col } from 'react-bootstrap';

import type { Route } from './+types/profiles';
import { getProfile } from '~/features/hr/profiles/server/loaders';
import {
  InternalServerError,
  KeyError,
  InvalidUrl,
  Unauthorized,
} from '~/shared/components/layout/errors';
import { NavProfileListButton } from '~/features/hr/profiles/components/views/detail';
import { ShowModalButton } from '~/shared/components/ui/button';

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const id = params.id;

  if (!/^\d+$/.test(id) || BigInt(id) <= 0n) {
    throw redirect('/hr/profiles');
  }

  const profile = await getProfile(request, id);

  return {
    profile,
  };
};

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const REDIRECT_TO = `/hr/profiles`;

  if (error instanceof ApiError) {
    if (
      error.code === ResponseCode.UNAUTHORIZED.code ||
      error.code === ResponseCode.EXPIRED_TOKEN.code ||
      error.code === ResponseCode.INVALID_TOKEN.code
    ) {
      return <Unauthorized />;
    }

    if (error.code === ResponseCode.KEY_ERROR.code) {
      return <KeyError />;
    }

    if (
      error.code === ResponseCode.VALIDATION_ERROR.code ||
      error.code === ResponseCode.RESOURCE_NOT_FOUND.code
    ) {
      return <InvalidUrl redirectTo={REDIRECT_TO} />;
    }
  }

  return <InternalServerError />;
}

export default function ProfileDetail({ loaderData }: Route.ComponentProps) {
  const { profile } = loaderData;

  const MODAL_KEY = 'UpdateProfile';

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Container className="my-5">
          <Row>
            <Col>
              <h1 className="text-center mb-4">사원 정보</h1>
            </Col>
          </Row>
          <Row className="justify-content-center mb-3">
            <Col xs={12} md={8} lg={6}>
              <div className="border p-3 rounded">
                <p>
                  <strong>{'사번: '}</strong>
                  {profile.employeeCode}
                </p>
                <p>
                  <strong>{'이름: '}</strong>
                  {profile.employeeName}
                </p>
                <p>
                  <strong>{'직급: '}</strong>
                  {profile.positionName}
                </p>
                <p>
                  <strong>{'부서: '}</strong>
                  {profile.departmentName}
                </p>
                <p>
                  <strong>{'팀: '}</strong>
                  {profile.teamName}
                </p>
                <p>
                  <strong>{'전화번호: '}</strong>
                  {profile.phone}
                </p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="auto">
              <ShowModalButton
                allowedProfileTeams={profile.allowedProfileTeams}
                modalKey={MODAL_KEY}
                name="사원 정보 수정"
                className="me-2"
              />
              <NavProfileListButton />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
