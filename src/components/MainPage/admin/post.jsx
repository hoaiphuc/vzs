import React from 'react';
import GetPost from '../../../common/axios/getPostsAxios';


const PostList = () => {
  const [posts] = GetPost();
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