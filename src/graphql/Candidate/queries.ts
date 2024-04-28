import { gql } from '@apollo/client';

export const GET_CANDIDATES = gql`
  query GetAllCandidates {
    candidates {
      id
      name
      email
      offers {
        id
        title
        status
        salary
      }
    }
  }
`;
export const GET_TOTAL_CANDIDATES = gql`
  query GetAllCandidatesCount {
    totalCandidates
  }
`;