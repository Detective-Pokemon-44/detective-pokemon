import { Link } from "react-router-dom"


export default function Navbar() {
    return (
        <>
            <header className="Navbar">
                <h1>Detective Pokemon</h1>
                <Link to='/about'>About</Link>
            </header>
        </>
    )
}