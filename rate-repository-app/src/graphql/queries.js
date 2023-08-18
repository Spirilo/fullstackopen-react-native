import { gql } from "@apollo/client";

import { REPO_DETAILS, REVIEW_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query(
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy,
      orderDirection: $orderDirection, 
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepoDetails
        }
      }
    }
  }
  ${REPO_DETAILS}
`;

export const GET_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPO = gql`
  query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      url
      ...RepoDetails
      reviews {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }
  ${REPO_DETAILS} ${REVIEW_DETAILS}
`;