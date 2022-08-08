import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import './SubBar.css'

export default function SubBar({ routes }) {
    const { pathname } = useLocation();
    const pathparts = pathname.split('/').filter(i => i);
    const subpath = pathparts.length > 1 ? pathparts.at(-1) : '';
    const [open, setOpen] = useState(true);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        function handleResize() {
            const { innerWidth } = window;

            if (innerWidth < 800) {
                setOpen(false)
            } else {
                setOpen(true);
            }
        }

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="subbar">
            <ul className="nav">
                {
                    routes
                        .filter(r => r.nav !== false)
                        .map(({ path, label, icon }, index) => {
                            return (
                                <li key={path}>
                                    <Link to={path} className={classNames({ selected: subpath === path })}>
                                        {icon && open && <i className={classNames('bi', icon)}></i>}
                                        { 
                                            open ?
                                            <span className={classNames('nav-label', { 'no-icon': !icon })} title={label}>{label}</span> :
                                            icon ? 
                                            <i className={classNames('bi', icon)}></i> :
                                            <span className='nav-label no-icon' title={label}>
                                                <span className='closed-label'>
                                                    <span>{index + 1}</span>
                                                </span>
                                            </span>
                                        }
                                    </Link>
                                </li>
                            );
                        })
                }
            </ul>
        </div>
    );
}