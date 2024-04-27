import './DetailPage.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import { Link } from 'react-router-dom'
import TimeAgo from '../Components/Timeago'
import Comments from '../Components/Comments';
import like_icon from '/public/like.png';
import delete_icon from '/public/delete.png';
import edit_icon from '/public/editing.png';

export default function DetailPage() {

    const [post, setPost] = useState({
        title: '', description: '', media: '', likes: 0, id: '', created_at: ''
    });
    const { id } = useParams();
    
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase.from('Posts').select('*').eq('id', id).single();
            if (data) {
                setPost(data);
            } else if (error) {
                console.error('Error fetching post', error);
            }
        };
    
        fetchPost();
    }, [id]);

    const addLike = async () => {
        const newLikes = post.likes + 1;
        const { data, error } = await supabase
            .from('Posts')
            .update({ likes: newLikes })
            .eq('id', id);

        if (error) {
            console.error('Error updating post', error);
        } else {
            setPost({...post, likes: newLikes});
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
            window.location = "/FitTalks/";
        }
    };

    return (
        <div className="detail--page">
            <a className='back-btn' href='/FitTalks/'><span className='back--arrow'>&#8592;</span> Back</a>
            <div className="detail--page--content">
                <TimeAgo timestamp={post.created_at} />
                <div className='detail--page--header'>
                    <h1 className='detail--page--title'>{post.title}</h1>
                </div>
                <div className="detail--page--details">
                    <p className="details--description">{post.description}</p>
                    {  
                        post.media && post.media !== '' ? (
                            <img className="details--media" src={post.media} alt="post media"/>
                        ) : null
                    }
                    <div className="details--likes">
                        <div className='like-btn--container'>
                            <img className="more-btn" alt="likes button" src={like_icon} onClick={addLike}/>
                            <p className="details--likes">{post.likes} upvotes</p>
                        </div>                        
                        <div className='more-btn--container'>
                            <Link to={'/FitTalks/editPost/'+ post.id}>
                                <img className="more-btn" alt="edit button" src={edit_icon} />
                            </Link>
                            <img className="more-btn" alt="delete button" src={delete_icon} onClick={deletePost}/>
                        </div>
                    </div>
                </div>
                <Comments id={id} />
            </div>
            
        </div>
    )
}