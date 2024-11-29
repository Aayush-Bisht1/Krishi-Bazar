import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
const FarmerDashBoard = () => {
  const [productForm, setProductForm] = useState({
    name: "",
    quantity: "",
    unit: "",
    price: "",
    description: "",
    type: "yield", // or 'contract'
  });

  const [biddingForm, setBiddingForm] = useState({
    product: "",
    startPrice: "",
    minIncrement: "",
    condition: "",
    startTime: new Date(),
    endTime: new Date(),
    description: "",
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

  return (
    <div className="p-4 max-w-6xl mx-auto ">
      <h1 className="text-3xl font-bold mb-6 pt-5">Farmer Dashboard</h1>

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
            Commission
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
          <Card>
            <CardHeader>
              <CardTitle>Create New Bidding</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Select Product</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheat">Organic Wheat</SelectItem>
                        <SelectItem value="rice">Rice Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Starting Price (₹)</Label>
                    <Input type="number" placeholder="Enter starting price" />
                  </div>
                  <div className="space-y-2">
                    <Label>Minimum Bid Increment (₹)</Label>
                    <Input
                      type="number"
                      placeholder="Enter minimum increment"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Condition of Product</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 flex items-center gap-4">
                    <Label>Start Time</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !biddingForm.startTime && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {biddingForm.startTime ? (
                            format(biddingForm.startTime, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={biddingForm.startTime}
                          onSelect={(date)=> setBiddingForm((prev)=>({
                            ...prev,
                            startTime: date
                          }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2 flex items-center gap-4">
                    <Label>End Time</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !biddingForm.endTime && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {biddingForm.endTime ? (
                            format(biddingForm.endTime, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={biddingForm.endTime}
                          onSelect={(date) => setBiddingForm((prev) => ({
                            ...prev,
                            endTime: date
                          })) }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Additional Details</Label>
                  <Textarea placeholder="Enter any additional details for bidders" />
                </div>
                <Button className="w-full">Create Bidding</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission">
          <Card>
            <CardHeader>
              <CardTitle>Commission Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">
                      Current Commission Rate
                    </h3>
                    <p className="text-2xl font-bold">2.5%</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Total Commission Paid</h3>
                    <p className="text-2xl font-bold">₹12,500</p>
                  </div>
                </div>
                <Button className="w-full">View Commission History</Button>
              </div>
            </CardContent>
          </Card>
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
