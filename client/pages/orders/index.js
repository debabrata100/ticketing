import buildClient from '../../api/build-client';
import endpointConfig from '../../api/endpoint-config';

export async function getServerSideProps(context) {
  const client = buildClient(context);
  try {
    const response = await client.get(endpointConfig.orders);
    return {
      props: {
        orders: response.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { orders: [] },
    };
  }
}

export default function Orders({ orders }) {
  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4">Orders</h3>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Ticket</th>
                  <th>Price (₹)</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="fw-semibold">{order.id}</td>
                    <td>{order.expiresAt.split('T')[0]}</td>

                    <td>
                      <span
                        className={`badge ${
                          order.status === 'complete'
                            ? 'bg-success'
                            : order.status === 'cancelled'
                            ? 'bg-danger'
                            : 'bg-warning text-dark'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>{order.ticket.title}</td>

                    <td className="fw-semibold">₹{order.ticket.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
