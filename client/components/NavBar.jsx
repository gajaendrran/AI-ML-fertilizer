  import React, { useState, useEffect } from 'react';
  import { removeGlobaluser } from '../slices/userSlice';
  import { useDispatch } from 'react-redux';
  import { signOut } from 'firebase/auth';
  import { auth } from '../config/firebasecon';
  import { Link } from 'react-router-dom';
  import { FaHome, FaBook, FaInfoCircle, FaSignOutAlt, FaBell } from 'react-icons/fa';
  import '../pagestyling/NavBar.css';

  const NavBar = () => {
    const dispatch = useDispatch();
    const [sticky, setSticky] = useState(false);
    const [active, setActive] = useState('home');

    useEffect(() => {
      const handleScroll = () => {
        setSticky(window.scrollY > 1);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    async function logOut() {
      await signOut(auth);
      dispatch(removeGlobaluser());
    }

    function handleClick(item) {
      setActive(item);
    }

    return (
      <nav className={`navbar ${sticky ? 'sticky-header' : ''}`}>
        <h2>Smart Fert</h2>
        <ul className="nav navbar-nav navbar-right">
          <li className={active === "home" ? "active" : ""} onClick={() => handleClick('home')}>
            <Link to="/home" className="nav-link">
              <FaHome />
              {active === 'home' && <span>Home</span>}
            </Link>
          </li>
          <li className={active === "history" ? "active" : ""} onClick={() => handleClick('history')}>
            <Link to="/history" className="nav-link">
              <FaBook />
              {active === 'history' && <span>History</span>}
            </Link>
          </li>
          <li className={active === "notify" ? "active" : ""} onClick={() => handleClick('notify')}>
            <Link to="/notify" className="nav-link">
            <FaBell />
              {active === 'notify' && <span>Notify</span>}
            </Link>
          </li>
          <li className={active === "about" ? "active" : ""} onClick={() => handleClick('about')}>
            <Link to="/about" className="nav-link">
            <FaInfoCircle />
              {active === 'about' && <span>About</span>}
            </Link>
          </li>
          <li>
            <button className="logout-btn" onClick={logOut}>
              <FaSignOutAlt />
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  export default NavBar;
