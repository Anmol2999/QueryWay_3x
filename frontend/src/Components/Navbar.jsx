import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BaseUrl,post } from '../services/Endpoint'
import { RemoveUser } from '../redux/AuthSlice';
import {  useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';

export default function Navbar() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [islogin,setIslogin]=useState(true)
  const user = useSelector((state)=> state.auth.user)
  console.log('user',user)

  const handleLogout = async()=>{
    try {
      const response = await post('/auth/logout')
      const data=response.data
      if(response.status == 200){
        navigate('/')
        dispatch(RemoveUser())
        toast.success(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
    <nav className="navbar d-flex justify-content-between  align-items-center p-4 bg-dark"
    style={{backgroundColor:"black"}} >
      <Link to={'/'}><h1 className="mx-5 text-white fs-2.3 fw-bold">QueryWay</h1></Link>
      <div className="d-flex align-items-center">
      
      {!user?<Link to={'/login'}><button className="btn_sign mx-3">Sign in</button></Link> :(
            <div className="dropdown">
            <div className="avatar-container pointer rounded-circle overflow-hidden bg-info" data-bs-toggle="dropdown" aria-expanded="false" style={{width:'40px',height:'40px',cursor:'pointer'}}>
 
 
            <img src={`${BaseUrl}/images/${user.profile}`} 
            className="img-fluid h-100 w-100" 
            style={{objectFit:"cover"}} alt="" />
 
            </div>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
 
            
            {user && user.role=='admin'? <li><Link className='dropdown-item' to='/dashboard'>Dashboard</Link></li> : ""}
            <li><Link className='dropdown-item' to='/profile/98989834'>Profile</Link></li>
            <li><a className="dropdown-item" style={{cursor:"pointer"}} onClick={handleLogout}>Sign Out</a></li>
         </ul>
         </div>
        
      
      )}
     
      
        
      </div>
      </nav>
    </>
  )
}
