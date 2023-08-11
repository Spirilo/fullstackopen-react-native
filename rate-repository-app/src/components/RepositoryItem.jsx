import { Text, View } from "react-native";

const RepositoryItem = ({ name, description, language, forks, stars, rating, reviews }) => {
  return(
    <View>
      <Text>Full name: {name}</Text>
      <Text>Description: {description}</Text>
      <Text>Language: {language}</Text>
      <Text>Forks: {forks}</Text>
      <Text>Stars: {stars}</Text>
      <Text>Rating: {rating}</Text>
      <Text>Reviews: {reviews}</Text>
    </View>
  )
};

export default RepositoryItem;