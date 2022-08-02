import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../Routes'
import classNames from 'classnames'
import './Sidebar.css'

export default function Sidebar({ pathname }) {
    return (
        <div className="sidebar">
            <h2 className='title'>DARTT</h2>
            <ul className="nav">
                {
                    routes.map(({ path, label, icon }) => {
                        return (
                            <li
                                key={path}
                                className={classNames({ selected: pathname === path })}
                            >
                                <i className={classNames('bi', icon)}></i>
                                <Link to={path}>{label}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}