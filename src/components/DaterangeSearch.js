import React, { Component } from 'react';
import moment from 'moment';
import { DatePicker, Button } from 'antd';

const { RangePicker } = DatePicker;

export default class DaterangeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchLoading: false,
    };
    this.range = null;
  }

  async search() {
    if (this.state.searchLoading) return;

    console.log(this.range);
  }

  updateRange(value) {
    this.range = value;
  }

  render() {
    return (
      <div className="direction-search">
        <div className="direction-search-form">
          <RangePicker
            style={{ width: '100%' }}
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={(x) => this.updateRange(x)}
            onOk={(x) => this.updateRange(x)}
          />
        </div>
        <Button
          type="primary"
          loading={this.state.searchLoading}
          onClick={() => this.search()}
        >
          Search
        </Button>
      </div>
    );
  }
}
