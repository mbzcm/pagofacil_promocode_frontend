import {combineReducers} from "redux";
import Settings from "./Settings";
import Common from "./Common";
import {connectRouter} from 'connected-react-router'
import CouponDetails from "../reducers/CouponDetails";
import Campaign from "../reducers/Campaign";
import Category from "../reducers/Category";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  common: Common,
  coupon: CouponDetails,
  campaign: Campaign,
  category: Category,
});

export default createRootReducer;
