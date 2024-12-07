import Spinner from "@/components/Spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  const joinedOn = new Date(user.createdAt).toDateString();
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Card className="w-full max-w-2xl mx-auto min-h-screen">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Your Profile for Krishi Bazar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-2">
                <img
                  src={user.profileImage?.url}
                  className="w-20 h-20 rounded-full mx-auto border-2 border-black "
                  alt={user.userName}
                />
                <div className="grid grid-cols-1 gap-2">
                  <div className="space-y-1 text-xl font-semibold underline ">
                    <h1>User Details</h1>
                  </div>
                  <div className="space-y-1">
                    <Label>Username</Label>
                    <Input value={user.userName} disabled type="text" />
                  </div>
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <Input value={user.email} disabled type="text" />
                  </div>
                  <div className="space-y-1">
                    <Label>Phone Number</Label>
                    <Input value={user.phoneNo} disabled type="number" />
                  </div>
                  <div className="space-y-1">
                    <Label>Address</Label>
                    <Input value={user.address} disabled type="text" />
                  </div>
                  <div className="space-y-1">
                    <Label>Joined On</Label>
                    <Input value={joinedOn} disabled type="text" />
                  </div>
                  <div className="space-y-1 text-xl font-semibold underline ">
                    <h1>
                      {user.role === "farmer"
                        ? "Payment Details"
                        : "Other Details"}
                    </h1>
                  </div>
                  {user.role === "farmer" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Account Number</Label>
                        <Input
                          value={
                            user.paymentMethods.bankTransfer.bankAccountNumber
                          }
                          disabled
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Account Name</Label>
                        <Input
                          value={
                            user.paymentMethods.bankTransfer.bankAccountName
                          }
                          disabled
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Bank Name</Label>
                        <Input
                          value={user.paymentMethods.bankTransfer.bankName}
                          disabled
                          type="text"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>RazorPay Id</Label>
                        <Input
                          value={user.paymentMethods.razorPay.razorPayId}
                          disabled
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Unpaid Commission</Label>
                        <Input value={user.unpaidCommission} disabled />
                      </div>
                    </div>
                  )}
                  {user.role === "buyer" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Biddings Won</Label>
                        <Input value={user.biddingsWon} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>Money Spent</Label>
                        <Input value={user.moneySpent} disabled />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default UserProfile;
