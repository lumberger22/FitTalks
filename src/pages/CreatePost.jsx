import React from 'react'
import { useState } from 'react'
import { supabase } from '../client'
import './CreatePost.css'

export default function CreatePost() {

    const [post, setPost] = useState({title: "", description: "", media: ""})

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .insert({title: post.title, description: post.description, media: post.media})
          .select();
      
        window.location = "/posts";
    }

    return (
        <div>
            <form autoComplete='off'>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="Title" 
                    required 
                    onChange={handleChange} /><br />
                <br/>

                <input
                    type="text" 
                    id="description" 
                    name="description" 
                    placeholder="Content (Optional)" 
                    onChange={handleChange} /><br />
                <br/>

                <input
                    type="text" 
                    id="media" 
                    name="media" 
                    placeholder="Image URL (Optional)"
                    onChange={handleChange} /><br />
                <br/>
                
                <input type="submit" value="Create Post" onClick={createPost}/>
            </form>
        </div>
    )
}