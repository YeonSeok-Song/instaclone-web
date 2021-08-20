import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import { FatText } from '../shared';
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import {faHeart as  SolidHeart, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faComments, faHeart, faHeartbeat, faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommentCaption, CommentContainer } from '../../Style';

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($id : Int!) {
        deleteComment(id : $id) {
            ok
        }
    }
`

//@테그는 유저 프로파일로 링크 걸기.
function Comment({id, author, payload, isMine, photoId}) {
    const updateDeleteComment = (cache, result) => {
        const {
            data : {
                deleteComment : {ok},
            }
        } = result;
        if(ok) {
            cache.evict({
                id : `Comment:${id}`, //커맨트 아이디
            });
            cache.modify({
                id : `Photo:${photoId}`,//커맨트의 부모인 포토의 아이디
                fields: {
                    comments(existingCommentRefs, {readField}) {
                        existingCommentRefs.filter(
                            commentRef => `Comment:${id}` !== readField('__ref', commentRef)
                        );
                    },
                    commentsNumber(prev) {
                        prev = prev - 1;
                    }
                }
            })
        }
    }
    const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
        variables : {
            id,
        },
        update : updateDeleteComment,
    })
    const onDeleteClick = () => {
        deleteCommentMutation();
    }
    return (
        <CommentContainer >
            <Link to={`/users/${author}`} >
                <FatText>{author}</FatText>
            </Link>
            <CommentCaption>
                {payload.split(" ").map((word, index) =>
                    /#[\w\-\+\*\%\@\$\!\~\`\^\&\(\)\<\>\/\?\:\"\{\}\[\]]+/g.test(word) ? (
                        <React.Fragment key={index}>
                        <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={index}>{word} </React.Fragment>
                    )
                )}
            </CommentCaption>
            {isMine ? <FontAwesomeIcon onClick={onDeleteClick} icon={faTrashAlt} style={{color : "tomato", cursor : "pointer"}} /> : null}
        </CommentContainer>  
    );
}

Comment.propTypes = {
    id : PropTypes.number,
    author: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired,
    isMine: PropTypes.bool,
    photoId : PropTypes.number,
};

export default Comment;