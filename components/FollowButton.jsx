import { useMutation } from "@apollo/client";
import MutationFollow from "../queries/MutationFollow";
import omitDeep from "omit-deep";
import { ethers, utils } from "ethers";
import ABI from "../Contract/ABI.json";

const contract = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";

export const omit = (object, name) => {
  return omitDeep(object, name);
};
export const signedTypeData = (domain, types, value, signer) => {
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omit(domain, "__typename"),
    omit(types, "__typename"),
    omit(value, "__typename")
  );
};

export const splitSignature = (signature) => {
  return utils.splitSignature(signature);
};

export default function FollowButton({ profileId }) {
  const [followMutation, { data, loading, error }] = useMutation(
    MutationFollow,
    {
      variables: {
        request: {
          follow: [{ profile: profileId }],
        },
      },
    }
  );

  if (loading) return "Following...";
  if (error) return `Submission error! ${error.message}`;

  const follow = async () => {
    const followResult = await followMutation();
    const typedData = followResult.data.createFollowTypedData.typedData;
    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = ethersProvider.getSigner();
    const accounts = await ethersProvider.listAccounts();
    const address = accounts[0];
    const lenshub = new ethers.Contract(contract, ABI, signer);
    const signature = await signedTypeData(
      typedData.domain,
      typedData.types,
      typedData.value,
      signer
    );
    console.log("follow: signature", signature);
    const { v, r, s } = splitSignature(signature);
    const tx = await lenshub.followWithSig({
      follower: address,
      profileIds: typedData.value.profileIds,
      datas: typedData.value.datas,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });
    console.log("tx hash", tx.hash);
    return tx.hash;
  };
  return (
    <button
      className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
      onClick={follow}
    >
      Follow
    </button>
  );
}
