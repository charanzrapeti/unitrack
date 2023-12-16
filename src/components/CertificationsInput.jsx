import React, { useRef, useState, useEffect } from 'react';
import { Input, Tag, Tooltip, Space } from 'antd';

const CertificationsInput = ({ form, certifications, setCertifications }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedCertification) => {
    const newCertifications = certifications.filter((cert) => cert !== removedCertification);
    setCertifications(newCertifications);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !certifications.includes(inputValue)) {
      setCertifications([...certifications, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newCertifications = [...certifications];
    newCertifications[editInputIndex] = editInputValue;
    setCertifications(newCertifications);
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  const certificationInputStyle = {
    width: 120,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: 'top',
  };

  const certificationPlusStyle = {
    height: 22,
    borderStyle: 'dashed',
  };

  return (
    <Space size={[0, 8]} wrap>
      {certifications.map((certification, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={certification}
              size="small"
              style={certificationInputStyle}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongCertification = certification.length > 20;
        const certificationElem = (
          <Tag
            key={certification}
            closable={index !== 0}
            style={{
              userSelect: 'none',
            }}
            onClose={() => handleClose(certification)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(certification);
                  e.preventDefault();
                }
              }}
            >
              {isLongCertification ? `${certification.slice(0, 20)}...` : certification}
            </span>
          </Tag>
        );

        return isLongCertification ? (
          <Tooltip title={certification} key={certification}>
            {certificationElem}
          </Tooltip>
        ) : (
          certificationElem
        );
      })}

      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={certificationInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={{ ...certificationPlusStyle, background: '#fafafa' }} onClick={showInput}>
          <span style={{ marginRight: 4 }}>+</span> General Requirements
        </Tag>
      )}
    </Space>
  );
};

export default CertificationsInput;
