import React, { useState, useEffect } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import axios from 'axios'
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const postsPerPage = 20;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false)
    }
    fetchPosts();
  }, [])

  console.log(posts);

  const indexOfLastPost = currentPage * postsPerPage; // if 1 = 6, if 2 = 12
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 12 - 6 = 6
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // slice(6, 12)


  //chnage page number, changes CurrentPage, which is pulled from number prop in Pagination.js
  //In English: Whne you press the button, it sends a number which tells the page to change the data inside of CurrentPage, which is the number that was pulled from Pagination.js.
  // Example: Pagination.js clicks on the number 2, it sends number 2 to this function and sets the currentpage to number 2 from number 1.
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">
        MyApp
      </h1>
      <Posts posts={currentPosts} loading={loading}></Posts>
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}></Pagination>
    </div>
  );
}

export default App;
