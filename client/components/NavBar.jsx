import React,{useState,useEffect} from 'react'
import { removeGlobaluser } from '../slices/userSlice';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebasecon';
import {Link} from  'react-router';
import '../pagestyling/NavBar.css';


const NavBar = () => {
    const dispatch = useDispatch();
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 1) {
          setSticky(true);
        } else {
          setSticky(false);
        }
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
  return (
    <nav className={`navbar ${sticky ? 'sticky-header' : ''}`}>
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/history" className="nav-link">History</Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link">Contact</Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">About</Link>
        </li>
        <li>
          <button className="logout-btn" onClick={logOut}>Log out</button>
        </li>
      </ul>
    </nav>
  )
}
export default NavBar