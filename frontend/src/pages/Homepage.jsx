import React from 'react'
import './Homepage.css';

const Homepage = () => {
  return (
    <div className='homePage'>
      <nav className='homePageNav'>
         <button className='homePageTitle'>
            <img src="../../public/logo.svg" alt="logo" />
            <h3>My Project’s</h3>
         </button>
         <ul className='homePageLink'>
            <li><a href="">How It Works</a></li>
            <li><a href="">Features</a></li>
            <li><a href="">Projects</a></li>
            <li><a href="">Community</a></li>
            <li><a href="">Jobs</a></li>
            <li><a href="">Pricing</a></li>
            <li><a href="">Blog</a></li>
         </ul>
         <button className='homePageStartedBtn'><a href="">Get started</a></button>
      </nav>
      <div className="homePageContent">
         <h2 className="pageContentTitle">Build. Collaborate. Grow.</h2>
         <p className="pageContentTitleText">Team up, work on real projects, and take your IT skills to the next level.</p>
         .
      </div>
    </div>
  )
}

export default Homepage