import Register from '../components/register/Register-form';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import css from './../components/register/Register.module.scss';
import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {isDisabled} from '@testing-library/user-event/dist/utils';

const span = () => (
  <>
    You Have <span>Account ?</span>
  </>
);
const Signup = props => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const submith = e => {
    e.preventDefault();
    setloading(true);
    const namev = name.current.value;
    const emailv = email.current.value;
    const passwordv = password.current.value;

    const session = JSON.stringify({
      name: namev,
      email: emailv,
      password: passwordv,
    });

    if (sessionStorage.getItem('tokken')) {
      console.log('found');
      setTimeout(() => {
        setloading(false);
        window.location.href = '/collections';
      }, 2000);
    }

    console.log('created');
    setTimeout(() => {
      sessionStorage.setItem('tokken', session);
      window.location.href = '/collections';
    }, 2000);
  };

  return (
    <Register
      onSubmit={submith}
      link="/signin"
      selection={span()}
      header={'Welcome Back'}
    >
      <Input
        classname={css.formGroup}
        ref={name}
        onChange={() => {
          console.log('sadfaschinage');
        }}
        label="Name"
        type="text"
        placeholder="Name"
      />
      <Input
        classname={css.formGroup}
        ref={email}
        label="Email"
        type="email"
        placeholder="Email"
      />

      <Input
        classname={css.formGroup}
        ref={password}
        label="Password"
        type="password"
        placeholder="********"
      />
      <Button
        text={loading ? 'loading' : 'SignUp'}
        onClick={() => 'hello'}
        disabled={loading ? 'true' : ''}
        classname={css.formGroup}
      />
    </Register>
  );
};

export default Signup;
