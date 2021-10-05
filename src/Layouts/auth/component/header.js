import { Link } from "react-router-dom"

const HeaderAuth = () => {
    return (
        <>
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <Link className="navbar-brand col-sm-3 col-md-2 p-2" to="/">
                <img src={process.env.PUBLIC_URL + '/logo192.png'} width="50" /> </Link>
                <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                    <a className="nav-link" href="#">Sign out</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default HeaderAuth
