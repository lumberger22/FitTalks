import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import Gallery from './pages/Gallery'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import DetailPage from './pages/DetailPage'
import { Link } from 'react-router-dom'


const App = () => { 

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<Gallery />
    },
    {
      path:"/editPost/:id",
      element: <EditPost />
    },
    {
      path:"/newPost",
      element: <CreatePost />
    },
    {
      path:"/detailPage/:id",
      element: <DetailPage />
    }
  ]);

  return ( 

    <div className="App">
      <div className="nav">
        <h1>FitTalks</h1>
        <input type="text" placeholder="Search" className="searchBar"></input>
        <div className='app--nav-btn--container'>
          <Link to="/" className="nav-btn"> Home </Link>
          <Link to="/newPost" className="nav-btn"> Create New Post </Link>
        </div>
      </div>
      <div className='content'>
        {element}
      </div>
    </div>

  );
}

export default App;
