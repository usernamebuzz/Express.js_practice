import PostList from './postList';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Link href="/write">
        <button>Write</button>
      </Link>
      <PostList />
    </>
  );
}
