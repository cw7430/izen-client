import { Outlet } from 'react-router';

import { ErpListLayout } from '~/shared/components/layout/erp-list';

export default function SalesLayout() {
  return (
    <ErpListLayout title="매출관리">
      <Outlet />
    </ErpListLayout>
  );
}
