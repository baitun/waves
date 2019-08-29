import {
  Button,
  Form,
  Icon,
  Input,
  notification,
  Typography,
  Upload,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { navigate } from 'hookrouter';
import React from 'react';
import { createLot } from '../../utils/api';
import { IWavesKeeperOptions } from '../../utils/keeper';
import { withKeeper } from '../../utils/tmpSimpleKeeper';
import { Section } from '../Section/Section';

class CreateLotPL extends React.Component<FormComponentProps> {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        withKeeper(async (api: IWavesKeeperOptions) => {
          const lotTx = await createLot(
            {
              name: values['input-name'],
              imageUrl: values.upload[0].response.data.link,
            },
            api.signAndPublishTransaction
          );

          console.info('Created asset: ' + lotTx.id + ' waiting for tx');
          notification.success({ message: 'Created asset: ' + lotTx.id });
          setTimeout(() => {
            navigate('/waves/lots');
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
                action="https://api.imgur.com/3/upload"
                listType="picture"
                accept="image/*"
                headers={{
                  Authorization: 'Client-ID 1650f750334defb',
                }}
                customRequest={(option: any) => {
                  console.log(option);

                  var formData = new FormData();
                  formData.append('image', option.file);

                  let xhr = new XMLHttpRequest();

                  xhr.addEventListener('readystatechange', function() {
                    if (this.readyState === 4) {
                      let response = JSON.parse(this.response);
                      console.log(response);
                      option.onSuccess(response);
                    }
                  });

                  xhr.onprogress = option.onProgress;
                  xhr.onerror = option.onError;

                  xhr.open('POST', 'https://api.imgur.com/3/image');
                  xhr.setRequestHeader(
                    'Authorization',
                    'Client-ID 1650f750334defb'
                  );

                  xhr.send(formData);
                }}
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
