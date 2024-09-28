import React from 'react'
import RecentPost from '../Components/RecentPost'
import Chatbot from '../Components/ChatBox'
import BotpressWidget from '../Components/ChatBox'



export default function Home() {
  return (
    <>
      <div className="container-fluid bg-dark hero-section text-center">
        <h1 className="fs-1 fw-bold text-light">Welcome To QueryWay</h1>
        <p className="text-light fs-5 mt-3">
          Dive into a world of thoughts, insights, and solutions. 
          
          
        </p>
      </div>

      <div className='container-fluid p-5'>
        <RecentPost/>
        <BotpressWidget/>
        
      </div>
      </>
  )
}
