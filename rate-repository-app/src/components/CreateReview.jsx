import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from 'yup';

import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

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

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name='ownerName' placeholder="Repository owner name" />
      <FormikTextInput name='repositoryName' placeholder="Repository name" />
      <FormikTextInput name='rating' placeholder="Rating betweem 0 - 100" />
      <FormikTextInput name='text' placeholder="Review" />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.text}>Create a review</Text>
      </Pressable>
    </View>
  )
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Rating is required'),
  text: yup
    .string()
})

const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} /> }
    </Formik>
  )
};

const CreateReview = () => {
  const [addReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      await addReview({ ownerName, repositoryName, rating, text });
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  };
  
  return <CreateReviewContainer onSubmit={onSubmit} />
}

export default CreateReview;