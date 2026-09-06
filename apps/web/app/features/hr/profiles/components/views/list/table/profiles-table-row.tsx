import { useNavigate, useLocation, useSearchParams } from 'react-router';

import type { ProfileResponseDto } from '~/features/hr/profiles/schemas';

interface Props {
  profile: ProfileResponseDto;
}

export default function ProfilesTableRows({ profile }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const currentPath = queryString ? `${pathname}?${queryString}` : pathname;

  const onClick = () => {
    navigate(
      `/hr/profiles/${String(profile.employeeId)}?redirect=${encodeURIComponent(currentPath)}`,
    );
  };

  return (
    <tr style={{ cursor: 'pointer' }} onClick={onClick}>
      <td>{profile.employeeCode}</td>
      <td>{profile.employeeName}</td>
      <td>{profile.phone}</td>
      <td>{profile.departmentName}</td>
      <td>{profile.positionName}</td>
      <td>{profile.createdAt.toLocaleDateString()}</td>
      <td>{profile.updatedAt.toLocaleDateString()}</td>
    </tr>
  );
}
