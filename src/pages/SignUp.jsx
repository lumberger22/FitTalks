import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../client';

export default function SignUp() {
    const [user, setUser] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const signUpNewUser = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
                emailRedirectTo: 'https://localhost:5173/FitTalks/signin',
            },
        });

        if (error) {
            alert(error.message);
        } else {
            navigate('/FitTalks/signin');
        }
    };

    return (
        <>
            <div>
                <h1>Sign Up</h1>
            </div>
            <form onSubmit={signUpNewUser}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}