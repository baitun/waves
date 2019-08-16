import {
  Button,
  Form,
  Icon,
  InputNumber,
  Select,
  Upload,
  Typography,
  Input,
} from 'antd';
import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Section } from '../Section/Section';

const { Option } = Select;

class Create extends React.Component<FormComponentProps> {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Section>
        <Typography.Title>Create new auction</Typography.Title>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Name">
            {getFieldDecorator('input-name', {})(<Input />)}
          </Form.Item>

          <Form.Item label="Currency" hasFeedback>
            {getFieldDecorator('select', {})(
              <Select placeholder="Please select a currency">
                <Option value="WAVES">WAVES</Option>
                <Option value="BTC">BTC</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label="Start price">
            {getFieldDecorator('input-number-start-price', {})(
              <InputNumber step={0.01} />
            )}
          </Form.Item>

          <Form.Item label="Deposit">
            {getFieldDecorator('input-number-deposit', {})(
              <InputNumber step={0.01} />
            )}
          </Form.Item>

          <Form.Item label="Image">
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Section>
    );
  }
}

export default Form.create({ name: 'validate_other' })(Create);
