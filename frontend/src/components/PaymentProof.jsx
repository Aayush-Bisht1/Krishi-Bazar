import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePaymentProof,
  getSinglePaymentProof,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PaymentProof = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(singlePaymentProof?.amount || "");
  const [status, setStatus] = useState(singlePaymentProof?.status || "");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProof(id));
    setOpen(true);
  };
  const handlePaymentProofUpdate = (id) => {
    setIsLoading(true);
    dispatch(updatePaymentProof(id, status, amount));
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Payment Proof Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>USER ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentProofs.length > 0 ? (
                paymentProofs.map((element, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{element.userId}</TableCell>
                      <TableCell>{element.amount}</TableCell>
                      <TableCell>{element.status}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          className="bg-blue-500 hover:bg-blue-700"
                          onClick={() => handleFetchPaymentDetail(element._id)}
                        >
                          Update
                        </Button>
                        <Button
                          className="bg-red-500 hover:bg-red-700 transition-all duration-300"
                          onClick={() => handlePaymentProofDelete(element._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className="text-center text-xl text-sky-600 py-3">
                  <TableCell>No payment proofs are found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="top" className="h-[90vh]">
          <SheetHeader>
            <SheetTitle className="text-[#D6482B] text-3xl font-semibold text-center">
              Update Payment Proof
            </SheetTitle>
          </SheetHeader>
          <div className="p-4 max-w-[640px] mx-auto">
            <div className="space-y-4">
              <div>
                <Label>User ID</Label>
                <Input value={singlePaymentProof?.userId || ""} disabled />
              </div>
              <div>
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  defaultValue={singlePaymentProof?.amount}
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={status}
                  onValueChange={setStatus}
                  defaultValue={singlePaymentProof?.status}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Settled">Settled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Comment</Label>
                <Textarea value={singlePaymentProof?.comment || ""} disabled />
              </div>

              <Link
                to={singlePaymentProof?.proof?.url || ""}
                className="bg-[#D6482B] block text-center py-2 rounded-md text-white font-semibold"
                target="_blank"
              >
                Payment Proof (SS)
              </Link>

              <Button
                className="w-full bg-blue-500 hover:bg-blue-700"
                onClick={handlePaymentProofUpdate}
              >
                {isLoading ? "Updating Payment Proof" : "Update Payment Proof"}
              </Button>

              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-700"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default PaymentProof;
