import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';


import theme from '../theme';
import Text from './Text';
import useMe from '../hooks/useMe';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  appBar: {
    backgroundColor: theme.colors.backGround,
  },
  pad: {
    paddingBottom: 10
  },
  link: {
    padding: 5
  },
  scroll: {
    flexDirection: 'row'
  }
});

const AppBar = () => {
  const { me } = useMe();
  const [signOut] = useSignOut();

  return (
    <View style={styles.container}>
        {me ?
          <ScrollView horizontal={true} style={styles.scroll}>
            <Link to='/' style={styles.link}>
              <Text color='textSecondary' fontWeight='bold' style={styles.pad}>Repositories</Text>
            </Link>
            <Link to='/review' style={styles.link}>
              <Text color='textSecondary' fontWeight='bold' style={styles.pad}>Create a review</Text>
            </Link>
            <Link to='/myreviews' style={styles.link}>
              <Text color='textSecondary' fontWeight='bold' style={styles.pad}>My reviews</Text>
            </Link>
            <Link to='/' style={styles.link} onPress={signOut}>
              <Text color='textSecondary' fontWeight='bold' style={styles.pad}>Sign out</Text>
            </Link>
          </ScrollView>
        :
          <ScrollView horizontal={true} style={styles.scroll}>
            <Link to='/' style={styles.link}>
              <Text color='textSecondary' fontWeight='bold' style={styles.pad}>Repositories</Text>
            </Link>
            <Link to='/signin' style={styles.link}>
              <Text color='textSecondary' fontWeight='bold' style={styles.pad}>Sign in</Text>
            </Link>
            <Link to='/signup' style={styles.link}>
              <Text color='textSecondary' fontWeight='bold' style={styles.pad}>Sign up</Text>
            </Link>
          </ScrollView>
        }
    </View>
  )
};

export default AppBar;