import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import Gallery from './pages/Gallery'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import DetailPage from './pages/DetailPage'
import { Link } from 'react-router-dom'


const App = () => { 

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<Home />
    },
    {
      path: "/posts",
      element:<Gallery />
    },
    {
      path:"/posts/editPost/:id",
      element: <EditPost />
    },
    {
      path:"/newPost",
      element: <CreatePost />
    },
    {
      path:"/posts/detailPage/:id",
      element: <DetailPage />
    }
  ]);

  return ( 

    <div className="App">
      <div className="nav">
        <h1>FitTalks</h1>
        <Link to="/"><button className="navBtn"> Home </button></Link>
        <Link to="/posts"><button className="navBtn"> Posts </button></Link>
        <Link to="/newPost"><button className="navBtn"> Create Post </button></Link>
      </div>
      <div className='content'>
        {element}
      </div>
    </div>

  );
}

export default App;
