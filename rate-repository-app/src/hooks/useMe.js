import { useQuery } from "@apollo/client";

import { GET_USER } from "../graphql/queries";

const useMe = () => {
  const { data, loading } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network'
  });

  return {
    me: data?.me,
    loading
  }
}

export default useMe;