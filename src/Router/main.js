import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "../Modules/app/screens/home/homepage";
import DashboardScreen from "../Modules/auth/screens/dashboard/dash";
import AppLayout from "../Layouts/app/index";
import AuthLayout from "../Layouts/auth/index";
import CategoryListAuth from "../Modules/auth/components/category";
import CreateFormScreen from "../Modules/auth/screens/category/create";
import UpdateFormScreen from "../Modules/auth/screens/category/update";
import ListProductComponent from "../Modules/auth/components/product/index";
import CreateProductScreen from "../Modules/auth/screens/product/create";
import UpdateProductScreen from "../Modules/auth/screens/product/update";

const RouteMain = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path={[
              "/admin/:path?",
              "/admin/categories/:id",
              "/admin/products/:id",
            ]}
          >
            <AuthLayout>
              <Switch>
                <DashboardScreen exact path="/admin" />
                <DashboardScreen exact path="/admin/dashboars" />
                <CategoryListAuth exact path="/admin/categories" />
                <CreateFormScreen exact path="/admin/categories/create" />
                <UpdateFormScreen exact path="/admin/categories/:id" />
                <ListProductComponent exact path="/admin/products" />
                <CreateProductScreen exact path="/admin/products/create" />
                <UpdateProductScreen exact path="/admin/products/:id" />
              </Switch>
            </AuthLayout>
          </Route>

          <Route>
            <AppLayout>
              <Switch>
                <HomeScreen exact path="/" />
              </Switch>
            </AppLayout>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default RouteMain;
