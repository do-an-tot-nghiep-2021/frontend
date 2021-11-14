import HeaderAuth from "./component/header"
import NavAuth from "./component/nav"
import { Route, Redirect } from "react-router"
import { SetUser } from "../../hooks/useAccount"

const AuthLayout = (props) => {
    const user = (SetUser.getUser()) != "" ? SetUser.getUser() : "";
    return (
        <>
            {(SetUser.getUser() && SetUser.getUser().role == 10) ?
            <div>
                <HeaderAuth user={user}/>
                <div className="container-fluid">
                    <div className="row">
                        <NavAuth />
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="mt-3">
                                {props.children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
         : 
            <Redirect to={{ pathname: "/" }} />
}
</>
    )
}

export default AuthLayout
