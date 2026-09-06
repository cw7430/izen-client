import { ErpTeb } from '~/shared/components/ui/teb';

export default function RecordList() {
  return (
    <>
      <h1 className="text-center">결제</h1>
      <ErpTeb domain="sales" />
    </>
  );
}
