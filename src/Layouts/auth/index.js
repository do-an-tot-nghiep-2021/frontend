import HeaderAuth from "./component/header"
import NavAuth from "./component/nav"
import { Route, Redirect } from "react-router"
import { isAuthenticated } from "../../Api/account"

const AuthLayout = (props) => {
    return (

        <Route
            render={() => {
                return isAuthenticated() ? (
                    <div>
                        <HeaderAuth />
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
                ) : (
                    <Redirect to={{ pathname: "/login/admin" }} />
                );
            }}
        />

    )
}

export default AuthLayout
