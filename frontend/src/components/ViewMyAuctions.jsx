import { deleteBiddingItem, getMyBiddingItems, republishBiddingItem } from "@/store/slices/biddingSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TimeDisplay } from "@/pages/BiddingItem";
import Spinner from "./Spinner";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "lucide-react";

const ViewMyAuctions = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { myBiddingItems, loading } = useSelector((state) => state.bidding);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthenticated || user.role !== "farmer") {
      navigate("/login");
    }
    dispatch(getMyBiddingItems());
  }, [dispatch, isAuthenticated, user, navigate]);
  const handleDeleteBiddingItem = (id) => {
    dispatch(deleteBiddingItem(id));
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Auctions</CardTitle>
        </CardHeader>
        {loading ? (
          <Spinner />
        ) : (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              {myBiddingItems.length > 0 ? (
                myBiddingItems.map((item, id) => (
                  <div key={id} className="p-2 border rounded-lg">
                    <img
                      src={item.image?.url}
                      className="w-full aspect-[2/1] rounded-lg"
                    />
                    <div className="flex justify-between items-center mt-2 space-y-1">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                          Starting Bid: {item.startingBid}
                        </p>
                        <p className="text-sm text-gray-500">
                          Current Bid: {item.currentBid}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm">
                          Total Bids: {item.bids.length}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            new Date(item.endTime) < Date.now()
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          <TimeDisplay
                            startTime={item.startTime}
                            endTime={item.endTime}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 mt-2">
                      <Button
                        className="bg-stone-700 transition-all duration-300 hover:bg-black"
                        onClick={() => navigate(`/bidding/details/${item._id}`)}
                      >
                        View Bidding
                      </Button>
                      <Button
                        className="bg-red-400 transition-all duration-300 hover:bg-red-500"
                        onClick={() => handleDeleteBiddingItem(item._id)}
                      >
                        Delete Bidding
                      </Button>
                      <Button
                        className="bg-sky-400 transition-all duration-300 hover:bg-sky-600"
                        disabled={new Date(item.endTime) > Date.now()}
                        onClick={() => setOpenDrawer(true)}
                      >
                        Republish Item
                      </Button>
                    </div>
                    <Drawer
                      id={item._id}
                      openDrawer={openDrawer}
                      setOpenDrawer={setOpenDrawer}
                    />
                  </div>
                ))
              ) : (
                <h3 className="text-[#666] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl mt-5">
                  You have not posted any Bidding Item.
                </h3>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default ViewMyAuctions;

const Drawer = ({ openDrawer, setOpenDrawer, id }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.bidding);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const handleRepublish = () => {
    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(republishBiddingItem(id, formData));
  };

  return (
    <section
      className={`fixed ${
        openDrawer && id ? "bottom-0" : "-bottom-full"
      }  left-0 w-full transition-all duration-300 h-full bg-[#00000087] flex items-end`}
    >
      <div className="bg-white h-fit transition-all duration-300 w-full">
        <div className="w-full px-5 py-8 sm:max-w-[640px] sm:m-auto">
          <h3 className="text-[#D6482B]  text-3xl font-semibold text-center mb-1">
            Republish Auction
          </h3>
          <p className="text-stone-600">
            Let's republish auction with same details but new starting and
            ending time.
          </p>
          <form className="flex flex-col gap-5 my-5">
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-stone-600">
                Republish Item Start Time
              </label>
              <div className="flex items-center pb-2 border-b-[1px] border-b-stone-500 ">
                <CalendarIcon className="mr-2 h-4 w-4 " />
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat={"MMMM d, yyyy h,mm aa"}
                  className="text-[14px] bg-transparent focus:outline-none w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-stone-600">
                Republish Item End Time
              </label>
              <div className="flex items-center pb-2 border-b-[1px] border-b-stone-500 ">
                <CalendarIcon className="mr-2 h-4 w-4 " />
                <DatePicker
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat={"MMMM d, yyyy h,mm aa"}
                  className="text-[14px] bg-transparent focus:outline-none w-full"
                />
              </div>
            </div>
            <div>
              <button
                type="button"
                className="bg-blue-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-blue-700"
                onClick={handleRepublish}
              >
                {loading ? "Republishing" : "Republish"}
              </button>
            </div>
            <div>
              <button
                type="button"
                className="bg-yellow-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-yellow-700"
                onClick={() => setOpenDrawer(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
