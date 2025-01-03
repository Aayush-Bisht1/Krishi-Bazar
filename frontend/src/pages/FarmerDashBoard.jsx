import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Gavel, DollarSign, List } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import SubmitCommission from "@/components/SubmitCommission";
import CreateBidding from "@/components/CreateBidding";
import ViewMyAuctions from "@/components/ViewMyAuctions";
import Spinner from "@/components/Spinner";
import { useNavigate } from "react-router-dom";
const FarmerDashBoard = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("selectedTab") && isAuthenticated) {
      localStorage.setItem("selectedTab", "bidding");
      setActiveTab("bidding");
    }
  }, [isAuthenticated]);
  const getStoredTab = () => localStorage.getItem("selectedTab") || "bidding";
  const [activeTab, setActiveTab] = useState(getStoredTab());
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("selectedTab");
  };
  const handleTabChange = (value) => {
    setActiveTab(value);
    localStorage.setItem("selectedTab", value);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-4 max-w-6xl mx-auto ">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold mb-6 pt-5">Farmer Dashboard</h1>
            <div className="flex gap-2">
              <Button
                onClick={
                  isAuthenticated
                    ? () => navigate("/profile")
                    : () => navigate("/login")
                }
                className="bg-blue-500 hover:bg-blue-600"
              >
                {isAuthenticated ? "Profile" : "Login"}
              </Button>
              <Button
                onClick={
                  isAuthenticated ? handleLogout : () => navigate("/login")
                }
                className="bg-red-500 hover:bg-red-600"
              >
                {isAuthenticated ? "Logout" : "Login"}
              </Button>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="space-y-4"
          >
            <TabsList className="grid grid-cols-3 gap-4">
              <TabsTrigger value="bidding" className="flex items-center gap-2">
                <Gavel size={16} />
                Create Bidding
              </TabsTrigger>
              <TabsTrigger
                value="commission"
                className="flex items-center gap-2"
              >
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
              <SubmitCommission />
            </TabsContent>

            <TabsContent value="auctions">
              <ViewMyAuctions />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default FarmerDashBoard;
