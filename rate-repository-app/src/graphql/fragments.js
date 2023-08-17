import { gql } from "@apollo/client"

export const REPO_DETAILS = gql`
  fragment RepoDetails on Repository {
    ownerAvatarUrl
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    id
  }
`;

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;
