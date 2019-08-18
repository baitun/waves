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

import { createLot, awaitTx } from '../../utils/api';
import { withKeeper } from '../../utils/tmpSimpleKeeper';

const { Option } = Select;

class CreateLotPL extends React.Component<FormComponentProps> {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        withKeeper(async (api) => {
          const lotTx = await createLot(
            {
              name: values['input-name'],
              imageUrl:
                'https://images-na.ssl-images-amazon.com/images/I/813XSSh%2BUTL._SY679_.jpg',
            },
            api.signAndPublishTransaction
          );

          console.info('Created asset: ' + lotTx.id + ' waiting for tx');
        });
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
        <Typography.Title>Creating a Lot</Typography.Title>

        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Lot name">
            {getFieldDecorator('input-name', {})(<Input />)}
          </Form.Item>

          <Form.Item label="Image for lot">
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload
                name="image"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                accept="image/*"
              >
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Save Lot
            </Button>
          </Form.Item>
        </Form>
      </Section>
    );
  }
}

export default Form.create({ name: 'validate_other' })(CreateLotPL);
