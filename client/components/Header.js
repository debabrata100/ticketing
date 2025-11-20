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
        <li>
          <Link href={href}>{label}</Link>
        </li>
      );
    });
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">MSP</Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
}
