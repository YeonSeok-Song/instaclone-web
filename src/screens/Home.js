import React, {useEffect, useMemo, useState} from 'react';
import { gql, useQuery } from '@apollo/client';
import Photo from "../components/feed/Photo";
import PageTitle from '../components/PageTitle';
import styled from 'styled-components';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from './fragments';
import { client } from '../apollo';
import useUser from '../components/hooks/useUser';
import {ACTION_FEED} from '../screens/fragments';

const FEED_QUERY = gql`
    query seeFeed($offset : Int! $limit : Int!){
        seeFeed(offset : $offset limit : $limit){ 
            id
            ...PhotoFragment
            user { 
                userName
                avatar
                isFollowing
            }
            caption
            createAt
            isMine
            comments {
                ...CommentFragment
            }
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`; 

const HomeContainer = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
`;

function Home() {
    // const userData = useUser();
    // initWriteFeed(userData?.data?.me?.userName)
    const {data, loading, fetchMore} = useQuery(FEED_QUERY, {
        variables : {
            offset : 0,
            limit : 3,
        }
    });
             
    useEffect(() => {
        const onScroll = async () => {
            if (window.scrollY + document.documentElement.clientHeight >= (document.documentElement.scrollHeight)){
                console.log(data);
                await fetchMore({
                    variables: {
                      offset: data?.seeFeed?.length,
                      limit : 3,
                    }, 
                })
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [loading, data])

    return (
        <HomeContainer >
            <PageTitle title="Home" />
            {data?.seeFeed?.map((photo) => (
                <Photo key={photo.id} {...photo} />
            ))}
        </HomeContainer>
    );
}

export default Home;

/*
window.addEventListener("scroll", async (e) => {
        if (window.scrollY + document.documentElement.clientHeight >= (document.documentElement.scrollHeight) && !loading){
            console.log("ss");
            await fetchMore({
                variables: {
                  offset: data?.seeFeed?.length,
                  limit : 3,
                }, 
            })
        }
    })
    */
