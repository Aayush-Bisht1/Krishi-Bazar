import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Timer } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBiddingDetails } from "@/store/slices/biddingSlice";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import Spinner from "@/components/Spinner";
import notStarted from "../assets/notStarted.png";
import ended from "../assets/auctionEnded.png";
import { placeBid } from "@/store/slices/bidSlice";

export const TimeDisplay = ({ startTime, endTime }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [error, setError] = useState(null);

  const calculateTimeLeft = () => {
    try {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const now = new Date();
      const timeToCompare = now < start ? start : now;
      const diff = end - timeToCompare;

      if (diff <= 0) {
        return "Ended";
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } catch (err) {
      setError(err.message);
      console.error("Error calculating time:", err);
      return "Invalid Date";
    }
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, endTime]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  return (
    <div className="flex items-center gap-2 text-orange-600">
      <Timer size={16} />
      <span className="font-medium">{timeLeft}</span>
    </div>
  );
};

const BiddingDetails = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { loading, biddingItemBidders, biddingDetails } = useSelector(
    (state) => state.bidding
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (id) {
      dispatch(getBiddingDetails(id));
    }
  }, [id, dispatch, isAuthenticated, navigate]);
  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getBiddingDetails(id));
  };

  const BidsSection = () => (
    <div className="mt-8 lg:mt-0">
      <h2 className="bg-stone-200 py-4 text-[21px] font-semibold px-4">BIDS</h2>
      {biddingItemBidders &&
      new Date(biddingDetails.startTime) < Date.now() &&
      new Date(biddingDetails.endTime) > Date.now() ? (
        biddingItemBidders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile Image</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Position</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {biddingItemBidders.map((bid, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <img
                        src={bid.profileImage}
                        alt={bid.userName}
                        className="w-11 h-11 rounded-full"
                      />
                    </TableCell>
                    <TableCell>{bid.userName}</TableCell>
                    <TableCell>
                      {index === 0 ? (
                        <p className="text-[20px] font-semibold text-green-600">
                          1st
                        </p>
                      ) : index === 1 ? (
                        <p className="text-[20px] font-semibold text-blue-600">
                          2nd
                        </p>
                      ) : index === 2 ? (
                        <p className="text-[20px] font-semibold text-yellow-600">
                          3rd
                        </p>
                      ) : (
                        <p className="text-[20px] font-semibold text-gray-600">
                          {index + 1}th
                        </p>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-gray-500 py-4">
            No bids for this Item
          </p>
        )
      ) : Date.now() > new Date(biddingDetails.endTime) ? (
        <img src={ended} alt="not-started" className="w-full max-h-[650px]" />
      ) : (
        <img
          src={notStarted}
          alt="not-started"
          className="w-full max-h-[650px]"
        />
      )}
    </div>
  );

  return (
    <>
      <section className="flex flex-col mt-5">
        <div className="text-[16px] flex flex-wrap px-5 gap-x-1 items-center ">
          <Link
            to="/"
            className="font-semibold transition-all duration-300 hover:text-[#D6482B]"
          >
            Home
          </Link>
          <FaGreaterThan className="text-stone-400" />
          <Link
            to={"/buyer/dashboard"}
            className="font-semibold transition-all duration-300 hover:text-[#D6482B]"
          >
            Biddings
          </Link>
          <FaGreaterThan className="text-stone-400" />
          <p className="text-stone-600">{biddingDetails.title}</p>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="container mx-auto p-4 w-full">
            <Card>
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="aspect-square w-full">
                          <img
                            src={biddingDetails.image?.url}
                            alt={biddingDetails.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h1 className="text-2xl font-bold">
                            {biddingDetails?.title?.toUpperCase()}
                          </h1>
                          <TimeDisplay
                            startTime={biddingDetails.startTime}
                            endTime={biddingDetails.endTime}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 font-bold">
                              Starting Bid
                            </p>
                            <p className="text-xl font-semibold">
                              ₹{biddingDetails.startingBid}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-bold">
                              Current Bid
                            </p>
                            <p className="text-xl font-semibold text-blue-600">
                              ₹
                              {biddingDetails.currentBid ||
                                biddingDetails.startingBid}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 font-bold">
                              Category:
                            </span>
                            <span className="ml-2">
                              {biddingDetails?.category?.toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 font-bold">
                              Type:
                            </span>
                            <span className="ml-2">{biddingDetails?.type?.toUpperCase()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 font-bold">
                              Condition:
                            </span>
                            <span className="ml-2">
                              {biddingDetails?.condition?.toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 font-bold">
                              Quantity:
                            </span>
                            <span className="ml-2">
                              {biddingDetails.category === "equipment" ? (
                                <>{biddingDetails.quantity}</>
                              ) : (
                                <>
                                  {biddingDetails.quantity}
                                  {biddingDetails?.unit?.toUpperCase()}
                                </>
                              )}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 font-bold">
                              Location:
                            </span>
                            <span className="ml-2">
                              {biddingDetails?.location?.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-bold mb-1">Description</h3>
                          <p className="text-gray-600">
                            {biddingDetails.description &&
                              biddingDetails.description
                                .split(".")
                                .map((ele, i) => {
                                  return <li key={i}>{ele}</li>;
                                })}
                          </p>
                        </div>
                        {new Date(biddingDetails.startTime) < Date.now() &&
                        new Date(biddingDetails.endTime) > Date.now() ? (
                          <div className="bg-stone-300 py-3 text-[16px] md:text-[24px] font-semibold px-4 flex items-center justify-between rounded-lg">
                            <div className="flex flex-col sm:flex-row gap-3 items-center">
                              <p className="text-xl ">Place Bid</p>
                              <input
                                type="number"
                                className="w-40 h-10 md:w-40 outline-none rounded-md"
                                onChange={(e) => setAmount(e.target.value)}
                              />
                            </div>
                            <button
                              className="p-4 rounded-full bg-black text-white transition-all duration-300 hover:bg-white hover:text-stone-600"
                              onClick={handleBid}
                            >
                              <RiAuctionFill />
                            </button>
                          </div>
                        ) : new Date(biddingDetails.startTime) > Date.now() ? (
                          <p className="text-orange-600 font-semibold text-xl">
                            Bidding has not started yet!
                          </p>
                        ) : (
                          <p className="text-orange-600 font-semibold text-xl">
                            Bidding has ended!
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="lg:hidden">
                      <BidsSection />
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <BidsSection />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </>
  );
};

export default BiddingDetails;
