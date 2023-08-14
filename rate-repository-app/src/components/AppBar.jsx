import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';


import theme from '../theme';
import Text from './Text';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.scroll}>
        <Link to='/' style={styles.link}>
          <Text color='textSecondary' fontWeight='bold' style={styles.pad}>Repositories</Text>
        </Link>
        <Link to='/signin' style={styles.link}>
          <Text color='textSecondary' fontWeight='bold' style={styles.pad}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  )
};

export default AppBar;