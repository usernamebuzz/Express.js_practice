'use client';
import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import styles from './page.module.css';

export default function Post({ params }) {
  async function fetchPost() {
    const response = await axios.get(
      `http://localhost:3001/posts/detail/${params.id}`
    );
    return response.data;
  }

  async function fetchComments() {
    const response = await axios.get(
      `http://localhost:3001/comments/${params.id}`
    );
    return response.data;
  }

  const {
    data: post,
    error: postError,
    isLoading: postIsLoading,
  } = useQuery(['post'], fetchPost);

  const {
    data: comments,
    error: commentsError,
    isLoading: commentsIsLoading,
  } = useQuery(['comments', params.id], fetchComments);

  console.log(comments);

  if (postIsLoading || commentsIsLoading) {
    return <div>Loading...</div>;
  }

  if (postError) {
    return <div>Error fetching post: {postError.message}</div>;
  }

  if (commentsError) {
    return <div>Error fetching comments: {commentsError.message}</div>;
  }

  return (
    <>
      <div className={styles.post}>
        <div className={styles.title}> {post.title} </div>
        <div className={styles.body}>{post.postText}</div>
        <div className={styles.footer}>{post.username}</div>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.commentBody}</li>
        ))}
      </ul>
    </>
  );
}
