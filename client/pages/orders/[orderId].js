import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import endpointConfig from '../../api/endpoint-config';
import useRequest from '../../hooks/use-request';
import StripeCheckout from 'react-stripe-checkout';

export default function ShowOrder({ currentUser }) {
  const [order, setOrder] = useState(null);

  const router = useRouter();
  const { orderId } = router.query;
  const { doRequest, errors } = useRequest({
    url: `${endpointConfig.orders}/${orderId}`,
    method: 'get',
    onSuccess: (data) => setOrder(data),
  });

  const { doRequest: doPaymentRequest, errors: paymentErrors } = useRequest({
    url: endpointConfig.payments,
    method: 'post',
    body: {
      orderId: orderId,
    },
    onSuccess: (data) =>
      router.push(
        '/orders/success/[transactionId]',
        `/orders/success/${data.id}`
      ),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div>
      <PaymentBox errors={errors} order={order} router={router} />
      {paymentErrors}
      <StripeCheckout
        token={({ id }) => doPaymentRequest({ token: id })}
        stripeKey="pk_test_51ScnUa3HXSgcoAVh5zTugraK8ys0pndtb3PtpeZMZlj2c9No2w7f1D6mLJ0fWXVox2M2jQk4OPGtxD7qprbuPxrq00uglTKsMq"
        amount={order?.ticket?.price * 100}
        email={currentUser.email}
        router={router}
      />
    </div>
  );
}

function PaymentBox({ onPay, errors, order, router }) {
  const amount = order?.ticket?.price;
  const [timer, setTimer] = useState(60);
  const runTimer = (order) => {
    const intId = setInterval(() => {
      const timeLeft = new Date(order.expiresAt) - new Date();
      if (timeLeft < 1) {
        clearInterval(intId);
        router.push('/orders');
        return;
      }
      setTimer(`${Math.floor(timeLeft / 1000)} seconds`);
    }, 1000);
  };

  useEffect(() => {
    if (order && order.id) {
      runTimer(order);
    }
  }, [order]);
  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card p-4 shadow-sm" style={{ width: '350px' }}>
        <h5 className="mb-3 text-center">Payment</h5>

        <p className="fw-semibold text-center">
          Time Left: <span className="text-danger">{timer}</span>
        </p>

        <button className="btn btn-primary w-100 mb-3" onClick={onPay}>
          Pay ${amount}
        </button>

        {errors && (
          <div className="alert alert-danger py-2 mb-0 text-center">
            {errors}
          </div>
        )}
      </div>
    </div>
  );
}
