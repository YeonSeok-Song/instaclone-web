//이번에는 독특하게 컴포넌트 폴더를 만들어 그 안에 인덱스.js로 구현.
//npm i react-slick
import React, {useState} from 'react'
import propTypes from 'prop-types';
import Slick from 'react-slick';
import {Overlay, Global, Header, CloseBtn, SlickWrapper, ImgWrapper, Indicator, ZoomCommentContainer, ZoomWrapper} from './styles'
import { client } from '../../apollo';
import { FOLLOW_USER_MUTATION, PHOTO_FRAGMENT, READ_PHOTO, SEE_PROFILE_QUERY, UNFOLLOW_USER_MUTATION } from '../../screens/fragments';
import { PhotoHeader } from '../../Style';
import { Link, useParams } from "react-router-dom";
import Avatar from '../auth/Avatar';
import { FatText } from '../shared';
import styled from 'styled-components';
import Button from '../auth/Button';
import { useMutation } from '@apollo/client';
import useUser from '../hooks/useUser';
import ZoomComment from './ZoomComment.js'
import ZoomOption from './ZoomOption';
import ZoomInput from './ZoomInput';

const Username = styled(FatText)`
  margin-left: 10px;
`;

const ToggleFollowBtn = styled(Button).attrs({
        as: "span",
    })`
    margin-left: 15px;
    margin-top: 0px;
    cursor : pointer;
    white-space: nowrap;
    width : 35%;
    min-width : 80px;
`;

const ImagesZoom = ({photoId, onClose}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { userName } = useParams();
    const {data:userData} = useUser();
    console.log(photoId);
    
    //gql 불러오기 포토 아이디(캐시)
    const photoData = client.readFragment({
        id : `Photo:${photoId}`,
        fragment : READ_PHOTO,
    })
    
    const [unfollowUSer] = useMutation(UNFOLLOW_USER_MUTATION, {
        variables : {
            userName
        },
        refetchQueries : [{query : SEE_PROFILE_QUERY, variables : {
            userName
        }}, {query : SEE_PROFILE_QUERY, variables : {
            userName : userData?.me?.userName
        }}]
    })

    const [followUSer] = useMutation(FOLLOW_USER_MUTATION, {
        variables : {
            userName
        },
        refetchQueries : [{query : SEE_PROFILE_QUERY, variables : {
            userName
        }}, {query : SEE_PROFILE_QUERY, variables : {
            userName : userData?.me?.userName
        }}]
    })

    
    return(
        <Overlay>
            <Global />
            <CloseBtn onClick = {onClose}>X</CloseBtn>
            <ZoomWrapper>
                <SlickWrapper>
                    <Slick
                        dots = {false}
                        initialSlide = {0}
                        afterChange = {(slide) => setCurrentSlide(slide)}
                        infinite
                        slidesToShow = {1}
                        slidesToScroll = {1}
                    >
                        <ImgWrapper ><img src={photoData?.file}></img></ImgWrapper> 
                    </Slick>
                </SlickWrapper>
                <ZoomCommentContainer>
                    <PhotoHeader>
                        <Link onClick = {onClose} to = {`/users/${photoData?.user?.userName}`}>
                            <Avatar lg url={photoData?.user?.avatar} />
                        </Link>
                        <Link onClick = {onClose} to = {`/users/${photoData?.user?.userName}`}>
                            <Username>{photoData?.user?.userName}</Username>
                        </Link>
                        <ToggleFollowBtn onClick={photoData?.user?.isFollowing ? unfollowUSer : followUSer}>{photoData?.user?.isFollowing ? "Unfollow" : "Follow"}</ToggleFollowBtn>
                    </PhotoHeader>
                    <ZoomComment id={photoData?.id} time = {photoData?.createAt} comments = {photoData?.comments} user={photoData?.user} caption={photoData?.caption}/>
                    <ZoomOption likes={photoData?.likes} time = {photoData?.createAt} id={photoData?.id} isLiked={photoData?.isLiked}/>
                    <ZoomInput photoId={photoData?.id} author = {photoData?.user.userName} caption={photoData?.caption} commentNumber={photoData?.commentNumber}/>
                </ZoomCommentContainer>
            </ZoomWrapper>
        </Overlay>
    );
}
//comments복사해서 Zoom형 comments를 만들어아햠. zoomcommentcontainer를 컴포넌트로 하나 만들어야함.

ImagesZoom.propTypes = {
    photoId: propTypes.number.isRequired,
    onClose: propTypes.func.isRequired,
}


export default ImagesZoom;

/*
npm install antd*/

/*
<Indicator>
                <div>
                    {currentSlide + 1}
                    {' '}
                    /
                    {images.length}
                    </div>
                    </Indicator>
*/