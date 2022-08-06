import React from 'react'
import { Link } from 'react-router-dom'
import CommandPalette from '../components/ComandPalette'

export default function Home() {
    return (
        <div className="Home">
            <Link to="/Example">Go to Example</Link>.
            <CommandPalette />
        </div>
    );
}