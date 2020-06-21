import React from "react"
import { Link } from "gatsby"

const Header = props => {
  return (
    <div className="header">
      <nav className="header__nav">
        <li className="header__nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="header__nav-item">
          <Link to="/blogs">Blogs</Link>
        </li>
        <li className="header__nav-item">
          <Link to="/portfolio">Portfolio</Link>
        </li>
      </nav>
    </div>
  )
}

export default Header
