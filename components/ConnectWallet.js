export default function ConnectWallet({ connectWallet }) {
  return (
    <div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Try Lens Protocol</span>
          <span className="block text-indigo-600">Connect your wallet</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 ">
          <div className=" rounded-md shadow" onClick={connectWallet}>
            <a
              href="#"
              className=" items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Connect Wallet
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
