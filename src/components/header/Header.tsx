import React from 'react'
import ThemePicker from './ThemePicker'

const Header: React.FC = () => {
    return (
        // <header className="card col-span-full card-compact">
        //     <div className="card-body px-16 py-4">
        //         <h1 className="text-2xl font-bold">Fight.Me</h1>
        //         <div className="justify-end">
        //             <ThemePicker />
        //         </div>
        //     </div>
        // </header>
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
