import {
  Button,
  Form,
  InputNumber,
  Select,
  Typography,
  notification,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { navigate } from 'hookrouter';
import React from 'react';
import { startAuction, getLots, NFT } from '../../utils/api';
import { withKeeper } from '../../utils/tmpSimpleKeeper';
import { Section } from '../Section/Section';

const { Option } = Select;

interface State {
  lots?: Array<NFT>;
}

class CreateAuctionPL extends React.Component<FormComponentProps, State> {
  constructor(props) {
    super(props);

    this.state = { lots: [] };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        withKeeper(async (api) => {
          try {
            const lotTx = await startAuction(
              {
                assetId: values['lot'],
                duration: values['duration'],
                startPrice: values['start-price'],
                priceAssetId: 'WAVES',
                deposit: values['deposit'],
              },
              api.signAndPublishTransaction
            );

            console.info('Created asset: ' + lotTx.id + ' waiting for tx');
            notification.success({ message: 'Created asset: ' + lotTx.id });
            setTimeout(() => {
              navigate('/waves/auctions');
            }, 1000);
          } catch (error) {
            notification.error({ message: error.toString() });
          }
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

  componentDidMount() {
    const that = this;
    withKeeper((api) => {
      api.publicState().then((ps) => {
        const address = ps.account && ps.account.address;

        if (address) {
          getLots(address).then((result) => {
            that.setState({
              lots: result,
            });
          });
        }
      });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { lots } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Section>
        <Typography.Title>Creating an auction</Typography.Title>

        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Lot" hasFeedback>
            {getFieldDecorator('lot', { rules: [{ required: true }] })(
              <Select>
                {lots &&
                  Array.isArray(lots) &&
                  lots.map((lot) => (
                    <Option value={lot.id} key={lot.id}>
                      {lot.name}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          {Array.isArray(lots) && lots.length === 0 && (
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button onClick={() => navigate('/waves/create/lot')}>
                Create Lot
              </Button>
            </Form.Item>
          )}

          <Form.Item
            hasFeedback
            label="Duration"
            extra="(in blocks, 1 block ≈ 1 minute)"
          >
            {getFieldDecorator('duration', {
              rules: [{ type: 'number', required: true, min: 1 }],
            })(<InputNumber step={1} />)}
          </Form.Item>

          <Form.Item hasFeedback label="Start price">
            {getFieldDecorator('start-price', {
              rules: [{ required: true }],
            })(<InputNumber step={0.01} />)}
          </Form.Item>

          <Form.Item hasFeedback label="Deposit">
            {getFieldDecorator('deposit', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<InputNumber step={0.01} />)}
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

export default Form.create()(CreateAuctionPL);
