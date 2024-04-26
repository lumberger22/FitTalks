import React, { useState, useEffect } from 'react';
import Post from '../Components/Post';
import { supabase } from '../client';
import './Gallery.css';

const Gallery = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts('created_at', 'desc');
    }, []);

    const fetchPosts = async (sortField, sortOrder) => {
        const { data, error } = await supabase
            .from('Posts')
            .select()
            .order(sortField, { ascending: sortOrder === 'asc' });
        if (error) {
            console.error('Error fetching posts:', error);
        } else {
            setPosts(data);
        }
    };

    const sortByLikes = () => {
        fetchPosts('likes', 'desc');
    };

    const sortByDate = () => { 
        fetchPosts('created_at', 'desc');
    };
    
    return (
        <div className="gallery--page">
            <div className="gallery--header">
                <p>Order by: </p>
                <div className='order--btns'>
                    <button onClick={sortByLikes}>Likes</button>
                    <button onClick={sortByDate}>Date</button>
                </div>
            </div>
            <div className="gallery">
                {posts.length > 0 ? (
                    posts.map((post, index) => 
                        <Post key={index} id={post.id} title={post.title} timestamp={post.created_at} likes={post.likes} />
                    )
                ) : <h2>No Posts Yet</h2>}
            </div> 
        </div>
    );
}

export default Gallery;