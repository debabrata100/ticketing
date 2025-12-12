import endpointConfig from '../api/endpoint-config';
import useRequest from '../hooks/use-request';
import { useRouter } from 'next/router';

export const ProductCard = ({ id, title, price }) => {
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: endpointConfig.orders,
    method: 'post',
    body: { ticketId: id },
    onSuccess: (order) =>
      router.push('/orders/[orderId]', `/orders/${order.id}`),
  });
  const onPurchase = () => {
    doRequest();
  };
  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">₹{price}</h6>
        <button className="btn btn-primary w-100" onClick={onPurchase}>
          Buy Now
        </button>
      </div>
    </div>
  );
};
