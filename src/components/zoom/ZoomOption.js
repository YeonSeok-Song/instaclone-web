import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComments, faHeart, faHeartbeat, faPaperPlane} from '@fortawesome/free-regular-svg-icons';
import {faHeart as  SolidHeart} from '@fortawesome/free-solid-svg-icons';
import { TOGGLE_LIKE_MUTATION } from '../../screens/fragments';
import { useMutation } from '@apollo/client';
import { DateContainer, Likes } from '../../Style';

const ZoomActions = styled.div`
    width : 100%;
    display : flex;
    justify-content : space-between;
    div {
        display : flex;
    }
    svg {
        font-size: 20px;
    }
`
const OptionDateContainer = styled(DateContainer)`
    padding : 10px 0 0 0;
    font-size : 11px;
`



const Container = styled.div`
    height : 100px;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    padding : 10px 15px 0 15px;
`

const ZoomAction = styled.div`
  margin-right: 10px;
  cursor : pointer;
`;

function ZoomOption(props) {
    console.log(props);
    const updateToggleLike = (cache, result) => {
        const {
            data : {
                toggleLike : {
                    ok
                }
            }
        } = result;
        if(ok) {
            const photoId = `Photo:${props.id}`;
            cache.modify({
                id: photoId,
                fields: {
                    isLiked(prev) {
                        return !prev;
                    },
                    likes(prev) {
                        if (props.isLiked) {
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
            id : props.id,
        },
        update : updateToggleLike,
    }); 
    const mmdd = props.time.split("T")[0].split("-")
    return (
        <Container>
            <ZoomActions>
                <div>
                    <ZoomAction onClick={toggleLikeMutation}>
                        <FontAwesomeIcon
                            style={{ color: props.isLiked ? "tomato" : "inherit" }}
                            icon={props.isLiked ? SolidHeart : faHeart}
                        />
                    </ZoomAction>
                    <ZoomAction>
                        <FontAwesomeIcon icon={faComments} />      
                    </ZoomAction>
                    <ZoomAction>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </ZoomAction>
                </div>
                <div>
                    <FontAwesomeIcon icon={faBookmark} />
                </div>
            </ZoomActions>
            <Likes>{props.likes === 1 ? "1 like" : `${props.likes} likes`}</Likes>
            <OptionDateContainer>{`${mmdd[1]}. ${mmdd[2]}`}</OptionDateContainer>
            
        </Container>
        
    );
}

export default ZoomOption;