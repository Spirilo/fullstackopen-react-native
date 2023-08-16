import { useMutation, useApolloClient } from "@apollo/client";

import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apollo = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  console.log(result)

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { credentials: { username, password }}});

    const token = data.authenticate.accessToken;
    await authStorage.setAccessToken(token);

    apollo.resetStore();
  }

  return [signIn, result];
};

export default useSignIn;