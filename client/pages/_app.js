import 'bootstrap/dist/css/bootstrap.min.css';
import buildClient from '../api/build-client';
import endpointConfig from '../api/endpoint-config';
import Header from '../components/Header';

const App = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} currentUser={currentUser} />
    </div>
  );
};

App.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  let pageProps = {};
  try {
    const response = await client.get(endpointConfig.profile);

    if (typeof appContext.Component.getInitialProps === 'function') {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return {
      pageProps,
      ...response.data,
    };
  } catch (err) {
    console.log(err);
    return {
      pageProps,
    };
  }
};

export default App;
