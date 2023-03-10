import React, { useEffect, useState } from 'react';

function BlogDetail(props) {
  const postId = props.match?.params?.id;
  const [post, setPost] = useState();

  useEffect(() => {
    fetch(`https://secondhandvinhome.herokuapp.com/api/posts/${postId}`)
      .then(response => response.json())
      .then(data => setPost(data));
  }, [postId]);

  console.log(post);
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default BlogDetail;