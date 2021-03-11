import { BrowserRouter, Switch, Route } from "react-router-dom";
import LogOutRoute from "./components/LogOutRoute";
import PrivateRoute from "./components/PrivateRoute";
import LayoutApp from "./components/LayoutApp";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Service from "./pages/Service";
import Profile from "./pages/Profile";
import FinalForm from "./pages/FinalForm";
import Home from "./pages/Home";
import updateService from "./pages/updateService";
import AddressesForm from "./pages/Addresses";
import ItemsForm from "./pages/Items";
import ExtraServicesForm from "./pages/ExtraServices";

function Router() {
  return (
    <BrowserRouter>
      <LayoutApp>
        <Switch>
          <Route component={Home} path="/" exact />
          <LogOutRoute component={SignUp} path="/signup" />
          <LogOutRoute component={Login} path="/login" />
          <PrivateRoute component={Profile} path="/profile" />
          <PrivateRoute component={Service} path="/service" />
          <PrivateRoute component={updateService} path="/myservices" />
          <PrivateRoute component={AddressesForm} exact path="/addresses" />
          <PrivateRoute component={ItemsForm} exact path="/items" />
          <PrivateRoute
            component={ExtraServicesForm}
            exact
            path="/extraservices"
          />
          <PrivateRoute component={AddressesForm} exact path="/addresses/:id" />
          <PrivateRoute component={ItemsForm} exact path="/items/:id" />
          <PrivateRoute
            component={ExtraServicesForm}
            exact
            path="/extraservices/:id"
          />
          <PrivateRoute component={FinalForm} path="/finish" />
        </Switch>
      </LayoutApp>
    </BrowserRouter>
  );
}

export default Router;
