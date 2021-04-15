import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import {
    faFacebook,
    faFacebookF,
    faFacebookSquare,
    faInstagram,
  } from "@fortawesome/free-brands-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routes from '../routes';
import AuthLayout from '../components/auth/AuthLayout';
import Button from "../components/auth/Button"
import Separator from "../components/auth/Separator"
import Input from '../components/auth/Input';
import FormBox from '../components/auth/FormBox';
import BottomBox from '../components/auth/BottomBox';
import styled from "styled-components";
import PageTitle from '../components/PageTitle';
import { useForm } from "react-hook-form";
import {FormError} from '../components/auth/FormError';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { logUserIn } from "../apollo";
import Notification from '../components/auth/Notification';

export const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

export const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username:String!, $password : String!) {
      login(userName:$username, password:$password){
          ok
          error
          token
      }
  }
`

function Login() {
    const location = useLocation();

    const { register, handleSubmit, formState, formState : {errors}, getValues, setError, clearErrors } = useForm({
        mode: "onChange",
        defaultValues : {
            username : location?.state?.userName || "",
            password : location?.state?.password || "",
        }
    });

    const onCompleted = (data) => {
        const {login : {ok, error, token}} = data;
        if(!ok) {
            return setError("result", {
                message : error,
            })
        }
        if (token) {
            logUserIn(token);
        }
    }
    const [login, {loading}] = useMutation(LOGIN_MUTATION, {
        onCompleted,
    });
    const onSubmitValid = (data) => {
        if(loading){
            return;
        }
        const {username, password} = getValues();
        login({
            variables: {
                username,
                password
            },
        });

    };
    
    const clearLoginError = (e) => {
        if(errors?.result?.message) {
            formState.isValid = true;
            clearErrors("result");
        }
        e.preventDefault();
    };
    return (
        <AuthLayout>
            <PageTitle title="Login" />
                <FormBox>
                    <div>
                        <FontAwesomeIcon icon={faInstagram} size="3x" />
                    </div>
                    <Notification message={location?.state?.message}></Notification>
                    <form onSubmit={handleSubmit(onSubmitValid)}>
                        <Input {
                            ...register("username", 
                                {
                                    required : "Username is required", 
                                    minLength : {
                                        value : 5, 
                                        message: "Username should be longer than 5 chars."
                                    }
                                }
                            )
                        }//onChange는 mode랑 겹쳐서 인지 동작을 안함.,..
                        onFocus={clearLoginError} name="username" type="text" placeholder="Username" hasError={Boolean(errors?.username?.message)}/>
                        <Input {
                            ...register("password", 
                                {
                                    required : "Password is required.",
                                }
                            )
                        }
                        onFocus={clearLoginError} name="password" type="password" placeholder="Password" hasError={Boolean(errors?.password?.message)}/>
                        <Button type="submit" disabled={!formState.isValid || loading} >{loading ? "Loading..." : "Log in"}</Button>
                    </form>
                    <Separator />
                    <FacebookLogin>
                        <FontAwesomeIcon icon={faFacebookSquare} />
                        <span>Log in with Facebook</span>
                    </FacebookLogin>
                    <FormError message={errors?.username?.message || errors?.password?.message || errors?.result?.message}></FormError>
                    <Link href="#">Did you forget password?</Link>
                </FormBox>
                <BottomBox cta="Don't have an account?" linkText="Sign Up" link={routes.signUp} />
        </AuthLayout>
    );
}

export default Login;