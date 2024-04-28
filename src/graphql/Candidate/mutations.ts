import { gql } from '@apollo/client';

export const CREATE_CANDIDATE = gql`
  mutation CreateCandidate($name: String!, $email: String!) {
    createCandidate(input: { name: $name, email: $email }) {
      id
      name
      email
    }
  }
`;