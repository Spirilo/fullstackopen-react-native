import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'column',
    justifyContent: 'flex-end'

  },
  appBar: {
    backgroundColor: theme.colors.backGround,
  },
  pad: {
    paddingBottom: 10
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable style={styles.appBar}>
      <Text color='textSecondary' fontWeight='bold' style={styles.pad}>Repositories</Text>
    </Pressable>
  </View>;
};

export default AppBar;