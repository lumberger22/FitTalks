import React, { useState, useEffect } from 'react';
import Post from '../Components/Post';
import { supabase } from '../client';
import './Gallery.css';

const Gallery = ({ searchTerm }) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts('created_at', 'desc');
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [searchTerm]);

    const fetchPosts = async (sortField = 'created_at', sortOrder = 'desc') => {
        try {
            const { data, error } = await supabase
                .from('Posts')
                .select()
                .ilike('title', `%${searchTerm}%`)
                .order(sortField, { ascending: sortOrder === 'asc' });
            
            if (error) {
                throw error;
            }

            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
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
                    <button className='most--popular-btn' onClick={sortByLikes}>Most Popular</button>
                    <button className='newest-btn' onClick={sortByDate}>Newest</button>
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