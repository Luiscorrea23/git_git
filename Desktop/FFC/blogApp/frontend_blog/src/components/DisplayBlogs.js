import React from 'react';
import Control from './Control';
import ShowInfo from './ShowInfo';

const DisplayBlogs = ({ blogs }) => {
  return (
    <div>
      {blogs.length > 0 && (
        blogs.map(blog => (
          <p key={blog.title}>
            {blog.title}
            <Control
              children={<ShowInfo blog={blog} />}
              buttonLabel={"hide"}
            />
          </p>
        ))
      )}
    </div>
  );
};

export default DisplayBlogs;
