import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import './Comments.css';

const Comments = ({ id }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetchComments();
    }, [id]);

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('Posts')
            .select('comments')
            .eq('id', id)
            .single();
    
        if (error) {
            console.log('Error fetching comments', error);
        } else {
            setComments(data.comments || []);
        }
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const submitComment = async (event) => {
        event.preventDefault();
        const updatedComments = [...comments, newComment];

        const { error } = await supabase
            .from('Posts')
            .update({ comments: updatedComments })
            .eq('id', id);

        if (error) {
            console.log('Error submitting comment', error);
        }
        else {
            setComments(updatedComments);
            setNewComment('');
        }
    };

    return (
        <div className='comments--section'>
            <form className='comment--form' onSubmit={submitComment}>
                <input
                    type="text"
                    placeholder="Leave a Comment..."
                    value={newComment}
                    onChange={handleCommentChange}
                />
            </form>
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index}>
                        <p className='comment--text'>- {comment}</p>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
};

export default Comments;