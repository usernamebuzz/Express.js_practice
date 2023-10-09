'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
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

  const queryClient = useQueryClient();

  const addCommentMutation = useMutation(
    (newComment) => {
      return axios.post(`http://localhost:3001/comments/`, {
        commentBody: newComment,
        PostId: params.id,
      });
    },
    {
      onMutate: (commentToAdd) => {
        // Optimistically update the UI before the mutation is completed
        queryClient.setQueryData(['comments', params.id], (oldData) => {
          return oldData
            ? [...oldData, { commentBody: commentToAdd }]
            : [{ commentBody: commentToAdd }];
        });
      },
      onSuccess: () => {
        setNewComment('');
        queryClient.invalidateQueries(['comments', params.id]);
      },
    }
  );

  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    addCommentMutation.mutate(newComment);
  };

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
        <div className={styles.title}>{post.title}</div>
        <div className={styles.body}>{post.postText}</div>
        <div className={styles.footer}>{post.username}</div>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.commentBody}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Comment..."
          autoComplete="off"
          value={newComment}
          onChange={(event) => {
            setNewComment(event.target.value);
          }}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </>
  );
}
