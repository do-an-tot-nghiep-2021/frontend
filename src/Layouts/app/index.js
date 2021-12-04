import FooterApp from "./component/footer";
import NavApp from "./component/nav";
import { SetUserGoogle, TokenAccount } from "../../hooks/useAccount";
import "./css/sm-core-css.css";
import "./css/sm-simple.css";
import "./css/style.css";
import "./css/responsive.css";
import "./css/bootstrap.min.css";

const AppLayout = (props) => {
  const user = (SetUserGoogle.getUserGoogle()) != "" ? SetUserGoogle.getUserGoogle() : "";
  return (<>
    <NavApp user={user}/>
      <section className="shop-page-area">
        <div className="container mt-5">
          {props.children}
        </div>
      </section>
    <FooterApp />
  </>
  );
};

export default AppLayout;
