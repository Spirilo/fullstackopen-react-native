import { Image, View, StyleSheet, Pressable } from "react-native";
import Text from './Text';
import theme from "../theme";
import * as Linking from 'expo-linking';

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexGrow: 1
  },
  logoContainer: {
    flexGrow: 0,
    paddingLeft: 10,
    paddingTop: 10,
  },
  infoContainer: {
    flexGrow: 1,
    padding: 5,
    flexShrink: 1
  },
  logo: {
    width: 50,
    height: 50,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.third,
    padding: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 2
  },
  description: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.main
  },
})

const RepositoryHeader = ({ image, name, description, language }) => {
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.logoContainer}>
        <Image style={headerStyles.logo} source={{ uri: image.toString() }}  />
      </View>
      <View style={headerStyles.infoContainer}>
        <Text fontSize='subheading' fontWeight='bold'>{name}</Text>
        <Text style={headerStyles.description}>{description}</Text>
        <Text style={headerStyles.language}>{language}</Text>
      </View>
    </View>
  )
};

const bodyStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    padding: 5,
    justifyContent: 'space-around',
  },
  single: {
    alignItems: 'center'
  }
})

const thousand = (value) => {
  return value > 1000 ? `${(value / 1000).toFixed(1)}k` : value
}

const RepositoryBody = ({ forks, stars, rating, reviews }) => {
  return (
    <View style={bodyStyles.container}>
      <View style={bodyStyles.single}>
        <Text fontWeight='bold'>{thousand(forks)}</Text>
        <Text color='textSecondary'>Forks</Text>
      </View>
      <View style={bodyStyles.single}>
        <Text fontWeight='bold'>{thousand(stars)}</Text>
        <Text color='textSecondary'>Stars</Text>
      </View>
      <View style={bodyStyles.single}>
        <Text fontWeight='bold'>{thousand(rating)}</Text>
        <Text color='textSecondary'>Rating</Text>
      </View>
      <View style={bodyStyles.single}>
        <Text fontWeight='bold'>{thousand(reviews)}</Text>
        <Text color='textSecondary'>Reviews</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cfffed',
    paddingBottom: 10,
    
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 2,
    borderRadius: 10,
    borderWidth: 1,
    margin: 5
  },
  text: {
    color: theme.colors.third,
    textAlign: 'center',
    padding: 10,
  },
})

const RepositoryItem = ({ image, name, description, language, forks, stars, rating, reviews, url }) => {

  const openLink = () => {
    Linking.openURL(url);
  }

  return(
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryHeader 
        image={image}
        name={name}
        description={description}
        language={language} 
      />
      <RepositoryBody
        forks={forks}
        stars={stars}
        rating={rating}
        reviews={reviews}
      />
      {url ?
        <Pressable style={styles.button} onPress={openLink}>
          <Text style={styles.text}>Open in GitHub</Text>
        </Pressable>
      :
        null
      }
    </View>
  )
};

export default RepositoryItem;