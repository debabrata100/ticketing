const app = ({ currentUser }) => {
  if (currentUser) {
    return <div>You are signed in</div>;
  }
  return <h1>Landing Page </h1>;
};
export default app;
