import { useQuery } from "@apollo/client";
import Timeline from "../components/Timeline.js";
import fetchDefaultProfile from "../queries/fetchDefaultProfile.js";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");
  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    setCurrentAccount(accounts[0]);
  };
  const { loading, error, data } = useQuery(fetchDefaultProfile, {
    variables: {
      request: { ethereumAddress: currentAccount },
    },
  });

  if (loading) return "";
  if (error) return `Error! ${timelineError.message}`;
  const profileId = data.defaultProfile.id;
  return <Timeline profileId={profileId} />;
}
