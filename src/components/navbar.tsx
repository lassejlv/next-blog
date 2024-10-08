'use client';

import Link from 'next/link';
import React from 'react';
import useFetch from 'react-fetch-hook';

export default function Navbar() {
  const { data } = useFetch('/api/session') as { data: React.ReactNode };

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
    <header className="flex items-center justify-between px-6 py-4 border-b mb-2">
      <h1 className="text-2xl font-bold">Next Blog</h1>
      <nav>
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path} className="hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
          {data && (
            <li>
              <Link href="/admin" className="hover:underline">
                Go to Admin
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
