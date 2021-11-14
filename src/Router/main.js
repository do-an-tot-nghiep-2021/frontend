import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardScreen from "../Modules/auth/screens/dashboard/dash";
import AppLayout from "../Layouts/app/index";
import AuthLayout from "../Layouts/auth/index";
import CategoryListAuth from "../Modules/auth/components/category";
import CreateFormScreen from "../Modules/auth/screens/category/create";
import UpdateFormScreen from "../Modules/auth/screens/category/update";

import ListProductComponent from "../Modules/auth/components/product/index";
import CreateProductScreen from "../Modules/auth/screens/product/create";
import UpdateProductScreen from "../Modules/auth/screens/product/update";

import ListToppingComponent from "../Modules/auth/components/topping";
import CreateToppingScreen from "../Modules/auth/screens/topping/create";
import UpdateToppingScreen from "../Modules/auth/screens/topping/update";


import ListOrderComponent from "../Modules/auth/components/order";
import CreateOrderScreen from "../Modules/auth/screens/order/create";
import UpdateOrderScreen from "../Modules/auth/screens/order/update";

import ListTypesComponent from "../Modules/auth/components/types";
import CreateTypesScreen from "../Modules/auth/screens/types/create";
import UpdateTypesScreen from "../Modules/auth/screens/types/update";
import BuildingListAuth from "../Modules/auth/components/building";
import CreateBuildingScreen from "../Modules/auth/screens/building/create";
import UpdateBuildingScreen from "../Modules/auth/screens/building/update";
import CreateClassroomScreen from "../Modules/auth/screens/classroom/create";
import UpdateClassroomScreen from "../Modules/auth/screens/classroom/update";
import ClassroomListAuth from "../Modules/auth/components/classroom";
import HomePageComponentApp from "../Modules/app/components/home";
import Cart from "../Modules/app/screens/cart";
import DetailProductComponentApp from "../Modules/app/components/detailProduct";
import LoginAuth from "../Modules/account/auth/login";
import AccountLayout from "../Layouts/account";
import SizeListAuth from "../Modules/auth/components/size";
import CreateSizeScreen from "../Modules/auth/screens/size/create";
import UpdateSizeScreen from "../Modules/auth/screens/size/update";
import Register from "../Modules/account/register";
import CheckOrderComponents from "../Modules/app/components/checkorder";
import AddressUser from "../Modules/app/screens/checkout/address";
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
              "/admin/orders/:id",
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

                <ListToppingComponent exact path="/admin/toppings" />
                <CreateToppingScreen exact path="/admin/toppings/create" />
                <UpdateToppingScreen exact path="/admin/toppings/:id" />

                <ListTypesComponent exact path="/admin/types" />
                <CreateTypesScreen exact path="/admin/types/create" />
                <UpdateTypesScreen exact path="/admin/types/:id" />

                <BuildingListAuth exact path="/admin/building" />
                <CreateBuildingScreen exact path="/admin/building/create" />
                <UpdateBuildingScreen exact path="/admin/building/:id" />

                <ClassroomListAuth exact path="/admin/classroom" />
                <CreateClassroomScreen exact path="/admin/classroom/create" />
                <UpdateClassroomScreen exact path="/admin/classroom/:id" />

                <SizeListAuth exact path="/admin/size" />
                <CreateSizeScreen exact path="/admin/size/create" />
                <UpdateSizeScreen exact path="/admin/size/:id" />

                <ListOrderComponent exact path="/admin/orders" />
                <CreateOrderScreen exact path="/admin/orders/create" />
                <UpdateOrderScreen exact path="/admin/orders/:id" />
              </Switch>
            </AuthLayout>
          </Route>
          <Route exact
            path={[
              "/:path?",
              "/product/:id",
              "/checkorder",
            ]}>
            <AppLayout>
              <Switch>
                <HomePageComponentApp exact path="/" />
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
