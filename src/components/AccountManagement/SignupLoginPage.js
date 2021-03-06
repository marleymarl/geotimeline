import React, { Component, Fragment } from 'react';
import { Col, Row, Button } from 'antd';
// import { Form, FormItem, Input } from "formik-antd";
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Link } from 'react-router';
// import 'formik-antd/es/input/style';
import 'antd/dist/antd.css';
import '../../App.css';

export default class SignupLoginPage extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  handleChange = (e) => {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Col span={12} id="SignupAside" className="SignupAside"></Col>
          <Col span={12} id="SignupForm" className="SignupForm">
            <Formik
              initialValues={{ name: '', email: '', password: '' }}
              validate={(values) => {
                let errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                }

                if (!values.password) {
                  errors.password = 'Required';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
              }}
            >
              {({ isSubmitting }) => (
                <div className="FormCenter">
                  <Form className="FormFields">
                    <div className="FormField">
                      <label className="FormField__Label" htmlFor="name">
                        Full Name
                      </label>
                      <Field
                        type="text"
                        id="name"
                        className="FormField__Input"
                        placeholder="Enter your full name"
                        name="name"
                      />
                    </div>

                    <div className="FormField">
                      <label className="FormField__Label" htmlFor="email">
                        E-Mail Address
                      </label>
                      <Field
                        type="email"
                        id="email"
                        className="FormField__Input"
                        placeholder="Enter your email"
                        name="email"
                      />
                    </div>
                    <div className="FormField">
                      <label className="FormField__Label" htmlFor="password">
                        Password
                      </label>
                      <Field
                        type="password"
                        id="password"
                        className="FormField__Input"
                        placeholder="Enter your password"
                        name="password"
                      />
                    </div>

                    <div className="FormField">
                      <button type="submit" className="FormField__Button mr-20">
                        Create Account
                      </button>
                      <Link to="/login" className="FormField__Link">
                        I have an account
                      </Link>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
