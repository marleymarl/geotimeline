import React, { Component } from 'react';
import axios from 'axios';
import { Button, Table, Input } from 'antd';
import * as moment from 'moment';
import * as global from '../global';
import 'antd/dist/antd.css';
import { CSVLink } from 'react-csv';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export default class DataView extends Component {
  state = {
    data: null,
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => { this.searchInput = node; }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >Search</Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >Reset</Button>
        </div>
      ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),
  });

  getCoordSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => { this.searchMax = node; }}
            placeholder={`Max ${dataIndex}`}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.searchMin.select()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Input
            ref={(node) => { this.searchMin = node; }}
            placeholder={`Min ${dataIndex}`}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >Search</Button>
          <Button
            onClick={() => {
              this.searchMin.state.value = null;
              this.searchMax.state.value = null;
              clearFilters();
            }}
            size="small"
            style={{ width: 90 }}
          >Reset</Button>
        </div>
      ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      if (this.searchMin.state.value && this.searchMax.state.value) {
        return (record[dataIndex] > this.searchMin.state.value && record[dataIndex] < this.searchMax.state.value)
      } else {
        return true;
      }
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchMax.select());
      }
    },
    render: (text) => text
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  componentDidMount() {
    this.getFootprintsData();
  }

  getFootprintsData = () => {
    axios({
      method: 'get',
      url: global.API_URL + '/getrealfootprints',
      headers: global.JSON_TYPE,
    }).then((data) => {
      const dataSource = data.data.map(this.footprintToDataItem);
      return this.setState({
        data: dataSource,
        filteredData: dataSource,
      });
    });
  };

  footprintToDataItem(footprint, idx) {
    return {
      key: idx,
      case_id: footprint.case_id,
      date: moment(footprint.date).format('ddd, ll'),
      time: footprint.time,
      latitude: footprint.latitude,
      longitude: footprint.longitude,
    };
  }

  onChangeTable({ currentDataSource }) {
    this.setState(
      Object.assign({}, this.state, {
        filteredData: currentDataSource,
      }),
    );
  }

  loading() {
    return <div>...Loading</div>;
  }

  render() {
    if (!this.state.data) {
      return this.loading();
    }
    const dataSource = this.state.data;
    const columns = [
      {
        title: 'case_id',
        dataIndex: 'case_id',
        sorter: (a, b) => a.case_id - b.case_id,
        ...this.getColumnSearchProps('case_id')
      },
      {
        title: 'date',
        dataIndex: 'date',
        filters: [
          {
            text: 'Last 15 days',
            value: '15',
          },
          {
            text: 'Last 5 days',
            value: '5',
          },
        ],
        onFilter: (value, record) =>
          moment(record.date) > moment().subtract(value, 'days'),
        sorter: (a, b) => a.date - b.date,
      },
      {
        title: 'time',
        dataIndex: 'time',
        sorter: (a, b) => a.time - b.time,
      },
      {
        title: 'latitude',
        dataIndex: 'latitude',
        sorter: (a, b) => a.latitude - b.latitude,
        ...this.getCoordSearchProps('latitude')
      },
      {
        title: 'longitude',
        dataIndex: 'longitude',
        sorter: (a, b) => a.longitude - b.longitude,
        ...this.getCoordSearchProps('longitude')
      },
    ];

    return (
      <div>
        <div className="dataview-heeader">
          <CSVLink
            data={this.state.filteredData}
            className="dataview-csv-button"
            filename="footprints.csv"
          >
            <Button type="primary">Save to CSV</Button>
          </CSVLink>
        </div>
        <Table
          dataSource={dataSource}
          onChange={(_, __, ___, ex) => this.onChangeTable(ex)}
          columns={columns}
          pagination={true}
          className="table-column"
          size="large"
        />
      </div>
    );
  }
}
