import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "../Modules/app/screens/home/homepage";
import DashboardScreen from "../Modules/auth/screens/dashboard/dash";
import AppLayout from "../Layouts/app/index";
import AuthLayout from "../Layouts/auth/index";
import CategoryListAuth from "../Modules/auth/components/category";
import CreateFormScreen from "../Modules/auth/screens/category/create";
import UpdateFormScreen from "../Modules/auth/screens/category/update";

const RouteMain = () => {
    return (
        <>
            <Router>
                <Switch>
                    
                    <Route exact path={["/admin/:path?","/admin/categories/:id"]}>
                        <AuthLayout >
                            <Switch>
                                <DashboardScreen exact path="/admin"/>
                                <DashboardScreen exact path="/admin/dashboars"/>
                                <CategoryListAuth exact path="/admin/categories"/>
                                <CreateFormScreen exact path="/admin/categories/create"/>
                                <UpdateFormScreen exact path="/admin/categories/:id"/>
                            </Switch>
                        </AuthLayout>
                    </Route>
                    
                    <Route>
                        <AppLayout>
                            <Switch>
                                <HomeScreen exact path="/"/>
                                <HomeScreen exact path="/home"/>
                            </Switch>
                        </AppLayout>
                    </Route>

                </Switch>
            </Router>
        </>
    )
}

export default RouteMain
