import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Check,
  Trash2,
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

const SuperAdminDashBoard = () => {
  const getActiveTab = () => localStorage.getItem("selectedTab") || "revenue";
  const [activeTab, setActiveTab] = useState(getActiveTab());
  const handleTabChange = (value) => {
    setActiveTab(value);
    localStorage.setItem("selectedTab", value);
  };
  const { loading, monthlyRevenue, totalFarmers, totalBidders, paymentProofs } =
    useSelector((state) => state.superAdmin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(fetchAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllErrors());
  }, [dispatch]);

  const [biddings] = useState([
    {
      id: 1,
      product: "Organic Wheat",
      farmer: "Ramesh Kumar",
      buyer: "AgroTech Ltd",
      amount: "₹250,000",
      status: "Pending",
      proofStatus: "Unverified",
    },
    {
      id: 2,
      product: "Rice Contract",
      farmer: "Suresh Patel",
      buyer: "FoodCorp Inc",
      amount: "₹300,000",
      status: "Completed",
      proofStatus: "Verified",
    },
  ]);

  const [users] = useState([
    {
      id: 1,
      name: "Ramesh Kumar",
      role: "Farmer",
      joinDate: "2024-01-15",
      status: "Active",
      transactions: 12,
    },
    {
      id: 2,
      name: "AgroTech Ltd",
      role: "Buyer",
      joinDate: "2024-02-01",
      status: "Active",
      transactions: 8,
    },
  ]);

  const [payments] = useState([
    {
      id: 1,
      transactionId: "TXN123456",
      amount: "₹250,000",
      date: "2024-03-15",
      status: "Verified",
      proofDocument: "payment_proof_123.pdf",
    },
    {
      id: 2,
      transactionId: "TXN123457",
      amount: "₹300,000",
      date: "2024-03-16",
      status: "Pending",
      proofDocument: "payment_proof_124.pdf",
    },
  ]);
  let totalUsers = 0;
  for (let i = 0; i < totalBidders.length && i < totalFarmers.length; i++) {
    totalUsers += totalBidders[i] + totalFarmers[i];
  }
  const pendingproofs = paymentProofs.filter(
    (proof) => proof.status === "Pending"
  ).length;
  const totalRevenue = monthlyRevenue.reduce(
    (acc, curr) => acc + curr.revenue,
    0
  );
  const monthName = (index) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[index];
  }
  const getUserData = () => {
    return totalFarmers.map((farmers, index) => ({
      month: monthName(index),
      farmers: farmers,
      buyers: totalBidders[index] || 0,
    }));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-4 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Super Admin Dashboard</h1>

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
                  <p className="text-2xl font-bold">45</p>
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
                      <LineChart data={monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#2563eb"
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
                  <CardTitle>Manage Biddings</CardTitle>
                  <div className="mt-4">
                    <Input placeholder="Search biddings..." />
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Farmer</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Proof Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {biddings.map((bidding) => (
                        <TableRow key={bidding.id}>
                          <TableCell>{bidding.product}</TableCell>
                          <TableCell>{bidding.farmer}</TableCell>
                          <TableCell>{bidding.buyer}</TableCell>
                          <TableCell>{bidding.amount}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs ${
                                bidding.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {bidding.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs ${
                                bidding.proofStatus === "Verified"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {bidding.proofStatus}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <PaymentProof/>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default SuperAdminDashBoard;

