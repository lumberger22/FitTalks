import React from 'react'
import { useState } from 'react'
import './Post.css'
import { Link } from 'react-router-dom'


const Post = (props) =>  {

  return (
      <div className="post">
        <div className='post--content'>
            <p className='post--timestamp'>{props.timestamp}</p> 
          <Link to={'detailPage/' + props.id}>
            <h3 className='post--title'>{props.title}</h3>
          </Link>
          <p className='post--likes'>{props.likes}</p>
          <Link to={'edit/'+ props.id}>
            <img className="more-btn" alt="edit button" src='#' />
          </Link>
        </div>
      </div>
  );
};

export default Post;