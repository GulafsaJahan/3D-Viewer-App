import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ auth, setAuth }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      setUser(null); // Clear user state when not found
    }
  }, [auth]); // Re-run effect on auth change

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth(false);
    setUser(null); // Clear user state
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">3D Viewer</Link>
      <div className="navbar-nav ml-auto">
        {user && (
          <>
            <Link className="nav-link" to="/upload">Upload</Link>
            <Link className="nav-link" to="/viewer">Viewer</Link>
          </>
        )}
        {user ? (
          <div className="navbar-nav ml-auto d-flex align-items-center">
            <div className="d-flex align-items-center">
              <img
                src={user.profilePic.startsWith('http') ? user.profilePic : `http://localhost:5000${user.profilePic}`}
                alt={user.username}
                className="rounded-circle mr-2"
                style={{ width: '30px', height: '30px' }}
              />
              <span className="text-white mr-3">{user.username}</span>
              <button onClick={handleLogout} className="btn btn-link nav-link text-white">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link className="nav-link" to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
