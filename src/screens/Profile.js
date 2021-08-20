import React from 'react';
import { useParams } from 'react-router';
import { gql, useMutation, useQuery} from '@apollo/client';
import { FOLLOW_USER_MUTATION, PHOTO_FRAGMENT, SEE_PROFILE_QUERY, UNFOLLOW_USER_MUTATION } from './fragments';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/shared";
import {faHeart, faComment} from '@fortawesome/free-solid-svg-icons';
import useUser from '../components/hooks/useUser';
import Avatar from '../components/auth/Avatar';
import { logUserOut } from '../apollo';

const Header = styled.div`
  display: flex;
  align-items : center;
  justify-content : center;
`;
const Column = styled.div`
`;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;
const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;
const Photo = styled.div`
    position: relative;
  background-image: url(${(props) => props.bg});
  background-size: cover;
`;
const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;
const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileBtn = styled(Button).attrs({
        as: "span",
    })`
    margin-left: 10px;
    margin-top: 0px;
    cursor : pointer;
    white-space: nowrap;
`;

function Profile() {
    const { userName } = useParams();
    const {data:userData} = useUser();
    const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
          userName,
        },
    });
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
    //여기 캐시를 그냥 포토라 하면 안되고 myphoto라고 해서 캐시로 저장시켜야 될듯.
    const getButton = (seeProfile) => { //toggle follow로 변경(완료)
        const { isMe, isFollowing } = seeProfile;
        if (isMe) {
            return <ProfileBtn>Edit Profile</ProfileBtn>
        }
        else {
            return <ProfileBtn onClick={isFollowing ? unfollowUSer : followUSer}>{isFollowing ? "Unfollow" : "Follow"}</ProfileBtn>;
        }
    };
    return (
        <div>
            <PageTitle
                title={
                    loading ? "Loading..." : `${data?.seeProfile?.userName}'s Profile`
                }
            />
            <Header>
                <Avatar url={data?.seeProfile?.avatar} size={true} />
                <Column>
                    <Row>
                        <Username>{data?.seeProfile?.userName}</Username>
                        {data?.seeProfile ? getButton(data.seeProfile) : null}
                        {data?.seeProfile?.isMe ? <ProfileBtn onClick={logUserOut}>Logout</ProfileBtn> : ""}
                    </Row>
                    <Row>
                        <List>
                        <Item>
                            <span>
                            <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                            </span>
                        </Item>
                        <Item>
                            <span>
                            <Value>{data?.seeProfile?.totalFollowing}</Value> following
                            </span>
                        </Item>
                        </List>
                    </Row>
                    <Row>
                        <Name>
                        {data?.seeProfile?.firstName}
                        {"  "}
                        {data?.seeProfile?.lastName}
                        </Name>
                    </Row>
                    <Row>{data?.seeProfile?.bio}</Row>
                </Column>
            </Header>
            <Grid>
                {data?.seeProfile?.photos.map((photo) => (
                    <Photo key={photo.id} bg={photo.file}>
                        <Icons>
                        <Icon>
                            <FontAwesomeIcon icon={faHeart} />
                            {photo.likes}
                        </Icon>
                        <Icon>
                            <FontAwesomeIcon icon={faComment} />
                            {photo.commentNumber}
                        </Icon>
                        </Icons>
                    </Photo>
                    ))
                }
            </Grid>
        </div>
    );
}

export default Profile;