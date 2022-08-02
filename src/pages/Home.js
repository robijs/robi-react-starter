import React from 'react'
import { Link } from 'react-router-dom'

export default function Home({ title }) {
    return (
        <div className="Home">
            <Link to="/Example">Go to Example page</Link>.
        </div>
    )
}