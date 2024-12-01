import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ShoppingBag, History, Timer, Star } from 'lucide-react';

const BuyerDashBoard = () => {
  const [availableProducts] = useState([
    {
      id: 1,
      name: 'Organic Wheat',
      farmer: 'Ramesh Kumar',
      quantity: '50 quintals',
      currentBid: '₹2500',
      timeLeft: '2 days',
      totalBids: 8,
      type: 'yield',
      location: 'Punjab'
    },
    {
      id: 2,
      name: 'Rice Cultivation Contract',
      farmer: 'Suresh Patel',
      quantity: '100 quintals',
      currentBid: '₹3000',
      timeLeft: '5 days',
      totalBids: 3,
      type: 'contract',
      location: 'Gujarat'
    }
  ]);

  const [myBids] = useState([
    {
      id: 1,
      product: 'Organic Wheat',
      myBid: '₹2400',
      status: 'Outbid',
      highestBid: '₹2500'
    },
    {
      id: 2,
      product: 'Rice Contract',
      myBid: '₹3000',
      status: 'Winning',
      highestBid: '₹3000'
    }
  ]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 pt-5">Buyer Dashboard</h1>
      
      <Tabs defaultValue="marketplace" className="space-y-4">
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
          <Card>
            <CardHeader>
              <CardTitle>Available Products</CardTitle>
              <div className="flex gap-4 mt-4">
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
              <div className="space-y-4">
                {availableProducts.map(product => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <h3 className="font-medium text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-500">by {product.farmer}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${
                          product.type === 'yield' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {product.type === 'yield' ? 'Current Yield' : 'Contract'}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Quantity</p>
                        <p className="font-medium">{product.quantity}</p>
                        <p className="text-sm text-gray-500 mt-2">Location</p>
                        <p className="font-medium">{product.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Current Bid</p>
                        <p className="font-medium text-lg">{product.currentBid}</p>
                        <p className="text-sm text-gray-500 mt-2">Total Bids</p>
                        <p className="font-medium">{product.totalBids}</p>
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-orange-600">
                          <Timer size={16} />
                          <span>{product.timeLeft} left</span>
                        </div>
                        <div className="space-y-2">
                          <Button className="w-full">Place Bid</Button>
                          <Button variant="outline" className="w-full">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mybids">
          <Card>
            <CardHeader>
              <CardTitle>My Bidding History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myBids.map(bid => (
                  <div key={bid.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{bid.product}</h3>
                        <p className="text-sm text-gray-500">Your Bid: {bid.myBid}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Highest Bid: {bid.highestBid}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          bid.status === 'Winning' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {bid.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
                <p className="text-sm">Add items to track their prices and bidding status.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuyerDashBoard;