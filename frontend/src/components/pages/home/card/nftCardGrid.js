import React, { useState, useEffect } from 'react';
import { Link  } from "react-router-dom";


/* 
* Explore New NFTs must contain
* 0. id of NFT
* 1. Image of person who sells the NFT
* 2. Name of person who sells the NFT
* 3. Image of NFT
* 4. Time before auction ends
* 5. Name of NFT
* 6. Tag of NFT
* 7. Highest bid
* 7.1. Text on top of highest bid (highest bid)
* 8. Button to bid

*/


const nfts = [
  {
    id: 1,
    link: "/nft/1",
    sellType: 'Auction',
    sellerName: 'John Doe',
    sellerImage: 'https://via.placeholder.com/150',
    nftImage: 'https://via.placeholder.com/150',
    nftTimeLeft: '1D.2H.34Min',
    nftName: 'Monkey',
    nftTag: '#001',
    nftHighestBid: '2.079',
    nftPrice: '',
    nftCoin: 'ETH',
  },
  {
    id: 2,
    link: "/nft/2",
    sellType: 'Instant Sale',
    sellerName: 'John Doe',
    sellerImage: 'https://via.placeholder.com/150',
    nftImage: 'https://via.placeholder.com/150',
    nftTimeLeft: '',
    nftName: 'Monkey',
    nftTag: '#001',
    nftHighestBid: '',
    nftPrice: '1.23',
    nftCoin: 'ETH',
  },
  {
    id: 3,
    link: "/nft/3",
    sellType: 'Instant Sale',
    sellerName: 'John Doe',
    sellerImage: 'https://via.placeholder.com/150',
    nftImage: 'https://via.placeholder.com/150',
    nftTimeLeft: '',
    nftName: 'Monkey',
    nftTag: '#001',
    nftHighestBid: '',
    nftPrice: '1.23',
    nftCoin: 'ETH',
  },
  {
    id: 4,
    link: "/nft/4",
    sellType: 'Auction',
    sellerName: 'John Doe',
    sellerImage: 'https://via.placeholder.com/150',
    nftImage: 'https://via.placeholder.com/150',
    nftTimeLeft: '29D.22H.3Min',
    nftName: 'Monkey',
    nftTag: '#001',
    nftHighestBid: '0.3',
    nftPrice: '',
    nftCoin: 'ETH',
  },
  {
    id: 5,
    link: "/nft/5",
    sellType: 'Auction',
    sellerName: 'John Doe',
    sellerImage: 'https://via.placeholder.com/150',
    nftImage: 'https://via.placeholder.com/150',
    nftTimeLeft: '0D.0H.45Min',
    nftName: 'Monkey',
    nftTag: '#001',
    nftHighestBid: '3.4',
    nftPrice: '',
    nftCoin: 'ETH',
  },
  {
    id: 6,
    link: "/nft/6",
    sellType: 'Instant Sale',
    sellerName: 'John Doe',
    sellerImage: 'https://via.placeholder.com/150',
    nftImage: 'https://via.placeholder.com/150',
    nftTimeLeft: '',
    nftName: 'Monkey',
    nftTag: '#001',
    nftHighestBid: '',
    nftPrice: '1.23',
    nftCoin: 'ETH',
  },
  {
    id: 7,
    link: "/nft/7",
    sellType: 'Instant Sale',
    sellerName: 'John Doe',
    sellerImage: 'https://via.placeholder.com/150',
    nftImage: 'https://via.placeholder.com/150',
    nftTimeLeft: '',
    nftName: 'Monkey',
    nftTag: '#001',
    nftHighestBid: '',
    nftPrice: '1.23',
    nftCoin: 'ETH',
  },
  {
    id: 8,
    link: "/nft/8",
    sellType: 'Auction',
    sellerName: 'John Doe',
    sellerImage: 'https://via.placeholder.com/150',
    nftImage: 'https://via.placeholder.com/150',
    nftTimeLeft: '4D.15H.03Min',
    nftName: 'Monkey',
    nftTag: '#001',
    nftHighestBid: '0.024',
    nftPrice: '',
    nftCoin: 'ETH',
  },
  {
    id: 9,
    link: "/nft/9",
    sellType: 'Auction',
    sellerName: 'John Doe',
    sellerImage: 'https://via.placeholder.com/150',
    nftImage: 'https://via.placeholder.com/150',
    nftTimeLeft: '4D.15H.03Min',
    nftName: 'Monkey',
    nftTag: '#001',
    nftHighestBid: '0.024',
    nftPrice: '',
    nftCoin: 'ETH',
  },
  {
    id: 10,
    link: "/nft/10",
    sellType: 'Instant Sale',
    sellerName: 'John Doe',
    sellerImage: 'https://via.placeholder.com/150',
    nftImage: 'https://via.placeholder.com/150',
    nftTimeLeft: '',
    nftName: 'Monkey',
    nftTag: '#001',
    nftHighestBid: '',
    nftPrice: '1.23',
    nftCoin: 'ETH',
  },
  {
    id: 11,
    link: "/nft/11",
    sellType: 'Instant Sale',
    sellerName: 'John Doe',
    sellerImage: 'https://via.placeholder.com/150',
    nftImage: 'https://via.placeholder.com/150',
    nftTimeLeft: '',
    nftName: 'Monkey',
    nftTag: '#001',
    nftHighestBid: '',
    nftPrice: '1.23',
    nftCoin: 'ETH',
  },
  {
    id: 12,
    link: "/nft/12",
    sellType: 'Instant Sale',
    sellerName: 'John Doe',
    sellerImage: 'https://via.placeholder.com/150',
    nftImage: 'https://via.placeholder.com/150',
    nftTimeLeft: '',
    nftName: 'Monkey',
    nftTag: '#001',
    nftHighestBid: '',
    nftPrice: '1.23',
    nftCoin: 'ETH',
  },
];

