export default function NftCard({ nfts }) {
  return (
    <div>
      {nfts.map((nft) => {
        return (
          <div
            className="w-1/2 flex flex-col justify-center inline-flex p-10"
            key={nft.contractAddress}
          >
            <div className="rounded-md">
              <img
                className="object-cover h-128 w-full rounded-t-md"
                src={
                  nft.originalContent.metaType === "unknow"
                    ? "https://files.readme.io/a0959e6-lens-logo1.svg"
                    : nft.originalContent.uri
                }
              ></img>
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
              <div className="">
                <h2 className="text-xl text-gray-800">{nft.contractName}</h2>
                <p className="text-gray-600">{`${nft.contractAddress.substr(
                  0,
                  4
                )}.....${nft.contractAddress.substr(
                  nft.contractAddress.length - 4
                )}`}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <a
                className="mt-3 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                target={"_blank"}
                href={`https://polygonscan.com/token/${nft.contractAddress}`}
                rel="noreferrer"
              >
                {" "}
                View on Polygonscan{" "}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
