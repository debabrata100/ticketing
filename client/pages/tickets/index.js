import buildClient from '../../api/build-client';
import endpointConfig from '../../api/endpoint-config';
import { ProductCard } from '../../components/ProductCard';

export async function getServerSideProps(context) {
  const client = buildClient(context);
  try {
    const response = await client.get(endpointConfig.tickets);
    return {
      props: {
        tickets: response.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { currentUser: null },
    };
  }
}

export default function Tickets({ tickets }) {
  return (
    <div className="d-flex align-items-center">
      {tickets &&
        tickets.map((ticket) => {
          return <ProductCard key={ticket.id} {...ticket} />;
        })}
    </div>
  );
}
