import BannerApp from "./component/banner"
import FooterApp from "./component/footer"
import NavApp from "./component/nav"

const AppLayout = (props) => {
    return (
        <>
            <NavApp/>
            <BannerApp/>
            {props.children}
            <FooterApp/>
        </>
    )
}

export default AppLayout
