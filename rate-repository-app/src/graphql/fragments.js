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