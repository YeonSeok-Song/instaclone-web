import { gql } from "@apollo/client";

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      userName
      avatar
    }
    payload
    isMine
    createAt
  }
`;

export const ACTION_FEED = gql`
  query Photos($id: String!) {
      Photos(id: $id) {
          id
          seeFeed
      }
  }
`;

export const READ_PHOTO = gql`
  fragment MyTodo on Photo {
      id
      file
      likes
      commentNumber
      isLiked
      user { 
        userName
        avatar
        isFollowing
      }
      caption
      createAt
      isMine
      comments {
        id
        user {
          userName
          avatar
        }
        payload
        isMine
        createAt
      }
  }
`
export const FOLLOW_USER_MUTATION = gql`
    mutation followUser($userName : String!) {
        followUser(userName : $userName) {
            ok
            error
        }
    }
`

export const UNFOLLOW_USER_MUTATION = gql`
    mutation unfollowUser($userName : String!) {
        unfollowUser(userName : $userName) {
            ok
            error
        }
    }
`

export const SEE_PROFILE_QUERY = gql`
    query seeProfile($userName : String!) { 
        seeProfile(userName : $userName){
            firstName
            lastName
            userName
            bio
            avatar
            photos {
              ...PhotoFragment
            }
            totalFollowing
            totalFollowers
            isMe
            isFollowing
        }
    }
    ${PHOTO_FRAGMENT}
`;

export const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id : Int!) {
        toggleLike(id : $id){
            ok
            error
        }
    }
`

export const CREATE_COMMENT_MUTATION = gql`
mutation createComment($photoId: Int!, $payload: String!) {
  createComment(photoId: $photoId, payload: $payload) {
    ok
    error
    id
  }
}
`;