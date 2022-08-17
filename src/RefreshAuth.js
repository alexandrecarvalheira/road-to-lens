import { gql } from "@apollo/client";
import client from "../apollo-client";
import jwt_decode from "jwt-decode";
import { login } from "./Authentication";

const REFRESH_AUTHENTICATION = `
  mutation($request: RefreshRequest!) { 
    refresh(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const refreshAuth = (refreshToken) => {
  return client.mutate({
    mutation: gql(REFRESH_AUTHENTICATION),
    variables: {
      request: {
        refreshToken,
      },
    },
  });
};

export const RefreshRequest = async (account) => {
  console.log("refresh!!!");
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) {
    console.log("sem refresh token, fazendo login");
    const newlogin = await login(account);
    return;
  }
  const decoded = jwt_decode(refresh_token);
  const expiretime = decoded.exp;
  const currentTime = Math.floor(Date.now() / 1000);
  if (expiretime < currentTime) {
    console.log("refresh expirado, fazendo login");
    const newlogin = await login(account);
  } else {
    console.log("refresh no auth token");
    const newAccessToken = await refreshAuth(refresh_token);
    localStorage.setItem("auth_token", newAccessToken.data.refresh.accessToken);
  }
};
