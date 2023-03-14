import React, { useState } from "react"
import { useDispatch } from 'react-redux';
import logo from "../../components/assets/images/logo.svg"
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext'
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { login, logout } from '../../common/feartures/authSlice';

const Search = () => {
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })
  const user = localStorage.getItem('user');

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'user-menu-popover' : undefined;

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate('/')
      console.log('you are logged out');
    } catch (e) {
      console.log(e.message)
    }
  }
  const handleLogin = async () => {
    try {
      navigate('/signin')
    } catch (e) {
      console.log(e.message)
    }
  }
  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width'>
            <Link to='/'>
            <img src={logo} alt='' />
            </Link>
            
          </div>

          <div className='search-box f_flex'>
            <div className="search-icon"><i className='fa fa-search'></i></div>
            <input type='text' placeholder='Nhập từ khóa cần tìm' />
            <span>Chọn loại</span>
          </div>

          <div className='icon f_flex width'>
            <div>
              <button onClick={handleUserClick}>
                <i className='fa fa-user icon-circle'> </i>
              </button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button component={Link} to='/profile' sx={{ padding: '10px', minWidth: '150px' }}>Cá nhân</Button>
                <Button component={Link} to='/mypost' sx={{ padding: '10px', minWidth: '150px' }}>Bài đăng</Button>

                {user ? <Button sx={{ padding: '10px', minWidth: '150px' }} onClick={handleLogout}>Logout</Button>:<Button sx={{ padding: '10px', minWidth: '150px' }} onClick={handleLogin}>Login</Button>}
                </div>
              </Popover>
            </div>
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Search
