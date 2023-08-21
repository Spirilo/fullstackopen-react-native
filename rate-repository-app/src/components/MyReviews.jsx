import { FlatList, View, StyleSheet } from "react-native";
import { format } from "date-fns";

import Text from './Text';
import useMeReviews from "../hooks/useMeReviews";
import theme from "../theme";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: '#cfffed',
    paddingBottom: 10,
    flexDirection: 'row',
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

const SingleReview = ({ review }) => {
  const createdAt = format(new Date(review.createdAt), 'dd.MM.yyyy');
  
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text fontWeight='bold'>{review.repository.fullName}</Text>
        <Text>{createdAt}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { me } = useMeReviews();
  const reviews = me
    ? me.reviews.edges.map(edge => edge.node)
    : []
  console.log(reviews)

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <SingleReview review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
};

export default MyReviews;