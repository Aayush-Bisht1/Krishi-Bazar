import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {  Gavel, DollarSign, List } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import SubmitCommission from "@/components/SubmitCommission";
import CreateBidding from "@/components/CreateBidding";
import ViewMyAuctions from "@/components/ViewMyAuctions";
const FarmerDashBoard = () => {
  const [myAuctions] = useState([
    {
      id: 1,
      product: "Organic Wheat",
      currentBid: "₹2500/quintal",
      bids: 5,
      status: "Active",
    },
    {
      id: 2,
      product: "Rice Contract",
      currentBid: "₹3000/quintal",
      bids: 3,
      status: "Pending",
    },
  ]);
  const {isAuthenticated} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="p-4 max-w-6xl mx-auto ">
      <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold mb-6 pt-5">Farmer Dashboard</h1>
      <Button onClick={isAuthenticated? handleLogout : () => navigate('/login')}>
        {isAuthenticated ? "Logout" : "Login"}</Button>
      </div>

      <Tabs defaultValue="bidding" className="space-y-4">
        <TabsList className="grid grid-cols-3 gap-4">
          <TabsTrigger value="bidding" className="flex items-center gap-2">
            <Gavel size={16} />
            Create Bidding
          </TabsTrigger>
          <TabsTrigger value="commission" className="flex items-center gap-2">
            <DollarSign size={16} />
            Submit Commission
          </TabsTrigger>
          <TabsTrigger value="auctions" className="flex items-center gap-2">
            <List size={16} />
            My Auctions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bidding">
          <CreateBidding />
        </TabsContent>

        <TabsContent value="commission">
          <SubmitCommission/>
        </TabsContent>

        <TabsContent value="auctions">
          <ViewMyAuctions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmerDashBoard;
