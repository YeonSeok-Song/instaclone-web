import PropTypes from "prop-types";
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import useUser from '../hooks/useUser';
import { useEffect, useState } from "react";
import ImagesZoom from "../zoom/ImagesZoom";
import { CREATE_COMMENT_MUTATION } from "../../screens/fragments";

const ZoomCommentInput = styled.input`
  &::placeholder {
    font-size: 12px;
  }
`;

const ZoomInputContainer = styled.div`
  padding: 15px;
  height : 100%;
  width: 100%;
`;

function ZoomInput({photoId, author, caption, commentNumber}) {
    const {data : userData} = useUser();
    const { register, handleSubmit, setValue, getValues} = useForm();

    const createCommentUpdate = (cache, result) => {
        const {payload} = getValues();
        setValue("payload", "");
        const {
            data : {
                createComment : {ok, id},
            }
        } = result;
        if(ok && userData?.me) {
            const newComment = {
                __typename : "Comment",
                createAt : new Date(Date.now()).toISOString(),
                id,
                isMine : true,
                payload,
                user : {
                    ...userData.me,
                },
                commentNumber
            }
            //여기 createAt를 제대로 된 시간을 갖게 만들어야함.
            const newCacheComment = cache.writeFragment({
                data : newComment,
                fragment : gql`
                    fragment BSName on Comment{
                        id
                        createAt
                        isMine
                        payload
                        user {
                            userName
                            avatar
                        }
                    }
                `
            });

            cache.modify({
                id : `Photo:${photoId}`,
                fields : {
                    comments(prev) {
                        return [...prev, newCacheComment];
                    },
                    commentNumber(prev) {
                        return prev + 1
                    }
                },
                
            })
        };
    };

    const [createCommentMutation, { loading }] = useMutation(
        CREATE_COMMENT_MUTATION,
        {
            update : createCommentUpdate,
        }
    );

    const onValid = (data) => {
        const { payload } = data;
        if (loading) {
            return;
        }
        createCommentMutation({
            variables: {
                photoId,
                payload,
            },
        }); 
        
    };

    return (
        <ZoomInputContainer>
            <form onSubmit={handleSubmit(onValid)}>
                <ZoomCommentInput
                    {...register("payload")}
                    type="text"
                    placeholder="Write a comment..."
                />
            </form>
        </ZoomInputContainer>
    );
}

export default ZoomInput;