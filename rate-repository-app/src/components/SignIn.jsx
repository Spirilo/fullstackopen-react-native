import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 2,
    borderRadius: 10,
  },
  text: {
    color: theme.colors.third,
    textAlign: 'center',
    padding: 10,
  }
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
    </View>
  )
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} /> }
    </Formik>
  )
};

export default SignIn;