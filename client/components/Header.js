import Link from 'next/link';

export default function Header({ currentUser }) {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((navLink) => !!navLink)
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link href={href}>{label}</Link>
        </li>
      );
    });
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">MSP</Link>
      <div className="d-flex align-items-center gap-3">
        <Link href="/tickets">Tickets</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/tickets/new">Add Ticket</Link>
      </div>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
}
