import React from 'react';
import PropTypes from 'prop-types';

PostList.propTypes = {
  posts: PropTypes.array,
};

PostList.defaultProps = {
  posts: [],
};

function PostList(props) {
  const { posts } = props;
  return (
    <div className="flex flex-col items-center">
      <ul className="w-full max-w-md">
        {posts.map(post => (
          <li key={post.id} className="bg-white border rounded-lg shadow-md mb-4 p-4">
            <div className="font-bold text-lg mb-2">{post.id} - {post.title}</div>
            <div className="text-gray-600 text-sm">{post.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;