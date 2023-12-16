import React from 'react';
import { Input, DatePicker, Select } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;

const SearchBar = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
      <Input placeholder="Search..." style={{ width: '40%', marginRight: '1rem' }} />
      <RangePicker style={{ width: '30%', marginRight: '1rem' }} />
      <Select placeholder="Sort by Interest" style={{ width: '30%' }}>
        <Option value="1">1 star</Option>
        <Option value="2">2 stars</Option>
        <Option value="3">3 stars</Option>
        <Option value="4">4 stars</Option>
        <Option value="5">5 stars</Option>
      </Select>
    </div>
  );
};

export default SearchBar;
