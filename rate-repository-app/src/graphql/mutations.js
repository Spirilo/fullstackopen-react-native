import { gql } from "@apollo/client";
import { REVIEW_DETAILS } from "./fragments";

export const SIGN_IN = gql`
  mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      ...ReviewDetails
    }
  }
  ${REVIEW_DETAILS}
`;

export const CREATE_USER = gql`
  mutation($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;