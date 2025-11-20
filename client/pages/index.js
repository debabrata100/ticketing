import buildClient from '../api/build-client';
import endpointConfig from '../api/endpoint-config';

// export async function getServerSideProps(context) {
//   const client = buildClient(context);
//   try {
//     const response = await client.get(endpointConfig.profile);
//     // console.log('deb---response2', response);
//     return {
//       props: response.data,
//     };
//   } catch (err) {
//     console.log(err);
//     return {
//       props: { currentUser: null },
//     };
//   }
// }

const app = ({ currentUser }) => {
  if (currentUser) {
    return <div>You are signed in</div>;
  }
  return <h1>Landing Page </h1>;
};
export default app;
