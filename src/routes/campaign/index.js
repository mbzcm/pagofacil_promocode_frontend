import React, {Component } from "react";
import FlipMove from 'react-flip-move';
import CampaignItem from "../../components/eCommerce/CampaignItem";
import { Button,  Col, Row} from "antd";
import Auxiliary from "../../util/Auxiliary";
import {connect} from "react-redux";
import {getCampaigns, AddCoupon, ResetStates, filterCampaign, getCategories} from "../../appRedux/actions";
import RegisterCoupon from '../../components/RegisterCoupon/index'


class Campaign extends Component {

  state = {
    loading: false,
    visible: false,
    currentCampaignIdExternal: '',
    name: '',
    email: ''
  };
  showModal = (campaignIdExternal) => {
    this.setState({
      visible: true,
      currentCampaignIdExternal: campaignIdExternal
    });

    this.props.ResetStates();
  };
  handleOk = () => {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({loading: false, visible: false});
    }, 3000);
  };
  handleCancel = () => {
    this.setState({visible: false});
  };

  handleSubmit = (e) => {
    this.props.AddCoupon(e.campaignIdExternal, e.name, e.email);
  };

  constructor(props) {
    super(props);
    this.props.getCampaigns();
    this.props.getCategories();
    this.filterCampaign = this.filterCampaign.bind(this);
    this.getAllCampaigns = this.getAllCampaigns.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  filterCampaign(camapignName) {
    this.props.filterCampaign(camapignName);
  }

  getAllCampaigns() {
    this.props.getCampaigns();
  }




  render() {

    const { campaignsFilter, couponData, couponError,categories,categoryCampaign } = this.props;
    const {visible, loading } = this.state;
    const campaignsData = campaignsFilter || [];
    let categoriesData = categories || [];
    const categoryCampaignData = categoryCampaign || [];
    categoriesData = categoriesData.filter( x => categoryCampaignData.includes(x.categoryIdExternal));
    const coupon = couponData || {}
    const error = couponError || {}
    const { detail } = error;
    const showPromoCode = coupon.couponCode === undefined ? false : true;
    return (
      <Auxiliary>
        <div>
          {
            categoriesData.map((category, index) => ( <Button key={index} onClick={() => this.filterCampaign(category.categoryIdExternal)}>{category.categoryName}</Button>))
          }

          <Button onClick={this.getAllCampaigns}>Todas </Button>
        </div>
        <FlipMove
          staggerDurationBy="30"
          duration={500}>
          <Row>
            { campaignsData.map((campaign, index) => (
              <Col key={index} xl={6} md={8} sm={12} xs={24}>
                <CampaignItem key={index} grid product={campaign} onClick={() =>this.showModal(campaign.campaignIdExternal)}/>
              </Col>
            ))}
          </Row>
        </FlipMove>
        <RegisterCoupon visible={visible}
                        loading ={loading}
                        showPromoCode ={showPromoCode}
                        coupon={coupon}
                        campaignIdExternal = {this.state.currentCampaignIdExternal}
                        detail={detail}
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}
                        handleSubmit={this.handleSubmit}></RegisterCoupon>

      </Auxiliary>
    );
  }
}


const mapStateToProps = ({campaign, coupon, category}) => {
  const { campaignsFilter,categoryCampaign } = campaign;
  const { couponData, couponError } = coupon;
  const { categories } = category;
  return { campaignsFilter, couponData,couponError,categories,categoryCampaign }
};

export default connect(mapStateToProps, {getCampaigns, AddCoupon, ResetStates, filterCampaign, getCategories})(Campaign);



