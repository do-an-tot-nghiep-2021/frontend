import FooterApp from "./component/footer";
import NavApp from "./component/nav";
import { SetUser, TokenAccount } from "../../hooks/useAccount";
import "./css/animate.css";
import "./css/jquery-ui.css";
import "./css/sm-core-css.css";
import "./css/sm-simple.css";
import "./css/owl.carousel.min.css";
import "./css/owl.theme.default.min.css";
import "./css/jquery.fancybox.min.css";
import "./css/animate.css";
import "./css/style.css";
import "./css/responsive.css";
import "./css/bootstrap.min.css";

const AppLayout = (props) => {
  const user = (SetUser.getUser()) != "" ? SetUser.getUser() : "";
  const token = (TokenAccount.getToken()) != "" ? TokenAccount.getToken() : "";
  return (<>
    <NavApp user={user} token={token} />
    <section className="shop-page-area">
      <div className="container">
        {props.children}
      </div>
    </section>
    <FooterApp />
  </>
  );
};

export default AppLayout;
