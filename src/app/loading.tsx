'use client';

import Spinner from '@/components/spinner';

import React from 'react';

export default function loading() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Spinner size={40} />;
    </main>
  );
}
