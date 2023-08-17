import { useQuery } from "@apollo/client";

import { GET_REPO } from "../graphql/queries";

const useRepository = (repositoryId) => {
  const { data, error, loading } = useQuery(GET_REPO, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId }
  });

  return {
    repository: data?.repository,
    reviews: data?.repository.reviews,
    error,
    loading
  }
}

export default useRepository;