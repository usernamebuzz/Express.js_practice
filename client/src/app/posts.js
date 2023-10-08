'use client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

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
          <div className="post">
            <div className="title"> {value.title} </div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}
