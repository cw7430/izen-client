import { ErpTeb } from '~/shared/components/ui/teb';

export default function Payroll() {
  return (
    <>
      <h1 className="text-center">급여</h1>
      <ErpTeb domain="hr" />
    </>
  );
}
