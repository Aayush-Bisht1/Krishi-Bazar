import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import FeaturedBidding from "./FeaturedBidding";
import { useDispatch, useSelector } from "react-redux";
import { getAllBiddingItems } from "@/store/slices/biddingSlice";
import Spinner from "./Spinner";

const MarketPlace = () => {
  const { allBiddingItems, loading } = useSelector((state) => state.bidding);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBiddingItems());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Featured Products</CardTitle>
            <div className="flex gap-4 mt-1">
              <div className="flex-1">
                <Input
                  placeholder="Search products..."
                  className="w-full"
                  prefix={<Search className="w-4 h-4" />}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="yield">Current Yield</SelectItem>
                  <SelectItem value="contract">Farming Contracts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 ">
              {allBiddingItems.slice(0, 8).map((element) => {
                return (
                  <FeaturedBidding
                    title={element.title}
                    imgsrc={element.image?.url}
                    startTime={element.startTime}
                    endTime={element.endTime}
                    quantity={element.quantity}
                    unit={element.unit}
                    createdBy={element.createdBy}
                    type={element.type}
                    startingBid={element.startingBid}
                    currentBid={element.currentBid}
                    location={element.location}
                    bids={element.bids}
                    id={element._id}
                    key={element._id}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MarketPlace;
