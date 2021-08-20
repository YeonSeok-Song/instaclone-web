import { gql, useQuery, useReactiveVar } from '@apollo/client';
import React, { useEffect } from 'react';
import { isLoggedInVar, logUserOut } from '../../apollo';

const ME_QUERY = gql`
    query me {
        me {
            userName
            avatar
        }
    }
`

function useUser() {
    const hasToken = useReactiveVar(isLoggedInVar);
    const {data , error} = useQuery(ME_QUERY, {
        skip : !hasToken
    });
    useEffect(() => {
        if(data?.me === null) {
            logUserOut()
        }
    }, [data])
    return {data};
}

export default useUser;