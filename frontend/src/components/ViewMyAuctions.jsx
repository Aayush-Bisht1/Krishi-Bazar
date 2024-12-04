import { getMyBiddingItems } from '@/store/slices/biddingSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ViewMyAuctions = () => {
    const navigate = useNavigate();
    const {isAuthenticated,user} = useSelector((state) => state.user);
    const {myBiddingItems,loading} = useSelector((state) => state.bidding);
    const dispatch = useDispatch();
    useEffect(() => {
        if(!isAuthenticated || user.role !== "farmer"){
            navigate("/login");
        }
        dispatch(getMyBiddingItems());
    },[dispatch,isAuthenticated,user,navigate]); 
  return (
    <>
    <Card>
            <CardHeader>
              <CardTitle>My Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myAuctions.map((auction) => (
                  <div key={auction.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{auction.product}</h3>
                        <p className="text-sm text-gray-500">
                          Current Bid: {auction.currentBid}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Total Bids: {auction.bids}</p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            auction.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {auction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> 
    </>
  )
}

export default ViewMyAuctions