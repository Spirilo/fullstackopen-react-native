import Text from "./Text"
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";

const SingleRepository = () => {
  const { id } = useParams();
  console.log(id)
  const { repository, loading } = useRepository(id);
  console.log(repository)
  if(loading) return <Text>Loading...</Text>

  return (
    <RepositoryItem
      image={repository.ownerAvatarUrl}
      name={repository.fullName}
      description={repository.description}
      language={repository.language}
      forks={repository.forksCount}
      stars={repository.stargazersCount}
      rating={repository.ratingAverage}
      reviews={repository.reviewCount}
      url={repository.url}
    />
  )
};

export default SingleRepository;