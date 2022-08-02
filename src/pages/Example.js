import React from 'react'
import { Link } from 'react-router-dom'

export default function Example({ title }) {
    return (
        <div className="Example">
            <Link to="/">Go home</Link>.
        </div>
    )
}