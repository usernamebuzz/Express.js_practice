import PostList from './posts';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <button>
        <Link href="/write">Write</Link>
      </button>
      <PostList />
    </>
  );
}
