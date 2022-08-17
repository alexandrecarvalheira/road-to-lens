import { gql } from "@apollo/client";
import client from "../apollo-client";

const VERIFY = `
  query($request: VerifyRequest!) {
    verify(request: $request)
  }
`;

const verify = (accessToken) => {
  return client.query({
    query: gql(VERIFY),
    variables: {
      request: {
        accessToken,
      },
    },
  });
};

export const verifyRequest = async () => {
  const token = localStorage.getItem("auth_token");
  const result = await verify(token);
  return result.data;
};
