import { useQuery } from "@apollo/client";

import { GET_USER } from "../graphql/queries";

const useMeReviews = () => {
  const { data, loading, refetch } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true}
  });

  return {
    me: data?.me,
    loading,
    refetch
  }
}

export default useMeReviews;