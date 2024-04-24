import React, { useState, useEffect } from 'react';
import Post from '../Components/Post';
import { supabase } from '../client';
import './Gallery.css';

const Gallery = (props) => {

    const [post, setPost] = useState([]);
    const [check, setCheck] = useState(0);

    useEffect(() => {

        const fetchPost = async () => {
            const {data} = await supabase.from('Posts').select();
            setPost(data);
            setCheck(check + 1);
        }

        setPost(props.data);
        fetchPost();

    }, [props]);
    
    return (
        <>
            <div className="gallery--page">
                <div className="gallery">
                    {
                        check > 0 ? (post && post.length > 0 ?
                        post.map((member,index) => 
                        <Post key={index} id={member.id} title={member.title} timestamp={member.created_at} likes={member.likes}/>
                        ) : <h2>{'No Posts Yet'}</h2>
                    ) : null
                    }
                </div> 
            </div>
        </>
    )
}

export default Gallery;