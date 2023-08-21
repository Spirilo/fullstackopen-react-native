import { FlatList, View, StyleSheet, Pressable, Alert } from "react-native";
import { format } from "date-fns";

import Text from './Text';
import useMeReviews from "../hooks/useMeReviews";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";

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
  },
  button1: {
    backgroundColor: theme.colors.primary,
    padding: 2,
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    flexGrow: 1
  },
  button2: {
    backgroundColor: theme.colors.error,
    padding: 2,
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    flexGrow: 1
  },
  text: {
    color: theme.colors.third,
    textAlign: 'center',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row'
  }
});

const ButtonContainer = ({ onView, onDlt }) => {

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button1} onPress={onView}>
        <Text style={styles.text}>View repository</Text>
      </Pressable>
      <Pressable style={styles.button2} onPress={onDlt}>
        <Text style={styles.text}>Delete review</Text>
      </Pressable>
    </View>
  );
};

const SingleReview = ({ review, refetch }) => {
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();
  const createdAt = format(new Date(review.createdAt), 'dd.MM.yyyy');

  const clickToRepo = () => {
    navigate(`/${review.repository.id}`)
  };

  const clickToDelete = () => {
    console.log('dlt')
    Alert.alert('Delete review', 'Are you sure you want to delete this review', [
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Cancelled'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          await deleteReview(review.id);
          await refetch();
        }
      },
    ]);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text fontWeight='bold'>{review.repository.fullName}</Text>
        <Text>{createdAt}</Text>
        <Text>{review.text}</Text>
        <ButtonContainer onView={clickToRepo} onDlt={clickToDelete} />
      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { me, refetch } = useMeReviews();
  const reviews = me
    ? me.reviews.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <SingleReview review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
};

export default MyReviews;