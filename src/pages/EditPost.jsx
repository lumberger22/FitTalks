import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './EditPost.css';

const EditPost = () => {
    const [post, setPost] = useState({
        title: '', description: '', media: ''
    });
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase.from('Posts').select('*').eq('id', id).single();
            if (data) {
                setPost({
                    title: data.title,
                    description: data.description,
                    media: data.media
                });
            }
            if (error) {
                console.error('Error fetching post', error);
            }
        };
    
        fetchPost();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const updatePost = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase
            .from('Posts')
            .update({
                title: post.title,
                description: post.description,
                media: post.media
            })
            .eq('id', id);

        if (error) {
            console.error('Error updating post', error);
        } else {
            window.location = "/";
        }
    };

    const deletePost = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase
            .from('Posts')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting post', error);
        } else {
            window.location = "/";
        }
    };

    return (
        <div>
            <form autoComplete='off'>
            <input 
                    type="text" 
                    id="title" 
                    name="title"
                    value={post.title}
                    required 
                    onChange={handleChange} /><br />
                <br/>

                <input
                    type="text" 
                    id="description" 
                    name="description" 
                    value={post.description} 
                    onChange={handleChange} /><br />
                <br/>

                <input
                    type="text" 
                    id="media" 
                    name="media" 
                    value={post.media}
                    onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Update Post" onClick={updatePost} />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    );
}

export default EditPost;