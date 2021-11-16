import FooterApp from "./component/footer";
import NavApp from "./component/nav";
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

const AppLayout = (props) => {
  return (<>
    <NavApp />
    
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
