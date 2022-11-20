import React from 'react'
import { Link } from 'react-router-dom'
import { RouteNames } from '../routes'

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to={RouteNames.HOME}>Todo</Link>
      </div>
      <a className="togglebtn" href="#">
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </a>
      <div className="navbar-links">
        <ul>
          <li>
            <Link to={RouteNames.HOME}>Домой</Link>
          </li>
          <li>
            <Link to={RouteNames.NEW_TODO}>Создать</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
