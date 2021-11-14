import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import { logout } from "../../../Api/account";
import { TokenAccount, SetUser } from "../../../hooks/useAccount";
const HeaderAuth = ({user}) => {
    const history = useHistory();
    const logoutToken = async () => {
        try {
            const tokenLogout = {
                token: TokenAccount.getToken()
            }
            TokenAccount.removeToken()
            SetUser.removeUser()
            await logout(tokenLogout)
            history.push("/admin/login")  
        } catch (error) {
            console.log(error)
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
                    <Link className="nav-link" onClick={logoutToken}>{user.name}</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default HeaderAuth
