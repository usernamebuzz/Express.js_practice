'use client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import styles from './posts.module.css';

async function fetchPosts() {
  const response = await axios.get('http://localhost:3001/posts');
  return response.data;
}

export default function PostList() {
  const { data: posts, error, isLoading } = useQuery(['posts'], fetchPosts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="App">
      {posts.map((value) => {
        return (
          <div className={styles.post}>
            <div className={styles.title}> {value.title} </div>
            <div className={styles.body}>{value.postText}</div>
            <div className={styles.footer}>{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}
