import { ErpTeb } from '~/shared/components/ui/teb';

export default function Attendance() {
  return (
    <>
      <h1 className="text-center">근태</h1>
      <ErpTeb domain="hr" />
    </>
  );
}
