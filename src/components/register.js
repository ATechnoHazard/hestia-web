import React, {useEffect} from 'react'
import { Form, Input, Button } from 'antd';
import logo from '../assets/group_5.png';
import {Link} from 'react-router-dom';
import google from '../assets/group.png';
import { useAlert } from 'react-alert';
import { ReCaptcha } from 'react-recaptcha-v3';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!'
  },
};

const Register = (props) => {
  var ct = null;
  const verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!  
    ct = recaptchaToken;
    console.log(recaptchaToken, "<= your recaptcha token")
  }
  const alert = useAlert()
  let authcheck = false;
  const onFinish = values => {
    fetch("https://hestia-auth.herokuapp.com/api/user/register", {
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify(values.user), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
          'Content-Type': 'application/json',
          'g-recaptcha-response': ct
        }),
      })
      .then(response => {
        if(response.status === 200 || response.status===201 || response.status===202){
          authcheck = true;
        return response.json();
        }else{
          alert.show(response.statusText)
        }
        })
      .then(data => {
        console.log(data)
        if(authcheck){
          // console.log("check your email for conformation!")
          alert.show(data.Verify)
        }
          // window.localStorage.setItem("token", data);
          // props.history.push("/feed");
        })
       .catch(error => console.error(error)
       );
    };
    useEffect(() => {
        if(localStorage.getItem("token")){
            props.history.push("/feed")
        }
      });


    
  return (
      <div className="eqimargin">
      <ReCaptcha
            sitekey="6LdiB-UUAAAAACYC2AlMS9hrw18fQA4FK7-s0LDw"
            action='/register'
            verifyCallback={verifyCallback}
        />
      <div className="hestia-logo-reg">
          <img src={logo} alt="Hestialogo"></img>
      </div>
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} className="login-form">
      <Form.Item
        name={['user', 'name']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input 
        placeholder="Name"
        />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Please input a valid email!'
          },
        ]}
      >
        <Input 
        placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name={['user', 'password']}
        placeholder="Password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
          {
            min: 8,
            message: "Password has to be atleast 8 characters!"
          }
        ]}
      >
        <Input
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name={['user', 'phone']}
        rules={[
          {
            required: true,
            message: 'Please input your Number!',
          },
          {
            min: 10,
            max: 10,
            message: "Phone number has to be 10 digits!"
          }
        ]}
      >
        <Input
        placeholder="Number"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        {/* <Button type="dashed" className="oauth">
                Register with <img src={google} alt="login with google"></img>
        </Button> */}
      </Form.Item>
      <Form.Item className="already">
        <Link to="/Login">Already have an account? Login</Link>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Register