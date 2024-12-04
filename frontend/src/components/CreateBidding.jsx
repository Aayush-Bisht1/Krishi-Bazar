import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import { useDispatch, useSelector } from "react-redux";
import { createBiddingItem } from "@/store/slices/biddingSlice";
const CreateBidding = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [biddingForm, setBiddingForm] = useState({
    title: "",
    quantity: "",
    category: "",
    unit: "",
    image: "",
    location: "",
    type: "",
    startingBid: "",
    condition: "",
    startTime: new Date(),
    endTime: new Date(),
    description: "",
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBiddingForm((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(reader.result);
    };
  };
  const { loading } = useSelector((state) => state.bidding);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", biddingForm.image);
    formData.append("title", biddingForm.title);
    formData.append("description", biddingForm.description);
    formData.append("category", biddingForm.category);
    formData.append("type", biddingForm.type);
    formData.append("condition", biddingForm.condition);
    formData.append("startingBid", biddingForm.startingBid);
    formData.append("startTime", biddingForm.startTime);
    formData.append("endTime", biddingForm.endTime);
    formData.append("location", biddingForm.location);
    formData.append("quantity", biddingForm.quantity);
    formData.append("unit", biddingForm.unit);
    dispatch(createBiddingItem(formData));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create New Bidding</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Product Type</Label>
                <Select
                  value={biddingForm.type}
                  onValueChange={(value) =>
                    setBiddingForm({ ...biddingForm, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yielditem">
                      Current Yield/Item
                    </SelectItem>
                    <SelectItem value="contract">Farming Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input
                  placeholder="Enter product name"
                  value={biddingForm.title}
                  onChange={(e) =>
                    setBiddingForm({ ...biddingForm, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  value={biddingForm.quantity}
                  onChange={(e) =>
                    setBiddingForm({ ...biddingForm, quantity: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Select
                  value={biddingForm.unit}
                  onValueChange={(value) =>
                    setBiddingForm({ ...biddingForm, unit: value })
                  }
                >
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
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  type="text"
                  placeholder="Enter location"
                  value={biddingForm.location}
                  onChange={(e) =>
                    setBiddingForm({ ...biddingForm, location: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Starting Bid (₹)</Label>
                <Input
                  type="number"
                  placeholder="Enter starting price"
                  onChange={(e) =>
                    setBiddingForm({
                      ...biddingForm,
                      startingBid: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Condition of Product</Label>
                <Select
                  value={biddingForm.condition}
                  onValueChange={(value) =>
                    setBiddingForm({
                      ...biddingForm,
                      condition: value,
                    })
                  }
                >
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
              <div className="space-y-2">
                <Label>Category of Product</Label>
                <Select
                  value={biddingForm.category}
                  onValueChange={(value) =>
                    setBiddingForm({
                      ...biddingForm,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grains">Grains</SelectItem>
                    <SelectItem value="rootstubers">
                      Roots and Tubers
                    </SelectItem>
                    <SelectItem value="legumes">Legumes</SelectItem>
                    <SelectItem value="others">Other Staple Foods</SelectItem>
                    <SelectItem value="equipment">Farming Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 flex items-center gap-4 ">
                <Label>Start Time</Label>
                <div className="flex items-center pb-2 border-b-[1px] border-b-stone-500 ">
                  <CalendarIcon className="mr-2 h-4 w-4 " />
                  <DatePicker
                    selected={biddingForm.startTime}
                    onChange={(date) =>
                      setBiddingForm((prev) => ({
                        ...prev,
                        startTime: date,
                      }))
                    }
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat={"MMMM d, yyyy h,mm aa"}
                    className="text-[14px] bg-transparent focus:outline-none w-full"
                  />
                </div>
              </div>
              <div className="space-y-2 flex items-center gap-4">
                <Label>End Time</Label>
                <div className="flex items-center pb-2 border-b-[1px] border-b-stone-500 ">
                  <CalendarIcon className="mr-2 h-4 w-4 " />
                  <DatePicker
                    selected={biddingForm.endTime}
                    onChange={(date) =>
                      setBiddingForm((prev) => ({
                        ...prev,
                        endTime: date,
                      }))
                    }
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat={"MMMM d, yyyy h,mm aa"}
                    className="text-[14px] bg-transparent focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Enter product details, quality specifications, etc."
                value={biddingForm.description}
                onChange={(e) =>
                  setBiddingForm({
                    ...biddingForm,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2 flex flex-col justify-center">
              <Label>Image</Label>

              <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt={biddingForm.title}
                        className="w-44 h-auto"
                      />
                    ) : (
                      <>
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                      </>
                    )}
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    onChange={imageHandler}
                  />
                </label>
              </div>
            </div>
            <Button className="w-full" type="submit">
              {
                loading ? "Creating Bidding ..." : "Create Bidding"
              }
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateBidding;
