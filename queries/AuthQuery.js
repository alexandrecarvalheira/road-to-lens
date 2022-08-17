import { gql } from "@apollo/client";

export default gql`
  query($request: ChallengeRequest!) {
    challenge(request: $request) {
      text
    }
  }
  mutation($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`;
