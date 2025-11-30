import { useState } from 'react';
import buildClient from '../api/build-client';
import endpointConfig from '../api/endpoint-config';

const client = buildClient({});
const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const handleApiErrors = (err) => {
    setErrors(
      <div className="alert alert-danger">
        {err.response.data.errors.map((error) => {
          return <li key={error.message}>{error.message}</li>;
        })}
      </div>
    );
  };
  const getPorfile = async () => {
    try {
      const profileUrl = endpointConfig.profile;
      const response = await client.get(profileUrl);
      return response.data;
    } catch (err) {
      handleApiErrors(err);
    }
  };
  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await client[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      handleApiErrors(err);
      // throw err;
    }
  };
  return { doRequest, errors, getPorfile };
};

export default useRequest;
