import React from "react";
import {Route, Switch} from "react-router-dom";

import CouponDetails from "./couponDetails/index";
import Campaign from "./campaign/index";
import Coupon from "./coupon/index";


const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}campaign`} component={Campaign}/>
      <Route path={`${match.url}coupon-report`} component={CouponDetails}/>
      <Route path={`${match.url}coupon`} component={Coupon}/>

    </Switch>
  </div>
);

export default App;
