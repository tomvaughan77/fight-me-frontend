import React from 'react'
import ThemePicker from './ThemePicker'

const Header: React.FC = () => {
    return (
        <header className="bg-gray-200 col-span-full">
            <div className="px-16 py-4">
                <h1 className="text-2xl font-bold mb-4">Fight.Me</h1>
                <ThemePicker />
            </div>
        </header>
    )
}

export default Header
