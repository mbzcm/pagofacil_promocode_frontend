import React from "react";
import {Button, Card, Table} from "antd";
import { getCouponDetails } from '../../appRedux/actions/CouponDetails'
import {connect} from "react-redux";


class CouponDetails extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };

  constructor(props) {
    super(props);
    this.props.getCouponDetails();
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  clearFilters = () => {
    this.setState({filteredInfo: null});
  };
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };
  setNameSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'name',
      },
    });
  };

  render() {
    let {sortedInfo, filteredInfo} = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const { couponDetails } = this.props;
    const columns = [
      {
        title: 'CampaingName',
        dataIndex: 'campaignName',
        key: 'campaignName',
        sorter: (a, b) => a.campaignName.length - b.campaignName.length,
        sortOrder: sortedInfo.columnKey === 'campaignName' && sortedInfo.order,
      },
      {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        {text: 'Joe', value: 'Joe'},
        {text: 'Jim', value: 'Jim'},
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
    }, {
      title: 'CouponCode',
      dataIndex: 'couponCode',
      key: 'couponCode',
      filteredValue: filteredInfo.couponCode || null,
      sorter: (a, b) => a.couponCode.length - b.couponCode.length,
      sortOrder: sortedInfo.columnKey === 'couponCode' && sortedInfo.order,
    },
      {
        title: 'CreatedDate',
        dataIndex: 'createdDate',
        key: 'createdDate',
        filteredValue: filteredInfo.createdDate || null,
        sorter: (a, b) => a.createdDate.length - b.createdDate.length,
        sortOrder: sortedInfo.columnKey === 'createdDate' && sortedInfo.order,
      },
      {
        title: 'UpdatedDate',
        dataIndex: 'updatedDate',
        key: 'updatedDate',
        filteredValue: filteredInfo.updatedDate || null,
        sorter: (a, b) => a.updatedDate.length - b.updatedDate.length,
        sortOrder: sortedInfo.columnKey === 'updatedDate' && sortedInfo.order,
      }];
    return (
      <Card title="Reporte Cupones">

        <Table className="gx-table-responsive" columns={columns} dataSource={couponDetails} onChange={this.handleChange}/>
      </Card>
    );
  }
}




const mapStateToProps = ({coupon}) => {
 const { couponDetails } = coupon;
  return { couponDetails }
};

export default connect(mapStateToProps, {getCouponDetails})(CouponDetails);
