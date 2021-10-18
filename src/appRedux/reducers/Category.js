import {INIT_URL, CATEGORY_DATA,} from "../../constants/ActionTypes";

const INIT_STATE = {
  initURL: '',

};

export default (state = INIT_STATE, action) => {
  switch (action.type) {


    case INIT_URL: {
      return {...state, initURL: action.payload};
    }

    case CATEGORY_DATA: {
      return {
        ...state,
        categories: action.payload,
      };
    }


    default:
      return state;
  }
}
