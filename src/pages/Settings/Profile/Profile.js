import React from 'react'
import './Profile.css'

export default function Profile({ title }) {
    
    return (
        <div className="Profile">
             <h2 className='title'>{title || ''}</h2> 
        </div>
    );
}