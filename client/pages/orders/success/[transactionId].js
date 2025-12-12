import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();
  const { transactionId } = router.query;
  return (
    <div>
      Your order was successful.
      <p>Transaction ID: {transactionId}</p>
    </div>
  );
}
