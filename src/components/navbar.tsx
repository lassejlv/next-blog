import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  const navItems = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Blog',
      path: '/blog',
    },
  ];

  return (
    <nav className="flex items-center justify-between mb-5">
      <h1 className="text-4xl font-bold">Next Blog</h1>
      <ul className="flex space-x-4">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
