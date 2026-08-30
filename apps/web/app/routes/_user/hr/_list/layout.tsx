import { Outlet } from 'react-router';

import { ErpListLayout } from '~/shared/components/layout/erp-list';

export default function HrLayout() {
  return (
    <ErpListLayout title="인사관리">
      <Outlet />
    </ErpListLayout>
  );
}
