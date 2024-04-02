import React from 'react'
import './header.scss'

export const Header = () => {
  return (
    <div className="header__container">

        <ul className="container-lists__menu-list">
            <li className="menu-list__item">
                <a href="#" className="menu-list__link">
                    <i className="fa fa-plus"></i>
                    <span className="menu-list__title">Home</span>
                </a>
            </li>

            <li className="menu-list__item">
                <a href="#" className="menu-list__link">
                    <i className="fa fa-list"></i>
                    <span className="menu-list__title">Timeline</span>
                </a>
            </li>

            <li className="menu-list__item">
                <a href="#" className="menu-list__link">
                    <i className="fa fa-user"></i>
                    <span className="menu-list__title">Follows</span>
                </a>
            </li>

            <li className="menu-list__item">
                <a href="#" className="menu-list__link">
                    <i className="fa fa-envelope"></i>
                    <span className="menu-list__title">Inbox</span>
                </a>
            </li>
        </ul>

        <ul className="container-lists__list-end">
            <li className="list-end__item">
                <a href="#" className="list-end__link">
                    <span className="list-end__name">Hi, Marcos!</span>
                </a>
            </li>
            <li className="list-end__item">
                <a href="#" className="list-end__link">
                    <i className="fa fa-gear"></i>
                    <span className="list-end__name">Config</span>
                </a>
            </li>
            <li className="list-end__item">
                <a href="#" className="list-end__link">
                    <i className="fa fa-arrow-down"></i>
                    <span className="list-end__name">Logout</span>
                </a>
            </li>
        </ul>

    </div>
  )
}
