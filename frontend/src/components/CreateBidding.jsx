import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import format from "date-fns/format"
const CreateBidding = () => {
  const [biddingForm, setBiddingForm] = useState({
    product: "",
    startPrice: "",
    minIncrement: "",
    condition: "",
    startTime: new Date(),
    endTime: new Date(),
    description: "",
  });
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = biddingForm.startTime - now;
    const endDifference = biddingForm.endTime - now;
    let timeLeft = {};
    if(startDifference > 0) {
        timeLeft = {
            type: "Satrts In",
            days: Math.floor(startDifference/(1000*60*60*24)),
            hours: Math.floor((startDifference/(1000*60*60))%24),
            mins: Math.floor((startDifference/(1000*60))%60),
            secs: Math.floor((startDifference/1000)%60),
        }
    }else if(endDifference > 0) {
        timeLeft = {
            type: "Ends In",
            days: Math.floor(endDifference/(1000*60*60*24)),
            hours: Math.floor((endDifference/(1000*60*60))%24),
            mins: Math.floor((endDifference/(1000*60))%60),
            secs: Math.floor((endDifference/1000)%60),
        }
    }
    return timeLeft;
  }
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
    });
    return () => clearTimeout(timer);
  },[timeLeft]);

  return (
    <>
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
                <Input type="number" placeholder="Enter minimum increment" />
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
                      onSelect={(date) =>
                        setBiddingForm((prev) => ({
                          ...prev,
                          startTime: date,
                        }))
                      }
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
                      onSelect={(date) =>
                        setBiddingForm((prev) => ({
                          ...prev,
                          endTime: date,
                        }))
                      }
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
    </>
  );
};

export default CreateBidding;
