import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const GenerateSelect = ({optionsarray, defaultValue, onChange,type}) => {
    const handleSelect=(value)=>{
       onChange(value,type);
    }
  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: 120, marginBottom: 16 }}
      onChange={handleSelect}
    >
      {optionsarray.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default GenerateSelect;
