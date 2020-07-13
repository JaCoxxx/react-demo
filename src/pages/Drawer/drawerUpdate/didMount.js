import React from 'react'
import { connect } from 'dva'
import { Form, Input, Button, Icon } from 'antd'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Reopen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const { form } = this.props
    form.setFieldsValue({
      username: '123',
      email: '2313@qq.com',
    })
  }

  componentWillUnmount() {
    const { form } = this.props
    form.resetFields()
  }

  handleSubmit = e => {
    const { form } = this.props
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        this.componentDidMount()
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const emailError = isFieldTouched('email') && getFieldError('email');
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={this.handleSubmit} disabled={hasErrors(getFieldsError())}>
            visible刷新
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ global }) => ({
  ...global,
}))(Form.create({ name: 'Reopen' })(Reopen))
