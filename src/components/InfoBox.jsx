import React, {useState} from 'react';
import { Card, List, Tag, Space, Menu, Dropdown, Modal } from 'antd';
import { DollarOutlined, CheckCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'; // Import Ant Design icons
import dayjs from 'dayjs'; // Import the dayjs library for date formatting

const InfoBox = ({ universityDetailsList, onUpdate, onDelete }) => {
  console.log(universityDetailsList)
  const [selectedItem, setSelectedItem] = useState(null);
  const handleMenuClick = ({ key }) => {
    if (key === 'edit') {
      // Open edit form with selected item details
      onUpdate(selectedItem);
    } else if (key === 'delete') {
      // Show delete confirmation modal
      Modal.confirm({
        title: 'Are you sure to delete?',
        onOk: () => {
          onDelete(selectedItem);
        },
        onCancel: () => {
          setSelectedItem(null);
        },
      });
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );
 
  return (
    <List
      dataSource={universityDetailsList}
      renderItem={(item) => (
        <Card
          title={<span style={{ fontSize: '25px' }}>{item.universityDetails.universityName}</span>}
          style={{ marginBottom: '1rem' }}
          extra={
            <Space>
              <EditOutlined
                style={{ fontSize: '20px', color: '#1890ff', cursor: 'pointer' }}
                onClick={() => onUpdate(item)}
              />
              <DeleteOutlined
                style={{ fontSize: '20px', color: '#ff4d4f', cursor: 'pointer' }}
                onClick={() => {
                  Modal.confirm({
                    title: 'Are you sure to delete?',
                    onOk: () => {
                      onDelete(item);
                      setSelectedItem(null);
                    },
                    onCancel: () => {
                      setSelectedItem(null);
                    },
                  });
                }}
              />
            </Space>
          }
        >
          <p style={{ marginBottom: '.5rem', fontSize: '20px' }}>{item.universityDetails.courseName}</p>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space justify="between" style={{ width: '100%' }}>
              <p>
                {dayjs(item.universityDetails.applicationStartDate).format('YYYY/MM/DD')} - {' '}
                {dayjs(item.universityDetails.applicationEndDate).format('YYYY/MM/DD')}
              </p>
              <p>
                {Array.from({ length: item.universityDetails.interest }, (_, index) => (
                  <span key={index} style={{ color: '#faad14', fontSize: '20px' }}>
                    ★
                  </span>
                ))}
              </p>
            </Space>
            <p>
              DAAD Link - <a href={item.universityDetails.daadLink}>{item.universityDetails.daadLink}</a>
            </p>
            <p>
              Website Link - <a href={item.universityDetails.websiteLink}>{item.universityDetails.websiteLink}</a>
            </p>
            <p>General Requirements:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {item.universityDetails.generalRequirements.map((requirement, index) => (
                <Tag key={index} style={{ margin: '4px', borderRadius: '8px', background: '#e6f7ff' }}>
                  {requirement}
                </Tag>
              ))}
            </div>
          </Space>
          <Space justify="between" style={{ width: '100%' }}>
            <p>
              {item.universityDetails.uniAssist && (
                <span>
                  <CheckCircleOutlined style={{ color: '#52c41a' }} /> Uni Assist
                </span>
              )}
            </p>
            <p>
              <DollarOutlined style={{ fontSize: '18px', color: '#1890ff' }} /> {item.universityDetails.semesterFees}
            </p>
          </Space>
        </Card>
      )}
    />
  );
};

export default InfoBox;
