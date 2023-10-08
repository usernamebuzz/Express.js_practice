'use client';
import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function Post({ params }) {
  async function fetchPost() {
    const response = await axios.get(
      `http://localhost:3001/posts/detail/${params.id}`
    );
    return response.data;
  }

  const { data: post, error, isLoading } = useQuery(['post'], fetchPost);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="post" key={post.id}>
      <div className="title"> {post.title} </div>
      <div className="body">{post.postText}</div>
      <div className="footer">{post.username}</div>
    </div>
  );
}
