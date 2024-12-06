import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { postCommissionProof } from "../store/slices/commissionSlice";
import { Textarea } from "@/components/ui/textarea";

const SubmitCommission = () => {
  const [formFields, setFormFields] = useState({
    proof: "",
    amount: "",
    comment: "",
  });
  const handleInputChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };
  const proofHandler = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.files[0],
    });
  };
  const {user} = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.commission);
  const dispatch = useDispatch();
  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("proof", formFields.proof);
    formdata.append("amount", formFields.amount);
    formdata.append("comment", formFields.comment);
    dispatch(postCommissionProof(formdata));
  };

  return (
    <>
      <Card className="w-full flex flex-row px-2">
        <div className="w-[60%]">
          <CardHeader>
            <CardTitle>Upload Payment Proof</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePaymentProof} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={formFields.amount}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your Amount"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Upload Payment Proof</Label>
                  <Input
                    name="proof"
                    type="file"
                    accept="image/*"
                    onChange={proofHandler}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Comment</Label>
                  <Textarea
                    id="comment"
                    placeholder="Enter your Comment"
                    name="comment"
                    value={formFields.comment}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                {loading ? "Uploading..." : "Upload Payment Proof"}
              </Button>
            </form>
          </CardContent>
        </div>
        <div className="w-[40%]">
          <CardHeader>
            <CardTitle>Commission Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Current Commission Rate</h3>
                  <p className="text-2xl font-bold">1%</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Your Unpaid Commission</h3>
                  <p className="text-2xl font-bold">₹{user.unpaidCommission}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  );
};

export default SubmitCommission;
