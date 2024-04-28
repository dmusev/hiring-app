import { gql } from '@apollo/client';

export const GET_OFFERS = gql`
  query GetAllOffers {
    offers {
      id
      title
      status
      salary
      candidate {
        name
        email
      }
    }
  }
`;

export const GET_TOTAL_OFFERS = gql`
  query GetAllOffers {
    totalOffers
  }
`;

export const GET_OFFER = gql`
  query GetOffer($id: any!) {
    offer(id: $id) {
      id
      title
      status
      salary
    }
  }
`;