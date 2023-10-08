'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import styles from './page.module.css';

function Write() {
  const initialValues = {
    title: '',
    postText: '',
    username: '',
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('You must input a Title!'),
    postText: Yup.string().required('Post Text is required'),
    username: Yup.string().min(3).max(15).required('Username is required'),
  });

  const createPost = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/posts', data);
      // Handle response data or actions here
      console.log('Post created:', response.data);
    } catch (error) {
      // Handle errors here
      console.error('Error creating post:', error);
    }
  };

  const { mutate, isLoading, isError, isSuccess } = useMutation(createPost);

  const handleAddPost = (data) => {
    // Trigger the mutation
    mutate(data);
  };

  return (
    <div className={styles.createPostPage}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAddPost}
      >
        <Form className={styles.formContainer}>
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id={styles.inputCreatePost}
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id={styles.inputCreatePost}
            name="postText"
            placeholder="(Ex. Post...)"
          />
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id={styles.inputCreatePost}
            name="username"
            placeholder="(Ex. John123...)"
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>

      {isLoading && <p>Submitting...</p>}
      {isError && <p>There was an error submitting the data.</p>}
      {isSuccess && <p>Post created successfully!</p>}
    </div>
  );
}

export default Write;
