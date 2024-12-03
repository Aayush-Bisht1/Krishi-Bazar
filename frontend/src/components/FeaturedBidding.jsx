import { Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TimeDisplay = ({ timeLeft }) => {
  if (!timeLeft || Object.keys(timeLeft).length <= 1) {
    return (
      <div className="flex items-center gap-2 text-red-600 font-medium">
        <Timer size={16} />
        <span>Time's up!</span>
      </div>
    );
  }

  const formatTime = (time) => String(time).padStart(2, "0");
  const { type, days, hours, mins, secs } = timeLeft;

  return (
    <div className="flex items-center gap-2 text-orange-600 font-medium">
      <Timer size={16} />
      <span>{type}</span>
      <span>
        ({days}d {formatTime(hours)}:{formatTime(mins)}:{formatTime(secs)})
      </span>
    </div>
  );
};
const FeaturedBidding = ({
  imgsrc,
  title,
  type,
  startingBid,
  quantity,
  location,
  startTime,
  endTime,
  id,
}) => {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const start = new Date(startTime);
      const end = new Date(endTime);
      const startDiff = start - now;
      const endDiff = end - now;

      if (startDiff > 0) {
        return {
          type: "Starts In",
          days: Math.floor(startDiff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((startDiff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((startDiff / 1000 / 60) % 60),
          secs: Math.floor((startDiff / 1000) % 60),
        };
      }

      if (endDiff > 0) {
        return {
          type: "Ends In",
          days: Math.floor(endDiff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((endDiff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((endDiff / 1000 / 60) % 60),
          secs: Math.floor((endDiff / 1000) % 60),
        };
      }

      return {};
    };

    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, [startTime, endTime]);

  return (
    <>
      <Card>
        <Link to={`/bidding/item/${id}`}>
          <CardContent className="p-2 mx-auto flex flex-col gap-2">
            <div className="flex-1">
              <img src={imgsrc} alt={title} className="w-full aspect-[2/1] rounded-lg" />
            </div>
            <div className="flex-1 flex-col gap-1 p-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      type === "yield"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {type === "yield" ? "Current Yield" : "Contract"}
                  </span>
                </div>
                <TimeDisplay timeLeft={timeLeft} />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="text-lg font-medium">{quantity}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Starting Bid</p>
                  <p className="text-lg font-medium">{startingBid}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-lg font-medium">{location}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    </>
  );
};

export default FeaturedBidding;
