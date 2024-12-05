import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, History, Star } from "lucide-react";
import MarketPlace from "@/components/MarketPlace";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { getAllBiddingItems } from "@/store/slices/biddingSlice";

const BuyerDashBoard = () => {
  const [myBids] = useState([
    {
      id: 1,
      product: "Organic Wheat",
      myBid: "₹2400",
      status: "Outbid",
      highestBid: "₹2500",
    },
    {
      id: 2,
      product: "Rice Contract",
      myBid: "₹3000",
      status: "Winning",
      highestBid: "₹3000",
    },
  ]);
  const navigate = useNavigate();
  const getSelectedTab = () =>
    localStorage.getItem("selectedTab") || "marketplace";
  const [activeTab, setActiveTab] = useState(getSelectedTab());
  const { allBiddingItems, loading } = useSelector((state) => state.bidding);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBiddingItems());
  },[dispatch]);
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleTabChange = (value) => {
    setActiveTab(value);
    localStorage.setItem("selectedTab", value);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6 pt-3">Buyer Dashboard</h1>
        <Button
          onClick={isAuthenticated ? handleLogout : () => navigate("/login")}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-3 gap-4">
          <TabsTrigger value="marketplace" className="flex items-center gap-2">
            <ShoppingBag size={16} />
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="mybids" className="flex items-center gap-2">
            <History size={16} />
            My Bids
          </TabsTrigger>
          <TabsTrigger value="watchlist" className="flex items-center gap-2">
            <Star size={16} />
            Watchlist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace">
          <MarketPlace />
        </TabsContent>

        <TabsContent value="mybids">
          <Card>
            <CardHeader>
              <CardTitle>My Bidding History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allBiddingItems.map(
                  (item) =>
                    item.bids.length > 0 &&
                    item.bids.map(
                      (bid, id) =>
                        bid.userId === user._id && (
                          <div key={id} className="border rounded-lg p-4 mb-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="text-sm text-gray-500">
                                  Your Bid: {bid.amount}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm">
                                  Highest Bid: {item.currentBid}
                                </p>
                                <span
                                  className={`inline-block px-2 py-1 rounded-full text-xs ${
                                    item.currentBid - bid.amount > 0
                                      ? "bg-red-100 text-red-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {
                                    item.currentBid - bid.amount > 0 ? "Outbid" : "Winning"
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                    )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="watchlist">
          <Card>
            <CardHeader>
              <CardTitle>Watched Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Star className="w-12 h-12 mx-auto mb-4 stroke-1" />
                <p>No items in your watchlist yet.</p>
                <p className="text-sm">
                  Add items to track their prices and bidding status.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuyerDashBoard;
