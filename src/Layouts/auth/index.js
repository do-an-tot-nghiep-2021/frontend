import HeaderAuth from "./component/header"
import NavAuth from "./component/nav"
import { Redirect } from "react-router"
import { SetUser } from "../../hooks/useAccount"
import "./assets/vendors/base/vendors.bundle.css";
import "./assets/demo/default/base/style.bundle.css";
import "./assets/vendors/custom/fullcalendar/fullcalendar.bundle.css";
const AuthLayout = (props) => {
    const user = (SetUser.getUser()) != "" ? SetUser.getUser() : "";
    return (
        <>
            {(SetUser.getUser() && SetUser.getUser().role == 10) ?
                <div class="m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default">
                    <div class="m-grid m-grid--hor m-grid--root m-page" style={{ minHeight: "95vh" }}>
                        <HeaderAuth user={user} />
                        <div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
                            <button class="m-aside-left-close  m-aside-left-close--skin-dark " id="m_aside_left_close_btn"><i class="la la-close"></i></button>
                            <NavAuth />
                            <div className="m-grid__item m-grid__item--fluid m-wrapper">
                                {props.children}
                            </div>
                        </div>
                        {/* <Footer /> */}
                    </div>
                </div>
                :
                <Redirect to={{ pathname: "/login/account" }} />
            }
        </>
    )
}

export default AuthLayout
