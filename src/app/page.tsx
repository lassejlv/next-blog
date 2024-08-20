import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Next Blog</h1>
      <p className="text-gray-400 text-lg">A blog built with Next.js and Tailwind CSS (shadcn)</p>

      <Button variant="secondary">
        <Link href="/blog">Go to blog</Link>
      </Button>
    </div>
  );
}
