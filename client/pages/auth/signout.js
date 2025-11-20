import { useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import endpointConfig from '../../api/endpoint-config';
import { useRouter } from 'next/router';

export default function Signout() {
  const router = useRouter();
  const { doRequest } = useRequest({
    url: endpointConfig.signout,
    method: 'post',
    body: {},
    onSuccess: () => router.push('/'),
  });
  useEffect(() => {
    doRequest();
  });
  return null;
}
