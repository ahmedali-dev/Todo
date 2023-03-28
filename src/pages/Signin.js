import {useRef} from "react";
import Register from "../components/register/Register-form";
import css from './../components/register/Register.module.scss';
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";


const span = () => <>Create New <span>Account !</span></>
const Signin = props => {

    const email = useRef();
    const password = useRef();
    const submith = (e)=> {
        e.preventDefault();
        console.log('header signin',email.current.value)
    }
  return (
      
      <Register
            onSubmit={submith}
          link='/signup' selection={span()} header={'Welcome Back'}>

          
          <Input
              classname={css.formGroup}
              ref={email}
      onChange={()=>{
                  console.log('sadfaschinage');
              }} label="Email" 
          type="email" placeholder="Email" />


          <Input
              classname={css.formGroup}
            ref={password}
            label="Password" type="password"
            placeholder="********" />
          <Button text={'Signin'} classname={css.formGroup} />



          
      </Register>

  );
};

export default Signin;
