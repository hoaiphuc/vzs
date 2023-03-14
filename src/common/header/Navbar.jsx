import React, { useState } from "react"
import { Link } from "react-router-dom"
import Categories from "../../components/MainPage/Categories"

const Navbar = () => {
  // Toogle Menu
  const [MobileMenu, setMobileMenu] = useState(false)

  const [open, setOpen] = useState(false)
  return (
    <>
      <header className='header'>
        <div className='container d_flex'>
          <div className="ml-2" style={{ width: '20%' }}>
            {/* <Categories /> */}
          </div>

          <div className='navlink'>
            <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
              {/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
              <li>
                <Link to='/'>Trang chủ</Link>
              </li>
              <li>
                <Link to='/post'>Đăng bài</Link>
              </li>
            </ul>

            <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
              {MobileMenu ? <i className='fas fa-times close home-btn'></i> : <i className='fas fa-bars open'></i>}
            </button>

          </div>

        </div>
      </header>
    </>
  )
}

export default Navbar
