import './DetailPage.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

export default function DetailPage() {

    const [post, setPost] = useState({
        title: '', description: '', media: '', likes: 0
    });
    const { id } = useParams();
    
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase.from('Posts').select('*').eq('id', id).single();
            if (data) {
                setPost({
                    title: data.title,
                    description: data.description,
                    media: data.media,
                    likes: data.likes
                });
            }
            if (error) {
                console.error('Error fetching post', error);
            }
        };
    
        fetchPost();
    }, [id]);

    return (
        <div className="detail--page">
            <h1 className='detail--page--header'>Post Details</h1>
            <hr />
            <div className="detail--page--content">
                <h1 className='detail--page--title'>{post.title}</h1>
                <div className="detail--page--details">
                    <h3 className="details--title">Title: {post.title}</h3>
                    <h3 className="details--description">Description: {post.description}</h3>
                    <h3 className="details--media">Media: {post.media}</h3>
                    <h3 className="details--likes">Likes: {post.likes}</h3>
                </div>
            </div>
            <p className='back-btn'><a href='/posts'>Back to Posts</a></p>
        </div>
    )
}