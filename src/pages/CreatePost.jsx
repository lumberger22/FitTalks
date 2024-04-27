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
      
        window.location = "/FitTalks/";
    }

    return (
        <div>
            <form autoComplete='off' className='create--form'>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="Title"
                    maxLength={49}
                    required
                    onChange={handleChange} /><br />

                <textarea
                    id="description" 
                    name="description"
                    cols={1000}
                    rows={5}
                    placeholder="Content (Optional)"
                    onChange={handleChange} /><br/>

                <input
                    type="text" 
                    id="media" 
                    name="media" 
                    placeholder="Image URL (Optional)"
                    onChange={handleChange} />
                
                <input type="submit" value="Create Post" onClick={createPost}/>
            </form>
        </div>
    )
}