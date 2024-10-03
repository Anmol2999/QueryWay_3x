import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BaseUrl, post } from '../services/Endpoint';
import { RemoveUser } from '../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import './Navbar.css'; // Import custom CSS for further styling

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      const response = await post('/auth/logout');
      const data = response.data;
      if (response.status === 200) {
        navigate('/');
        dispatch(RemoveUser());
        toast.success(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar p-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link to={'/'} className="navbar-brand fw-bold brand-name">
            Query<span className="highlight">Way</span>
          </Link>

          <div className="d-flex align-items-center">
            {!user ? (
              <Link to={'/login'}>
                <button className="btn btn-signin mx-3 px-4 py-2">
                  Sign In
                </button>
              </Link>
            ) : (
              <div className="dropdown">
                <div
                  className="avatar-container pointer rounded-circle overflow-hidden bg-light shadow-sm"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    width: '45px',
                    height: '45px',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <img
                    src={`${BaseUrl}/images/${user.profile}`}
                    className="img-fluid h-100 w-100"
                    style={{ objectFit: 'cover' }}
                    alt="User Avatar"
                  />
                </div>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-light custom-dropdown">
                  {user && user.role === 'admin' ? (
                    <li>
                      <Link className="dropdown-item" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                  ) : null}
                  <li>
                    <Link className="dropdown-item" to={`/profile/${user.id}`}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      style={{ cursor: 'pointer' }}
                      onClick={handleLogout}
                    >
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
