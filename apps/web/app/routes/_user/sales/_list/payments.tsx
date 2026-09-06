import { ErpTeb } from '~/shared/components/ui/teb';

export default function PaymentList() {
  return (
    <>
      <h1 className="text-center">매출</h1>
      <ErpTeb domain="sales" />
    </>
  );
}
