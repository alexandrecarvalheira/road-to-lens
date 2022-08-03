import { useQuery } from "@apollo/client";
import fetchNftsQuery from "../queries/fetchNftsQuery";
import NftCard from "./NftCard";

export default function NftGallery({ address }) {
  console.log("fetching nfts for", address);
  const { loading, error, data } = useQuery(fetchNftsQuery, {
    variables: {
      request: { ownerAddress: address, chainIds: [137], limit: 10 },
    },
  });

  if (loading) return "";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <NftCard nfts={data.nfts.items} />
    </>
  );
}
