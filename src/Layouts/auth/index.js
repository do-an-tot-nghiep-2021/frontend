import HeaderAuth from "./component/header"
import NavAuth from "./component/nav"

const AuthLayout = (props) => {
    return (
        <>
            <div>
                <HeaderAuth/>
                <div className="container-fluid">
                    <div className="row">
                        <NavAuth/>
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="mt-3">
                                {props.children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthLayout
