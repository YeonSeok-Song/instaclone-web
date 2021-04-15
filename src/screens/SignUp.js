import React from 'react';
import { Link, useHistory } from "react-router-dom";
import {
    faFacebook,
    faFacebookF,
    faFacebookSquare,
    faInstagram,} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routes from '../routes';
import AuthLayout from '../components/auth/AuthLayout';
import Button from "../components/auth/Button"
import Separator from "../components/auth/Separator"
import Input from '../components/auth/Input';
import FormBox from '../components/auth/FormBox';
import BottomBox from '../components/auth/BottomBox';
import styled from 'styled-components';
import { FatLink } from '../components/shared';
import PageTitle from '../components/PageTitle';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import {FormError2} from '../components/auth/FormError';

const HeaderContainer = styled.div`
  display : flex;
  flex-direction : column;
  align-items : center;
`


const Subtitle = styled(FatLink)`
  font-size : 14px;
  text-align : center;
  margin-top: 10px;
`

const FaceBookButton = styled(Button)`
  margin-top : 0px;

`
const CREATEACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName:String!
    $lastName:String
    $userName:String!
    $email:String!
    $password : String!
    ) {
    createAccount(
      firstName:$firstName
      lastName:$lastName
      userName:$userName
      email:$email
      password:$password
      ){
          ok
          error
      }
  }
`


function SignUp() {
  const history = useHistory();
  const{ register, handleSubmit, formState, formState : {errors}, getValues, setError, clearErrors } = useForm({
    mode: "onChange",
  })
  const onCompleted = (data) => {
    const {createAccount : {ok, error}} = data;
    const {userName, password} = getValues();
    console.log(password, userName);
    if(!ok) {
        return setError("result", {
            message : error,
        })
    }
    history.push(routes.home, {
      message : "Account created. Please log in.",
      userName,
      password
    });
  }
  const [createAccount, {loading}] = useMutation(CREATEACCOUNT_MUTATION, {
    onCompleted
  });
  const onSubmitValid = (data) => {
    if(loading){
        return;
    }
    const {firstName, lastName, userName, email, password} = data;
    createAccount({
        variables: {
            firstName,
            lastName,
            userName,
            email,
            password
        },
    });

  };
  return (
      <AuthLayout>
              <PageTitle title="SignUp" />
              <FormBox>
                  <HeaderContainer>
                      <FontAwesomeIcon icon={faInstagram} size="3x" />
                      <Subtitle>
                        Sign up to see photos and videos from your friends.
                      </Subtitle>
                  </HeaderContainer>
                  <form onSubmit={handleSubmit(onSubmitValid)}>
                      <FaceBookButton><FontAwesomeIcon icon={faFacebookSquare} />&nbsp;&nbsp;Log in with Facebook</FaceBookButton>
                      <Separator />

                      <Input {...register("firstName", {
                        required : "Firstname is required.",
                        minLength : {
                          value : 3,
                          message : "Firstname should be longer than 3 chars."
                        }
                      })}
                      name="firstName" type="text" placeholder="First Name" />

                      <FormError2 message={errors?.firstName?.message}></FormError2>

                      <Input {...register("lastName", {
                        required : false,
                      })}
                      name="lastName" type="text" placeholder="Last Name" />

                      <FormError2 message={errors?.lastName?.message}></FormError2>

                      <Input {...register("email", {
                        required : "email is required.",
                        pattern: {
                          value : /^[\w]+@[\w.]+/,
                          message : "Please enter your e-mail."
                        }
                      })}
                      name="email" type="text" placeholder="Email" />

                      <FormError2 message={errors?.email?.message}></FormError2>

                      <Input {...register("userName", {
                        required : "username is required.",
                        minLength : {
                          value : 5,
                          message : "username should be longer than 5 chars."
                        }
                      })}
                      name="userName" type="text" placeholder="Username" />

                      <FormError2 message={errors?.userName?.message}></FormError2>

                      <Input {...register("password", {
                        required : "password is required.",
                        minLength : {
                          value : 10,
                          message : "password should be longer than 10 chars."
                        }
                      })}
                      name="password" type="password" placeholder="Password" />

                      <FormError2 message={errors?.password?.message}></FormError2>

                      <Button type="submit" disabled={!formState.isValid || loading} >{loading ? "Loading..." : "Sign up"}</Button>
                      <FormError2 message={errors?.result?.message}></FormError2>
                  </form>
                  
              </FormBox>
              <BottomBox cta="Have an account?" linkText="Log In" link={routes.home} />
      </AuthLayout>
  );
}

export default SignUp;