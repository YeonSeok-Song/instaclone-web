import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComments, faHeart, faHeartbeat, faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import {faHeart as  SolidHeart} from '@fortawesome/free-solid-svg-icons';
import Avatar from '../auth/Avatar';
import { FatText } from '../shared';
import { useMutation } from '@apollo/client';
import Comments from './Comments';
import { Link } from "react-router-dom";
import { DateContainer, Likes, PhotoHeader } from '../../Style';
import { TOGGLE_LIKE_MUTATION } from '../../screens/fragments';

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  margin-bottom: 60px;
  min-width : 700px;
`;

const Username = styled(FatText)`
  margin-left: 10px;
`;

const PhotoFile = styled.img`
    min-width : 100%;
    max-width: 100%;
`;

const PhotoData = styled.div`
    padding: 12px 15px;
`;

const PhotoActions = styled.div`
    display : flex;
    align-items : center;
    justify-content : space-between;
    div {
        display : flex;
        align-items : center;
    }
    svg {
        font-size: 20px;
    }
`

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor : pointer;
`;

const DateText = styled(DateContainer)`
    margin-left : 10px;
    font-size : 15px;
`

function Photo({ id, createAt, user, file, isLiked, likes, caption, commentNumber, comments}) {
    const mmdd = createAt.split("T")[0].split("-")
    const updateToggleLike = (cache, result) => {
        const {
            data : {
                toggleLike : {
                    ok
                }
            }
        } = result;
        if(ok) {
            const photoId = `Photo:${id}`;
            cache.modify({
                id: photoId,
                fields: {
                    isLiked(prev) {
                        return !prev;
                    },
                    likes(prev) {
                        if (isLiked) {
                            return prev - 1;
                        }
                        return prev + 1;
                    },
                },
            })
        }
    }

    const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id,
        },
        update : updateToggleLike,
    }); 
    return (
        <PhotoContainer>
            <PhotoHeader>
                <Link to = {`/users/${user.userName}`}>
                    <Avatar lg="true" url={user.avatar} />
                </Link>
                <Link to = {`/users/${user.userName}`}>
                    <Username>{user.userName}</Username>
                </Link>
                <DateText>{`${mmdd[1]}. ${mmdd[2]}`}</DateText>
            </PhotoHeader>
            <PhotoFile onDoubleClick={toggleLikeMutation} src={file} />
            <PhotoData>
                <PhotoActions>
                    <div>
                        <PhotoAction onClick={toggleLikeMutation}>
                            <FontAwesomeIcon
                                style={{ color: isLiked ? "tomato" : "inherit" }}
                                icon={isLiked ? SolidHeart : faHeart}
                            />
                        </PhotoAction>
                        <PhotoAction>
                            <FontAwesomeIcon icon={faComments} />      
                        </PhotoAction>
                        <PhotoAction>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </PhotoAction>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faBookmark} />
                    </div>
                </PhotoActions>
                <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
                <Comments photoId={id} author = {user.userName} caption={caption} commentNumber={commentNumber} comments={comments}/>
            </PhotoData>
        </PhotoContainer>
    )
    
}


Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        userName: PropTypes.string.isRequired,
    }),
    caption : PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    commentNumber : PropTypes.number.isRequired,
};

export default Photo;