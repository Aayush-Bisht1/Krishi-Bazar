import { getMyBiddingItems } from "@/store/slices/biddingSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TimeDisplay } from "@/pages/BiddingItem";
import Spinner from "./Spinner";
import { Button } from "@/components/ui/button";

const ViewMyAuctions = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { myBiddingItems, loading } = useSelector((state) => state.bidding);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthenticated || user.role !== "farmer") {
      navigate("/login");
    }
    dispatch(getMyBiddingItems());
  }, [dispatch, isAuthenticated, user, navigate]);
  const handleDeleteBidding = (id) => {};
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Auctions</CardTitle>
        </CardHeader>
        {loading ? (
          <Spinner />
        ) : (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {myBiddingItems.length > 0 ? (
                myBiddingItems.map((item, id) => (
                    <div key={id} className="p-2 border rounded-lg">
                      <img
                        src={item.image?.url}
                        className="w-full aspect-[2/1] rounded-lg"
                      />
                      <div className="flex justify-between items-center mt-2 space-y-1">
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-500">
                            Starting Bid: {item.startingBid}
                          </p>
                          <p className="text-sm text-gray-500">
                            Current Bid: {item.currentBid}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-sm">
                            Total Bids: {item.bids.length}
                          </p>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs ${
                              new Date(item.endTime) < Date.now()
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-200 text-green-800"
                            }`}
                          >
                            <TimeDisplay
                              startTime={item.startTime}
                              endTime={item.endTime}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1 mt-2">
                        <Button
                          className="bg-stone-700 transition-all duration-300 hover:bg-black"
                          onClick={() =>
                            navigate(`/bidding/details/${item._id}`)
                          }
                        >
                          View Bidding
                        </Button>
                        <Button
                          className="bg-red-400 transition-all duration-300 hover:bg-red-500"
                          onClick={handleDeleteBidding(item._id)}
                        >
                          Delete Bidding
                        </Button>
                        <Button
                          className="bg-sky-400 transition-all duration-300 hover:bg-sky-600"
                          disabled={new Date(item.endTime) > Date.now()}
                        >
                          Republish Item
                        </Button>
                      </div>
                    </div>
                ))
              ) : (
                <h3 className="text-[#666] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl mt-5">
                  You have not posted any Bidding Item.
                </h3>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default ViewMyAuctions;
