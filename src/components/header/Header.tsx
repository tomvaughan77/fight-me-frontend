import React from 'react'
import ThemePicker from './ThemePicker'

const Header: React.FC = () => {
    return (
        <header className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-2xl font-bold">Fight.Me</a>
            </div>
            <div className="flex-none gap-2">
                <ThemePicker />
            </div>
        </header>
    )
}

export default Header
