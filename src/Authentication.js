import { gql } from "@apollo/client";
import { ethers } from "ethers";
import client from "../apollo-client";

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

const challenge = (address) => {
  return client.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
};

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const authenticate = (address, signature) => {
  return client.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
};

export const login = async (address) => {
  console.log("login no endereço", address);
  const challengeResponde = await challenge(address);
  console.log(challengeResponde);
  const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = ethersProvider.getSigner();
  console.log(ethersProvider);

  const signText = async (text) => {
    const signed = await signer.signMessage(text);
    return signed;
  };

  const signature = await signText(challengeResponde.data.challenge.text);
  console.log(signature);

  const accessToken = await authenticate(address, signature);
  console.log(accessToken);
  localStorage.setItem("auth_token", accessToken.data.authenticate.accessToken);
  localStorage.setItem(
    "refresh_token",
    accessToken.data.authenticate.refreshToken
  );
};
