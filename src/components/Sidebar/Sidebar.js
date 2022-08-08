import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../config'
import classNames from 'classnames'
import './SideBar.css'

export default function Sidebar({ appname, pathname }) {
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

    useEffect(() => {
        // console.log(open);
    }, [open]);

    const parentpath = `/${pathname.split('/')[1]}`;

    return (
        <div className="sidebar">
            <div className="collapse-ctr">
                <i
                    className="bi bi-layout-sidebar-inset"
                    onClick={() => {
                        if (open) {
                            setOpen(false)
                        } else {
                            setOpen(true);
                        }
                    }}
                />
            </div>
            <h2 className="title">{open ? appname : appname[0]}</h2>
            <ul className="nav">
                {
                    routes
                        .filter(r => r.nav !== false)
                        .map(({ path, label, icon }) => {
                            return (
                                <li key={path}>
                                    <Link to={path} className={classNames({ selected: parentpath === path })}>
                                        <i className={classNames('bi', icon)}></i>
                                        {open && <span className="nav-label">{label}</span>}
                                    </Link>
                                </li>
                            );
                        })
                }
            </ul>
            <div className='collapse-ctr'>
                <Link to="/Settings" className={classNames({ selected: parentpath === '/Settings' })}>
                    <i className="bi bi-gear"></i>
                    {open && <span className="nav-label">Settings</span>}
                </Link>
            </div>
        </div>
    );
}