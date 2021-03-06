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
import CheckOrderComponents from "../Modules/app/components/checkorder";
import AddressUser from "../Modules/app/screens/checkout/address";
import ListUserComponent from "../Modules/auth/components/user";
import ListVoucherComponent from "../Modules/auth/components/voucher";
import UpdateVoucherScreen from "../Modules/auth/screens/voucher/update";
import FormCommentCheckorderSuccess from "../Modules/app/screens/comment";
import ProfileComponentApp from "../Modules/app/components/profile";
import ProfileScreenAuth from "../Modules/auth/screens/profile";
import VoucherComponentApp from "../Modules/app/components/voucher";
import VoucherAccountComponentApp from "../Modules/app/components/voucher/voucherAccount";
import ResetPassword from "../Modules/account/auth/reset";
import ConfirmCodeAuth from "../Modules/account/auth/confirm";
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
              "/admin/vouchers/:id",
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

                <ListUserComponent exact path="/admin/users" />

                <ListVoucherComponent exact path="/admin/vouchers" />
                <UpdateVoucherScreen exact path="/admin/vouchers/:id" />
                
                <ProfileScreenAuth exact path="/admin/profile"/>
              </Switch>
            </AuthLayout>
          </Route>
          <Route exact
            path={[
              "/:path?",
              "/product/:id",
              "/checkorder",
              "/product/:id/category",
              "/checkorder/comment/:id",
              "/account/:path?",
            ]}>
            <AppLayout>
              <Switch>
                <HomePageComponentApp exact path="/" />
                <HomePageComponentApp exact path="/product/:id/category" />
                <Cart exact path="/cart" />
                <CheckOrderComponents exact path="/account/checkorder" />
                <FormCommentCheckorderSuccess exact path="/account/checkorder/comment/:id" />
                <DetailProductComponentApp exact path="/product/:id" />
                <AddressUser exact path="/checkout" />
                <ProfileComponentApp exact path="/account/profile" />
                <VoucherAccountComponentApp exact path="/account/voucher" />
                <VoucherComponentApp exact path="/voucher" />                
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
                <ResetPassword exact path="/forgot-password/account" />
                <ConfirmCodeAuth exact path="/confirm-password/account" />
              </Switch>
            </AccountLayout>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default RouteMain;
