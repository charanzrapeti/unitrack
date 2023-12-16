import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, InputNumber, Select, Rate, Switch } from 'antd';
import CertificationsInput from './CertificationsInput';
const { RangePicker } = DatePicker;
const { Option } = Select;

const CreateForm = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const [uniAssist, setUniAssist] = useState(false);
  const [certifications, setCertifications] = useState([]);

  const handleUniAssistToggle = () => {
    setUniAssist((prevValue) => !prevValue);
  };

  return (
    <Modal
      open={visible}
      title="Create University"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();

          // Use certifications as generalRequirements
          const result = {
            ...values,
            generalRequirements: certifications,
            uniAssist,
          };

          // Log the result
          console.log(result);

          onCreate(result);
        });
      }}
      width="60%"
      style={{ padding: '0 40px' }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item name="universityName" label="University Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="courseName" label="Course Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
         
          name="semesterFees"
          label="Semester Fees in €"
          rules={[{ type: 'number', required: true }]}
          
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Application Dates" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent:'space-around', paddingLeft:"10%", paddingRight:"10%"}}>
            <Form.Item
              name="applicationStartDate"
              rules={[{ required: true, message: 'Please select start date' }]}
            >
              <DatePicker placeholder="Start Date" />
            </Form.Item>

            <Form.Item
              name="applicationEndDate"
              rules={[{ required: true, message: 'Please select end date' }]}
            >
              <DatePicker placeholder="End Date" />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item name="daadLink" label="DAAD Link" rules={[{ type: 'url', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="websiteLink" label="Website Link" rules={[{ type: 'url', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="intake" label="Intake" rules={[{ required: true }]}>
          <Select>
            <Option value="winter">Winter</Option>
            <Option value="summer">Summer</Option>
          </Select>
        </Form.Item>


        <div style={{ display: 'flex', justifyContent: 'space-around',  paddingLeft:"20%", paddingRight:"20%"}}>
          <Form.Item label="Interest" name="interest" rules={[{ required: true }]}>
            <Rate />
          </Form.Item>
          <Form.Item label="Uni-Assist" name="uniAssist" valuePropName="checked">
            <Switch checked={uniAssist} onChange={handleUniAssistToggle} />
          </Form.Item>
        </div>

        <CertificationsInput 
        certifications = {certifications}
        setCertifications={setCertifications}
        form={form} />



      </Form>
    </Modal>
  );
};

export default CreateForm;
