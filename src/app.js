import React from "react";
import { BrowserRouter, StaticRouter, Route } from "react-router-dom";
import Page from "./page";
import routes from "./routes";

const getRoutes = () =>
  routes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      render={props => {
        return <Page {...props} component={route.component} />;
      }}
    />
  ));

function App(props) {
  return typeof window === "undefined" ? (
    <StaticRouter location={props.location} context={props.data}>
      {getRoutes()}
    </StaticRouter>
  ) : (
    <BrowserRouter>{getRoutes()}</BrowserRouter>
  );
}

export default App;
