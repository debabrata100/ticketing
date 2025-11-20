import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/router';
import endpointConfig from '../../api/endpoint-config';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { errors, doRequest, getPorfile } = useRequest({
    url: endpointConfig.signin,
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: handleSignupSuccess,
  });
  async function handleSignupSuccess() {
    const data = await getPorfile();
    console.log(data);
    router.push('/');
  }
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };
  return (
    <form onSubmit={handleSubmit} className="">
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <div className="form-group my-2">
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default Signin;
