import { Link } from 'react-router-dom'
import './Home.css';

export default function Home() {
  return (
    <div className='home--page'>
      <h1 className="title">Fit Talks</h1>
      <h3 className="subtitle">Welcome to the Fitness and Wellness Forum!</h3>
      <p className="description">Welcome to FitTalk, your go-to online community for all things fitness and wellness! Whether you're a beginner looking for advice on getting started, a seasoned athlete seeking to enhance performance, or anyone in between aiming to maintain a healthy lifestyle, FitTalk is here for you</p>
      <div className="btn--container">
        <Link to="/posts"><button className="navBtn"> Explore Posts </button></Link>
        <Link to="/newPost"><button className="navBtn"> Create a Post </button></Link>
        </div>
    </div>
  );
}