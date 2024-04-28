import { gql } from '@apollo/client';

export const CREATE_OFFER = gql`
  mutation CreateOffer($title: String!, $status: String!, $salary: Float!, $candidateId: String!) {
    createOffer(input: { title: $title, status: $status, salary: $salary, candidateId: $candidateId }) {
      id
      title
      status
      salary
      candidateId
    }
  }
`;