import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import { logoutadmin } from "../../../Api/account";
const HeaderAuth = () => {
    const history = useHistory();
    const logout = (e) => {
        e.preventDefault();
        if(localStorage.getItem('accessToken')){
            const tokenLogout = {
                token: localStorage.getItem('accessToken')
            }
            console.log(tokenLogout)
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
            logoutadmin(tokenLogout)
            history.push("/")
        }
        
    }
    return (
        <>
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <Link className="navbar-brand col-sm-3 col-md-2 p-2" to="/">
                <img src={process.env.PUBLIC_URL + '/logo192.png'} width="50" /> </Link>
                <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                    <Link className="nav-link" onClick={logout}>Sign out</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default HeaderAuth
