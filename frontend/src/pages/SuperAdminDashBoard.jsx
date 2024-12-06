import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  DollarSign,
  ShoppingBag,
  AlertCircle,
  FileCheck,
  BarChart3,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllErrors,
  fetchAllUsers,
  getAllPaymentProofs,
  getMonthlyRevenue,
} from "@/store/slices/superAdminSlice";
import Spinner from "@/components/Spinner";
import PaymentProof from "@/components/PaymentProof";
import {
  deleteBiddingItem,
  getAllBiddingItems,
} from "@/store/slices/biddingSlice";
import { Link } from "react-router-dom";
import { logout } from "@/store/slices/userSlice";

const SuperAdminDashBoard = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const getActiveTab = () => localStorage.getItem("selectedTab") || "revenue";
  const [activeTab, setActiveTab] = useState(getActiveTab());
  const handleTabChange = (value) => {
    setActiveTab(value);
    localStorage.setItem("selectedTab", value);
  };
  const { loading, monthlyRevenue, totalFarmers, totalBidders, paymentProofs } =
    useSelector((state) => state.superAdmin);
  const { allBiddingItems } = useSelector((state) => state.bidding);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!localStorage.getItem("selectedTab") && isAuthenticated ){
      localStorage.setItem("selectedTab", "revenue");
      setActiveTab("revenue");
    }
    dispatch(getMonthlyRevenue());
    dispatch(fetchAllUsers());
    dispatch(getAllBiddingItems());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllErrors());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDelete = (id) => {
    dispatch(deleteBiddingItem(id));
  };

  let totalUsers = 0;
  for (let i = 0; i < totalBidders.length && i < totalFarmers.length; i++) {
    totalUsers += totalBidders[i] + totalFarmers[i];
  }

  const pendingproofs = paymentProofs.filter(
    (proof) => proof.status === "Pending"
  ).length;

  let totalRevenue = 0;
  monthlyRevenue.forEach((revenue) => {
    totalRevenue += revenue;
  });
  const monthName = (index) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[index];
  };
  const getRevenueData = () => {
    return monthlyRevenue.map((revenue, index) => ({
      month: monthName(index),
      revenue: revenue,
    }));
  };
  const getUserData = () => {
    return totalFarmers.map((farmers, index) => ({
      month: monthName(index),
      farmers: farmers,
      buyers: totalBidders[index] || 0,
      total: farmers + totalBidders[index] || 0,
    }));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold mb-6">Super Admin Dashboard</h1>
            <Button
              onClick={
                isAuthenticated ? handleLogout : () => navigate("/login")
              }
            >
              {isAuthenticated ? "Logout" : "Login"}
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="flex items-center p-4">
                <div className="p-2 bg-blue-100 rounded-full mr-4">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Revenue</p>
                  <p className="text-2xl font-bold">₹{totalRevenue}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <div className="p-2 bg-green-100 rounded-full mr-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <div className="p-2 bg-yellow-100 rounded-full mr-4">
                  <ShoppingBag className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Biddings</p>
                  <p className="text-2xl font-bold">{allBiddingItems.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center p-4">
                <div className="p-2 bg-red-100 rounded-full mr-4">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Verifications</p>
                  <p className="text-2xl font-bold">{pendingproofs}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="space-y-4"
          >
            <TabsList className="grid grid-cols-4 gap-4">
              <TabsTrigger value="revenue" className="flex items-center gap-2">
                <BarChart3 size={16} />
                Revenue Analytics
              </TabsTrigger>
              <TabsTrigger value="biddings" className="flex items-center gap-2">
                <ShoppingBag size={16} />
                Manage Biddings
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users size={16} />
                User Analytics
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <FileCheck size={16} />
                Payment Proofs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="revenue">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getRevenueData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#2563eb"
                          strokeWidth={2}
                          name="Revenue"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="biddings">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Bidding Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Starting Bid</TableHead>
                        <TableHead>Highest Bid</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allBiddingItems.map((bidding) => (
                        <TableRow key={bidding._id}>
                          <TableCell>
                            {
                              <img
                                src={bidding?.image?.url}
                                className="w-12 h-12 rounded object-cover"
                              />
                            }
                          </TableCell>
                          <TableCell>{bidding.title}</TableCell>
                          <TableCell>{bidding.startingBid}</TableCell>
                          <TableCell>{bidding.currentBid}</TableCell>
                          <TableCell className="flex gap-2">
                            <Link to={`/bidding/details/${bidding._id}`}>
                              <Button className="bg-blue-500 hover:bg-blue-700">
                                View
                              </Button>
                            </Link>
                            <Button
                              className="bg-red-500 hover:bg-red-700 transition-all duration-300"
                              onClick={() => handleDelete(bidding._id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Users Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getUserData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="farmers"
                          stroke="#16a34a"
                          name="Farmers"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="buyers"
                          stroke="#2563eb"
                          name="Buyers"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke="red"
                          name="Total Users"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 flex justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span>Farmers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span>Buyers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Total Users</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <PaymentProof />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default SuperAdminDashBoard;
