import React from "react"

const Navbar = () => {
  return (
    <nav className="nav-warpper grey darken-4">
      <div className="Container">
        <a className="brand-logo">RateMyClass</a>
        <ul className="right">
          <li><a href="/">Home</a></li>
          <li><a href="/stats">Stats</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
