import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardScreen from "../Modules/auth/screens/dashboard/dash";
import AppLayout from "../Layouts/app/index";
import AuthLayout from "../Layouts/auth/index";
import CategoryListAuth from "../Modules/auth/components/category";
import UpdateFormScreen from "../Modules/auth/screens/category/update";

import ListProductComponent from "../Modules/auth/components/product/index";
import UpdateProductScreen from "../Modules/auth/screens/product/update";

import ListToppingComponent from "../Modules/auth/components/topping";
import UpdateToppingScreen from "../Modules/auth/screens/topping/update";


import ListOrderComponent from "../Modules/auth/components/order";
import UpdateOrderScreen from "../Modules/auth/screens/order/update";

import ListTypesComponent from "../Modules/auth/components/types";
import UpdateTypesScreen from "../Modules/auth/screens/types/update";

import BuildingListAuth from "../Modules/auth/components/building";
import UpdateBuildingScreen from "../Modules/auth/screens/building/update";

import UpdateClassroomScreen from "../Modules/auth/screens/classroom/update";
import ClassroomListAuth from "../Modules/auth/components/classroom";

import HomePageComponentApp from "../Modules/app/components/home";
import Cart from "../Modules/app/screens/cart";
import DetailProductComponentApp from "../Modules/app/components/detailProduct";
import LoginAuth from "../Modules/account/auth/login";
import AccountLayout from "../Layouts/account";
import Register from "../Modules/account/register";
import CheckOrderComponents from "../Modules/app/components/checkorder";
import AddressUser from "../Modules/app/screens/checkout/address";
import ListUserComponent from "../Modules/auth/components/user";
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
              "/admin/toppings/:id",
              "/admin/types/:id",
              "/admin/building/:id",
              "/admin/classroom/:id",
              "/admin/size/:id",
              "/admin/size/history/:id",
              "/admin/orders/:id",
            ]}
          >
            <AuthLayout>
              <Switch>
                <DashboardScreen exact path="/admin" />
                <DashboardScreen exact path="/admin/dashboars" />

                <CategoryListAuth exact path="/admin/categories" />
                <UpdateFormScreen exact path="/admin/categories/:id" />

                <ListProductComponent exact path="/admin/products" />
                <UpdateProductScreen exact path="/admin/products/:id" />

                <ListToppingComponent exact path="/admin/toppings" />
                <UpdateToppingScreen exact path="/admin/toppings/:id" />

                <ListTypesComponent exact path="/admin/types" />
                <UpdateTypesScreen exact path="/admin/types/:id" />

                <BuildingListAuth exact path="/admin/building" />
                <UpdateBuildingScreen exact path="/admin/building/:id" />

                <ClassroomListAuth exact path="/admin/classroom" />
                <UpdateClassroomScreen exact path="/admin/classroom/:id" />

                <ListOrderComponent exact path="/admin/orders" />
                <UpdateOrderScreen exact path="/admin/orders/:id" />

                <ListUserComponent exact path="/admin/users" />

              </Switch>
            </AuthLayout>
          </Route>
          <Route exact
            path={[
              "/:path?",
              "/product/:id",
              "/checkorder",
              "/product/:id/category",
            ]}>
            <AppLayout>
              <Switch>
                <HomePageComponentApp exact path="/" />
                <HomePageComponentApp exact path="/product/:id/category" />
                <Cart exact path="/cart" />
                <CheckOrderComponents exact path="/checkorder" />
                <DetailProductComponentApp exact path="/product/:id" />
                <AddressUser exact path="/checkout" />                
              </Switch>
            </AppLayout>
          </Route>

          <Route exact
            path={[
              "/:path?/:path?",
            ]}>
            <AccountLayout>
              <Switch>
                <LoginAuth exact path="/login/account" />
                <Register exact path="/register/account" />
              </Switch>
            </AccountLayout>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default RouteMain;
