import React from "react";
import {Alert, Card, Input} from "antd";
import { UpdateCoupon, ResetStates} from '../../appRedux/actions/CouponDetails'
import {connect} from "react-redux";


class Coupon  extends React.Component {
  state = {
    couponCode: null,
  };

  constructor(props) {
    super(props);
  }

  handleChange = (couponCode) => {
    this.setState({
      couponCode: couponCode
    });
  };

  handleUpdate = (couponCode) =>
  {
    this.props.UpdateCoupon(couponCode)
    this.props.ResetStates();
  }



  render() {
    const Search = Input.Search;
    let {couponCode} = this.state;
    const { couponResponse , couponUpdateError } = this.props;
    const error = couponUpdateError || {}
    const { detail } = error;
    return (
      <Card className="gx-card" title="CANJEA TU CUPON">

        <Search placeholder="ingresa tu código promocional" onSearch={ () => this.handleUpdate(couponCode)} onChange={(e) => this.handleChange(e.target.value)} enterButton="Canjear" size="large"/>
        { couponResponse?  <Alert message="Muchas gracias por usar nuestro servicio." type="success" />  : null }
        { detail?  <Alert message={detail} type="warning" />  : null }
      </Card>
    );
  }
}





const mapStateToProps = ({coupon}) => {
  const { couponResponse, couponUpdateError } = coupon;
  return { couponResponse, couponUpdateError }
};

export default connect(mapStateToProps, {UpdateCoupon, ResetStates})(Coupon );
