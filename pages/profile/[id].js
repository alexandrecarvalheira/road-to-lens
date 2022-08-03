import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import fetchProfileQuery from "../../queries/fetchProfileQuery.js";
import Perfil from "../perfil";
import Profile from "../../components/Profile.js";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    setCurrentAccount(accounts[0]);
  };

  console.log("fetching profile", id);
  const { loading, error, data } = useQuery(fetchProfileQuery, {
    variables: {
      request: { profileId: id },
      publicationsRequest: {
        profileId: id,
        publicationTypes: ["POST"],
      },
      followRequest: {
        followInfos: [
          {
            followerAddress: currentAccount,
            profileId: id,
          },
        ],
      },
    },
  });

  if (loading) return "";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <Profile
        follow={data.doesFollow[0].follows}
        profile={data.profile}
        displayFullProfile={true}
      />
      <Perfil data={data} />
    </div>
  );
}
