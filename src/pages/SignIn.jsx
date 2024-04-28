import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../client';

export default function SignIn() {
    const [user, setUser] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const signInNewUser = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password,
        })        

        if (error) {
            alert(error.message);
        } else {
            navigate('/FitTalks/');
        }
    };

    return (
        <>
            <div>
                <h1>Sign In</h1>
            </div>
            <form onSubmit={signInNewUser}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
                <button type="submit">Sign In</button>
            </form>
        </>
    );
}