import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import VerifyConnection from "../components/VerifyConnection";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <VerifyConnection>
        <Component {...pageProps} />
      </VerifyConnection>
    </ApolloProvider>
  );
}

export default MyApp;
