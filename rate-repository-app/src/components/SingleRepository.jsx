import Text from "./Text"
import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { FlatList, StyleSheet, View } from "react-native";
import { format } from "date-fns";
import theme from "../theme";

const RepositoryInfo = ({ repository }) => {
  // Repository's information implemented in the previous exercise
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

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: '#cfffed',
    paddingBottom: 5,
    flexDirection: 'row'
  },
  ratingContainer: {
    flexGrow: 0,
    paddingLeft: 15,
    paddingTop: 20,
  },
  infoContainer: {
    flexGrow: 1,
    padding: 15,
    flexShrink: 1
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    textAlign: 'center',
    paddingTop: 12.5,
    color: theme.colors.primary,
    borderColor: theme.colors.primary
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  // Single review item
  const createdAt = format(new Date(review.createdAt), 'dd.MM.yyyy')
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text fontWeight='bold'>{review.user.username}</Text>
        <Text>{createdAt}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
};

const SingleRepository = () => {
  const { id } = useParams();
  console.log(id)
  const { repository, loading } = useRepository(id);
  console.log(repository)
  if(loading) return <Text>Loading...</Text>
  const reviews = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      // ...
    />
  )
};

export default SingleRepository;