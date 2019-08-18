import { Button, Form, InputNumber, Select, Typography } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { navigate } from 'hookrouter';
import React from 'react';
import { createLot } from '../../utils/api';
import { withKeeper } from '../../utils/tmpSimpleKeeper';
import { Section } from '../Section/Section';

const { Option } = Select;

class CreateAuctionPL extends React.Component<FormComponentProps> {
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
        <Typography.Title>Creating an auction</Typography.Title>

        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Lot" hasFeedback>
            {getFieldDecorator('select-lot', {})(
              <Select>
                {/* put lots here ................................. */}
              </Select>
            )}
            <Button onClick={() => navigate('/waves/create/lot')}>
              Create Lot
            </Button>
          </Form.Item>

          <Form.Item label="Duration">
            {getFieldDecorator('duration', {})(<InputNumber step={1} />)}
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

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Save auction
            </Button>
          </Form.Item>
        </Form>
      </Section>
    );
  }
}

export default Form.create({ name: 'validate_other' })(CreateAuctionPL);
