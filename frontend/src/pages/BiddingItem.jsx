import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const BiddingItem = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {loading,biddingItemBidders,biddingDetails} = useSelector((state) => state.bidding);
    const {isAuthenticated} = useSelector((state) => state.user);
    const [amount,setAmount] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        if(!isAuthenticated){
            navigate("/login");
        }
    },[isAuthenticated])
  return (

    <div></div>
  )
}

export default BiddingItem