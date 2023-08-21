import { useQuery } from "@apollo/client";

import { GET_REPO } from "../graphql/queries";

const useRepository = (variables) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPO, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    reviews: data?.repository.reviews,
    fetchMore: handleFetchMore,
    error,
    loading,
    ...result
  }
}

export default useRepository;