const NftCard = ({ nft }) => (
  <div className="shadow-sm rounded-md m-2 transition duration-500 hover:scale-110 cursor-pointer ">
    <Link to ={nft.link}>
    <img className="object-cover w-full max-h-44 rounded mr-2" src={nft.nftImage} alt={nft.nftName} />
    {/* <div className="flex my-2">
      <p className="py-1 px-3 bg-black bg-opacity-10 text-black text-sm font-medium rounded-full">{nft.sellType === 'Auction' ? nft.nftTimeLeft : nft.sellType}</p>
    </div> */}
    
    <div className='p-4'>
    <p className="mb-3  text-black font-medium text-md">{nft.nftName} {nft.nftTag}</p>

    <div className="flex justify-start mb-4">
      <img className="h-6 w-6 rounded-full object-cover mr-2" src={nft.sellerImage} alt={nft.sellerName} />
      <h2 className="text-center text-info my-auto font-semibold text-black">@{nft.sellerName}</h2>
    </div>

    <p> Place a bid </p>

    </div>
    
    {/* <p className="text-black text-sm  font-medium">{nft.sellType === 'Auction' ? 'Highest bid' : 'Price'}</p>
    <div className="flex">
      <p className="text-black my-auto text-md font-bold">
        {nft.sellType === 'Auction' ? nft.nftHighestBid : nft.nftPrice}{nft.nftCoin}
      </p>
    </div> */}
    </Link>
  </div>
);


const NftCardGrid = () => {
  // Limit the number of items to show based on the screen size
  const [itemsToShow, setItemsToShow] = useState(8);

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 640 && window.innerWidth > 320) {
        setItemsToShow(4);
      } else if (window.innerWidth < 768 && window.innerWidth > 640) {
        setItemsToShow(6);
      } else if (window.innerWidth < 1024 && window.innerWidth > 768) {
        setItemsToShow(9);
      } else if (window.innerWidth < 1280 && window.innerWidth > 1024) {
        setItemsToShow(8);
      }else if (window.innerWidth < 1536 && window.innerWidth > 1280) {
        setItemsToShow(10);
      } else {
        setItemsToShow(12);
      }
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);

    return () => {
      window.removeEventListener('resize', updateItemsToShow);
    };
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex mb-6">
        <span className="orange-bar rounded mr-2 mt-1"></span>
        <div className='flex justify-between w-full'>
          <h2 className="text-2xl font-bold text-neutral">Explore New NFTs</h2>
          <button className=" font-semibold text-black py-1 px-3 border border-neutral rounded-full">View all</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {nfts.slice(0, itemsToShow).map((nft) => (
          <NftCard key={nft.id} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default NftCardGrid;