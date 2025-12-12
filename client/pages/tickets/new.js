import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import endpointConfig from '../../api/endpoint-config';
import { useRouter } from 'next/router';

export default function NewTicket() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: endpointConfig.tickets,
    method: 'post',
    body: { title, price },
    onSuccess: () => router.push('/tickets'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow"
        style={{ width: '350px', background: 'white' }}
      >
        <h4 className="text-center mb-4">Add Ticket</h4>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </div>
        {errors && errors}
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}
