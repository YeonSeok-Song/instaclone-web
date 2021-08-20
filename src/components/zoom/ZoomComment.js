import React, { useState } from 'react';
import styled from 'styled-components';
import { CommentName } from '../shared';
import Avatar from '../auth/Avatar';
import { Link } from "react-router-dom";
import { CommentCaption, DateContainer } from '../../Style';
import CommentItem from './CommentItem';

const CommentBlock = styled.div`
    display : flex;
    width : 100%;
    margin : 0 0 30px 0;
`

const Container = styled.div`
    padding : 15px;
    overflow : scroll;
    ::-webkit-scrollbar { display: none; }
    height : 330px;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
`
//아이콘이랑 comment블록에 아이콘이랑 시간추가.
//나중에 댓글에 대한 답글이랑 댓글 좋아요. 만들기
const ZoomComment = (props)  => {
    console.log(props.comments)
    console.log(props.user)
    console.log(props);

    const mmdd = props.time.split("T")[0].split("-")
    

    return (
        <Container>
            <CommentBlock>
                <Link to = {`/users/${props?.user?.userName}`}>
                    <Avatar lg url={props?.user?.avatar} />
                </Link>
                <CommentCaption>
                    <CommentName>{props?.user?.userName}</CommentName>
                    {props.caption?.split(" ").map((word, index) =>
                        /#[\w\-\+\*\%\@\$\!\~\`\^\&\(\)\<\>\/\?\:\"\{\}\[\]]+/g.test(word) ? (
                            <React.Fragment key={index}>
                            <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
                            </React.Fragment>
                        ) : (
                            <React.Fragment key={index}>{word} </React.Fragment>
                        )
                    )}
                    <DateContainer>{`${mmdd[1]}. ${mmdd[2]}`}</DateContainer>
                </CommentCaption>
                
            </CommentBlock>
            
            {props?.comments?.map((comment) => (
                <CommentBlock>
                    <CommentItem 
                        key={comment.id}
                        id={comment.id}
                        author={comment.user}
                        payload={comment.payload}
                        isMine = {comment.isMine}
                        photoId = {props.photoId}
                        createAt = {comment.createAt}/>
                </CommentBlock>
            ))}
            
        </Container>
    );
}



export default ZoomComment;