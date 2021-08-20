import PropTypes from "prop-types";
import styled from 'styled-components';
import Comment from './Comment';
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import useUser from '../hooks/useUser';
import { useEffect, useState } from "react";
import ImagesZoom from "../zoom/ImagesZoom";
import { CREATE_COMMENT_MUTATION } from "../../screens/fragments";

const CommentsContainer = styled.div`
    margin-top: 20px;
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;
/*
const CommentCount = styled.span`
    opacity: 0.7;
    margin: 10px 0px;
    display: block;
    font-weight: 600;
    font-size: 10px;
`*/

const MoreComment = styled.div`
    font-weight: 100;
    margin: 10px 0px;
    display: block;
    cursor: pointer;
    font-size: 15px;
    opacity : 0.7
`

function Comments({photoId, author, caption, commentNumber, comments, }) {
    const {data : userData} = useUser();
    const { register, handleSubmit, setValue, getValues} = useForm();
    const [seeAllComment] = useState(
        commentNumber <= 2 ? "none" : ""
    );
    const [showImageZoom, setShowImageZoom] = useState(false);

    const onZoom = () => {
        document.body.style.overflow = "hidden";
        setShowImageZoom(true);
    }
    const onClose = () => {
        document.body.style.overflow = "";
        setShowImageZoom(false);
    };

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
        <CommentsContainer>
            {showImageZoom && <ImagesZoom photoId = {photoId} onClose = {onClose} />}
            <Comment author={author} payload={caption} />
            <MoreComment display={seeAllComment} onClick={onZoom}>
                {commentNumber <= 2 ? "" : `${commentNumber} comments View all comments`}
            </MoreComment>
            {comments?.map((comment, index) => {
                if(index < 2) {
                    return(
                        <Comment
                            key={comment.id}
                            id={comment.id}
                            author={comment.user.userName}
                            payload={comment.payload}
                            isMine = {comment.isMine}
                            photoId = {photoId}
                        />
                    )
                }
            })}
            <PostCommentContainer>
                <form onSubmit={handleSubmit(onValid)}>
                    <PostCommentInput
                        {...register("payload")}
                        type="text"
                        placeholder="Write a comment..."
                    />
                </form>
            </PostCommentContainer>
        </CommentsContainer>
    );
}

Comments.propTypes = {
    photoId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    caption: PropTypes.string,
    commentNumber: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
          avatar: PropTypes.string,
          userName: PropTypes.string.isRequired,
        }),
        payload: PropTypes.string.isRequired,
        isMine: PropTypes.bool.isRequired,
        createAt: PropTypes.string.isRequired,
      })
    ),
  };

export default Comments;

/*
            <CommentCount>
                {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
            </CommentCount>
            */