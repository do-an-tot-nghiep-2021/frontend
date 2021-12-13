import FooterApp from "./component/footer";
import NavApp from "./component/nav";
import { SetUserGoogle, TokenAccount } from "../../hooks/useAccount";
import "./css/theme.css";
import "./css/responsive.css";
import "./css/bootstrap.min.css";

const AppLayout = (props) => {
  const user = (SetUserGoogle.getUserGoogle()) != "" ? SetUserGoogle.getUserGoogle() : "";
  return (
  <div className="wrapper">
    <NavApp user={user}/>
      <main>
        <div className="main-part">
          {props.children}
        </div>
      </main>
    <FooterApp />
  </div>
  );
};

export default AppLayout;
