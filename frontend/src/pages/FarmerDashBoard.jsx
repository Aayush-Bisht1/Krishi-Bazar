import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Package, Gavel, DollarSign, List } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import SubmitCommission from "@/components/SubmitCommission";
import CreateBidding from "@/components/MarketPlace";
const FarmerDashBoard = () => {
  const [productForm, setProductForm] = useState({
    name: "",
    quantity: "",
    unit: "",
    price: "",
    description: "",
    type: "yield", // or 'contract'
  });

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
  }

  return (
    <div className="p-4 max-w-6xl mx-auto ">
      <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold mb-6 pt-5">Farmer Dashboard</h1>
      <Button onClick={isAuthenticated? handleLogout : () => navigate('/login')}>
        {isAuthenticated ? "Logout" : "Login"}</Button>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package size={16} />
            List Products
          </TabsTrigger>
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

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle size={20} />
                Add New Product or Contract
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Listing Type</Label>
                    <Select defaultValue="yield">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yield">Current Yield</SelectItem>
                        <SelectItem value="contract">
                          Farming Contract
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input type="number" placeholder="Enter quantity" />
                  </div>
                  <div className="space-y-2">
                    <Label>Unit</Label>
                    <Select defaultValue="quintal">
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quintal">Quintal</SelectItem>
                        <SelectItem value="kg">Kilogram</SelectItem>
                        <SelectItem value="ton">Ton</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 flex items-center gap-2 justify-center">
                    <Label htmlFor="picture">Pictures</Label>
                    <Input id="picture" type="file" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter product details, quality specifications, etc." />
                </div>
                <Button className="w-full">List Product</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bidding">
          <CreateBidding/>
        </TabsContent>

        <TabsContent value="commission">
          <SubmitCommission/>
        </TabsContent>

        <TabsContent value="auctions">
          <Card>
            <CardHeader>
              <CardTitle>My Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myAuctions.map((auction) => (
                  <div key={auction.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{auction.product}</h3>
                        <p className="text-sm text-gray-500">
                          Current Bid: {auction.currentBid}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Total Bids: {auction.bids}</p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            auction.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {auction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmerDashBoard;
