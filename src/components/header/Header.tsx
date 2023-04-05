import React from 'react'
import ThemePicker from './ThemePicker'

const Header: React.FC = () => {
    return (
        <header className="card col-span-full card-compact">
            <div className="card-body px-16 py-4">
                <h1 className="text-2xl font-bold">Fight.Me</h1>
                <div className="justify-end">
                    <ThemePicker />
                </div>
            </div>
        </header>
    )
}

export default Header
