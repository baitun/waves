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
          const lotTx = await startAuction(
            {
              assetId: values['select-lot'],
              duration: values['duration'],
              startPrice: values['input-number-start-price'],
              priceAssetId: 'WAVES',
              deposit: values['input-number-deposit'],
            },
            api.signAndPublishTransaction
          );

          console.info('Created asset: ' + lotTx.id + ' waiting for tx');
          notification.success({ message: 'Created asset: ' + lotTx.id });
          setTimeout(() => {
            navigate('/waves/auctions');
          }, 1000);
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
            {getFieldDecorator('select-lot', {})(
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
            <Button onClick={() => navigate('/waves/create/lot')}>
              Create Lot
            </Button>
          </Form.Item>

          <Form.Item label="Duration" help="(in blocks, 1 block ≈ 1 minute)">
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
