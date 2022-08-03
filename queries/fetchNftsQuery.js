import { gql } from "@apollo/client";

export default gql`
  query Nfts($request: NFTsRequest!) {
    nfts(request: $request) {
      items {
        contractName
        contractAddress
        symbol
        tokenId
        owners {
          amount
          address
        }
        name
        description
        contentURI
        originalContent {
          uri
          metaType
        }
        chainId
        collectionName
        ercType
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`;
