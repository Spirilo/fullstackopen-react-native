import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from 'yup';

import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import Text from "./Text";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: ''
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 2,
    borderRadius: 10,
    margin: 5,
    borderWidth: 1
  },
  text: {
    color: theme.colors.third,
    textAlign: 'center',
    padding: 10,
  }
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
      <FormikTextInput name='passwordConfirmation' placeholder='Password confirmation' secureTextEntry={true} />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.text}>Sign up</Text>
      </Pressable>
    </View>
  )
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Must be atleaset 5 characters')
    .max(30, 'Cant be over 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Must be atleaset 5 characters')
    .max(30, 'Cant be over 30 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords dont match')
    .required('Confirm password!')
});

const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} /> }
    </Formik>
  )
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password});
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />
};

export default SignUp;