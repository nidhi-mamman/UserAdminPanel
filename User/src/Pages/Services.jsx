/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom'
import webdev from '../assets/webdevlopment.jpg'
import webhost from '../assets/webhost.jpg'
import python from '../assets/python.jpg'
import '../Components/CSS/Style.css';

const Services = () => {
  return (
    <>
      <h1 className='text-6xl text-purple-700 font-bold hover:text-white'>Services</h1>
      <div className='services'>
        <div className="card bg-black" >
          <img src={webdev} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-white">WEB DEVELOPMENT</h5>
            <p className="card-text text-white  mb-2">Web development refers to the creation of an application that works over the internet i.e. websites.</p>
            <Link to="https://www.geeksforgeeks.org/web-development/" className="btn  bg-purple-700 text-white hover:shadow-md hover:shadow-white">Explore</Link>
          </div>
        </div>
        <div className="card bg-black" >
          <img src={webhost} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-white">WEB HOSTING</h5>
            <p className="card-text text-white mb-2">Web hosting makes the files that comprise a website (code, images, etc.) available for viewing online.</p>
            <Link to="https://www.hostinger.in/web-hosting" className="btn  bg-purple-700 text-white hover:shadow-md hover:shadow-white">Explore</Link>
          </div>
        </div>
        <div className="card bg-black" >
          <img src={python} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-white">PYTHON</h5>
            <p className="card-text text-white mb-2">Python is commonly used for developing websites and software, data analysis, and data visualisation.</p>
            <Link to="https://www.python.org/" className="btn bg-purple-700 text-white hover:shadow-md hover:shadow-white">Explore</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Services