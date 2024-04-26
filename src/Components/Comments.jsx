import React, { useState, useEffect } from 'react';
import { supabase } from '../client';

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
        <div>
            <p className='comments--title'>Comments</p>
            <form>
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={handleCommentChange}
                />
                <button type="submit" onClick={submitComment}>Submit</button>
            </form>
            {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index}>
                        <p>{comment}</p>
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
};

export default Comments;