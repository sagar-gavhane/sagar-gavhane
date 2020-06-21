import React, { useRef, useEffect } from "react"
import { Link } from "gatsby"
import { annotate } from "rough-notation"

const Header = props => {
  const headerRef = useRef(null)

  useEffect(() => {
    if (
      headerRef.current &&
      headerRef.current.querySelector(".annotate--underline")
    ) {
      annotate(headerRef.current.querySelector(".annotate--underline"), {
        type: "box",
        color: "#4d21fc",
      }).show()
    }
  }, [])

  return (
    <div className="header" ref={headerRef}>
      <nav className="header__nav">
        <li className="header__nav-item">
          <span>
            <Link to="/" activeClassName="annotate--underline">
              Home
            </Link>
          </span>
        </li>
        <li className="header__nav-item">
          <span>
            <Link to="/blogs" activeClassName="annotate--underline">
              Blogs
            </Link>
          </span>
        </li>
        <li className="header__nav-item">
          <span>
            <Link to="/portfolio" activeClassName="annotate--underline">
              Portfolio
            </Link>
          </span>
        </li>
      </nav>
    </div>
  )
}

export default Header
