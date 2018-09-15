import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Icon } from 'antd';

const FormItem = Form.Item;

@inject('authStore')
@withRouter
@observer
class LoginWithPassword extends React.Component {
  constructor(props) {
    super(props);

    this.authStore = this.props.authStore;
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, history } = this.props;

    form.validateFields((err, values) => {
      if (!err && !this.authStore.inProgress) {
        this.authStore
          .login(values)
          .then(res => {
            if (res && res.status === 'LOGIN_FAILURE') {
              form.setFields({
                password: {
                  errors: [new Error('Wrong login or password')],
                },
              });
            } else {
              history.replace('/');
            }
          })
          .catch(error => {
            if (error.status === 401) {
              form.setFields({
                phone: {
                  errors: [new Error('')],
                },
              });
              form.setFields({
                password: {
                  errors: [new Error('')],
                },
              });
            }
          });
      }
    });
  };

  render() {
    const { values } = this.props.authStore;
    const { getFieldDecorator, isFieldsTouched } = this.props.form;
    const formIsTouched = isFieldsTouched();

    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Sign in</h1>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Incorrect email' }],
            initialValue: values.phone,
          })(
            <Input
              autoComplete="email"
              type="email"
              placeholder="Email"
              prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} type="mail" theme="outlined" />}
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Incorrect password' }],
            initialValue: values.password,
          })(
            <Input
              autoComplete="current-password"
              type="password"
              placeholder="Password"
              prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} type="lock" theme="outlined" />}
            />,
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="ui-form__submit"
            disabled={!formIsTouched}>
            Sign in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginWithPassword);
