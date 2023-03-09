import React from 'react';
import './BlogPost.css';

const BlogPost = ({ posts }) => {
  // if (posts.length === 0) {
  //   return <p>There are no posts to display</p>;
  // }

  return (
    <>
      {posts.map((post) => {
        if (!post.image || !post.title || !post.price || !post.date || !post.author || !post.content) {
          return null;
        }

        return (
          <div className="blog-post" key={post.id}>
            <img src={post.image} alt={post.title} />
            <div className="blog-post-content">
              <h2>{post.title}</h2>
              <p className="blog-post-details">Price: {post.price} | Posted on {post.date} by {post.author}</p>
              <p>{post.content}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BlogPost;