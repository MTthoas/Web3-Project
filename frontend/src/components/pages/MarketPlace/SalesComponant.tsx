import React from "react";
import Countdown from "react-countdown";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

export default function SalesComponant({
  nft,
  showLoading,
  setShowLoading,
  setShowModalSucces,
  setTransactionHash,
  ethPrice,
  showModalBuyNow,
  showModalOffer,
  isOfferLoading,
  isLoadingBuyNow,
  isBurning,
  burnNft,
  isLoadingDelete,
  unlistNft,
  isLoadingUnlisting,
}: any) {
  const { address } = useAccount();

  return (
    <div className="mt-7 items-center justify-between w-full space-y-4 border-t py-4 sm:flex-row sm:space-y-0 border-gray-300 border px-5 rounded-xl ">
      <div className="w-full">
        <div className="w-full my-2">
          <div className="">
            <div className="text-sm">Price</div>
            <div className="flex flex-row items-center space-x-2">
              <div className="text-neutral font-medium text-3xl">
                {nft?.price} ETH
              </div>
              <div className="stat-title pt-1">
                = {(ethPrice * nft.price).toFixed(3)} ${" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        {address ? (
          <>
            {nft.owner !== address ? (
              <>
                {showLoading ? (
                  <button
                    type="button"
                    className="bg-transparent w-full mt-3 mr-3 text-text-info font-semibold  py-2 px-4 border rounded-xl"
                  >
                    {/* SVG */}
                    <span className="sr-only">Transaction en cours...</span>
                  </button>
                ) : (
                  <>
                    {!isLoadingBuyNow ? (
                      <button
                        onClick={() => showModalBuyNow(true)}
                        type="button"
                        className="bg-transparent w-full mt-3 mr-3 text-text-info font-semibold  py-2 px-4 border border-gray-600 rounded-xl"
                      >
                        Buy now for {nft?.price} ETH
                      </button>
                    ) : (
                      <button className="w-full bg-neutral mt-2 py-2 mb-2 rounded-xl text-white">
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 mr-3 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        Loading...
                      </button>
                    )}
                  </>
                )}
                {isOfferLoading ? (
                  <button className="w-full bg-neutral mt-2 py-2 mb-2 rounded-xl text-white">
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <button
                    onClick={() => showModalOffer(true)}
                    type="button"
                    className="bg-neutral w-full mt-3 mr-3 text-white font-semibold py-2 px-4 border rounded-xl"
                  >
                    Make an offer
                  </button>
                )}
              </>
            ) : (
              <>
                {isLoadingUnlisting ? (
                  <button className="w-full bg-neutral mt-2 py-2 mb-2 rounded-xl text-white">
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <button
                    onClick={() => unlistNft(nft.tokenId)}
                    className="w-full bg-neutral py-2 mb-2 mt-2 rounded-xl text-white"
                  >
                    Unlist NFT
                  </button>
                )}
                <div className="flex justify-center pt-4">
                  <div className="border-b-2 border-gray-300 w-2/3"></div>
                </div>
                { isBurning ?
                   <button className="w-full bg-red-600 py-2 mb-2 rounded-xl text-white">
                   <svg
                     aria-hidden="true"
                     role="status"
                     className="inline w-4 h-4 mr-3 text-white animate-spin"
                     viewBox="0 0 100 101"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path
                       d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                       fill="#E5E7EB"
                     />
                     <path
                       d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                       fill="currentColor"
                     />
                   </svg>
                   Loading...
                 </button>
                    :
                    <button
                    onClick={() => burnNft()}
                    className="w-full bg-red-600 py-2 mb-2 rounded-xl text-white"
                  >
                    Burn NFT
                  </button>
                  }
              </>
            )}
          </>
        ) : (
          <div>
            <button className="w-full bg-neutral mt-3 py-2 mb-2 rounded-xl text-white">
              {" "}
              Connect to your wallet to buy{" "}
            </button>
          </div>
        )}
      </div>

      <div className="w-full flex flex-row items-center justify-center space-x-2 pt-5">
        <p className="text-gray-600 text-sm"> Sale ends in </p>
        {nft && nft.listEndTime ? (
          <Countdown date={Date.now() + nft.listEndTime} />
        ) : (
          <p> 00:00:00:00</p>
        )}
      </div>
    </div>
  );
}
