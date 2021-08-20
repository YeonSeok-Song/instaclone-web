import React from 'react';
import { gql, useMutation } from "@apollo/client";
import {faHeart as  SolidHeart, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommentName } from '../shared';
import { Link } from "react-router-dom";
import Avatar from '../auth/Avatar';
import { CommentCaption, DateContainer } from '../../Style';
import styled from 'styled-components';

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($id : Int!) {
        deleteComment(id : $id) {
            ok
        }
    }
`

const Option = styled.div`
    display : flex;
`

const DateText = styled(DateContainer)`
    margin-right : 10px;
`

function CommentItem(props) {

    const updateDeleteComment = (cache, result) => {
        const {
            data : {
                deleteComment : {ok},
            }
        } = result;
        if(ok) {
            cache.evict({
                id : `Comment:${props.id}`, //커맨트 아이디
            });
            cache.modify({
                id : `Photo:${props.photoId}`,//커맨트의 부모인 포토의 아이디
                fields: {
                    comments(existingCommentRefs, {readField}) {
                        existingCommentRefs.filter(
                            commentRef => `Comment:${props.id}` !== readField('__ref', commentRef)
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
            id : props.id,
        },
        update : updateDeleteComment,
    })

    const onDeleteClick = () => {
        deleteCommentMutation();
    }
    return (
        <>
            <Link to = {`/users/${props?.author?.userName}`}>
                <Avatar lg url={props?.author?.avatar} />
            </Link>
            <CommentCaption>
                <CommentName>{props?.author?.userName}</CommentName>
                {props?.payload?.split(" ").map((word, index) =>
                    /#[\w\-\+\*\%\@\$\!\~\`\^\&\(\)\<\>\/\?\:\"\{\}\[\]]+/g.test(word) ? (
                        <React.Fragment key={index}>
                        <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={index}>{word} </React.Fragment>
                    )
                )}
                <Option>
                    <DateText>{`${props?.createAt.split("T")[0].split("-")[1]}. ${props?.createAt.split("T")[0].split("-")[2]}`}</DateText>
                    {props?.isMine ? <FontAwesomeIcon onClick={onDeleteClick} icon={faTrashAlt} style={{color : "tomato", cursor : "pointer"}} /> : null}
                </Option>
            </CommentCaption>
        </>
    );
}

export default CommentItem;