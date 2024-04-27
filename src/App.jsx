import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import Gallery from './pages/Gallery'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import DetailPage from './pages/DetailPage'
import { Link } from 'react-router-dom'
import { useState } from 'react';


const App = () => { 

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Sets up routes
  let element = useRoutes([
    {
      path: "/FitTalks/",
      element:<Gallery searchTerm={searchTerm}/>
    },
    {
      path:"/FitTalks/editPost/:id",
      element: <EditPost />
    },
    {
      path:"/FitTalks/newPost",
      element: <CreatePost />
    },
    {
      path:"/FitTalks/detailPage/:id",
      element: <DetailPage />
    }
  ]);

  return ( 

    <div className="App">
      <div className="nav">
        <h1>FitTalks</h1>
        <input 
          type="text" 
          placeholder="Search" 
          className="searchBar" 
          value={searchTerm}
          onChange={handleSearchChange}></input>
        <div className='app--nav-btn--container'>
          <Link to="/FitTalks/" className="nav-btn"> Home </Link>
          <Link to="/FitTalks/newPost" className="nav-btn"> Create New Post </Link>
        </div>
      </div>
      <div className='content'>
        {element}
      </div>
    </div>

  );
}

export default App;
