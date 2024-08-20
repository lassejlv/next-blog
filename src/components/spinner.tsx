'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';

export default function Spinner({ size = 24 }: { size?: number }) {
  return <Loader2 size={size} className="animate-spin" />;
}
