import { gql } from '@apollo/client';

export const GEt_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;