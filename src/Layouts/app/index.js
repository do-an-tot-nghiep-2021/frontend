import "./appLayout.css";
import FooterApp from "./component/footer";
import NavApp from "./component/nav";

const AppLayout = (props) => {
  return (
    <div className="body-app">
      <NavApp />
      <div className="body-website">
        <div className="container">{props.children}</div>
      </div>

      <FooterApp />
    </div>
  );
};

export default AppLayout;
