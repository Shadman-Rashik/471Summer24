import React, { useState, useEffect } from "react";
import Auctioncard from "./Auctioncard";
import NotificationModal from "../NotificationModal";
import Auctoinform from "./Auctoinform";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Payment from "../payment/Payment";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("user")////
    ? JSON.parse(localStorage.getItem("user")).email
    : "";

  const [data, setData] = useState([]);
  const [userHouses, setUserHouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
    }
    console.log(userEmail); // Add this line to log the userEmail

    const fetchData = async () => {
      try {
        console.log("Fetching data for user:", userEmail);
        const allAuctionsResponse = await axios.get(
          "http://localhost:3001/api/auctoin/getallauctoin"
        );
        setData(allAuctionsResponse.data);
  
        const userHousesResponse = await axios.get(
          `http://localhost:3001/api/auctoin/${userEmail}`
        );
        setUserHouses(userHousesResponse.data);
  
        const notificationsResponse = await axios.get(
          `http://localhost:3001/api/notifications/${userEmail}`
        );
        console.log("Notifications fetched:", notificationsResponse.data);
        setNotifications(notificationsResponse.data);
  
        if (notificationsResponse.data.length > 0) {
          console.log("Opening notification modal");
          setIsNotificationModalOpen(true);
        } else {
          console.log("No notifications found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [userEmail, navigate]);
  

  // const changeStatus = async (bidderId) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3001/api/auctoin/acceptbid",
  //       {
  //         bidderId,
  //         userEmail,
  //       }
  //     );
  //     if (response.status === 200) {
  //       alert("Bid accepted successfully!");
  //       ///////////////////////
        
  //       ////////////////////////////////////////

  //     } else {
  //       alert("Failed to accept the bid.");
  //     }
  //   } catch (error) {
  //     console.error("Error accepting the bid:", error);
  //     alert("An error occurred while accepting the bid.");
  //   }
  // };

  const handleSearch = () => {
    console.log(`Searching for: ${searchTerm}`);
  };

  const redirectToWhatsApp = () => {
    const phoneNumber = "+8801727260141";
    window.location.href = `https://wa.me/${phoneNumber}`;
  };

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  return (
    <>
      <div className="flex flex-row justify-between ml-5 mt-10 relative">
        <div className="absolute h-0.5 w-full bg-gray-800 bottom-0"></div>
        <p className="font-semibold md:text-2xl text-lg">On Going Auctions</p>
        <button
          className={`rounded shadow-sm text-white ${
            userHouses?.length === 0
              ? "bg-gray-800 hover:bg-gray-900"
              : "bg-red-700 hover:bg-red-900"
          } mr-4 mb-4`}
          onClick={toggleNotificationModal}
        >
          Show Notification
        </button>
        <button
          className="rounded-full mr-4 mb-4 fixed right-0 bottom-0 z-100000"
          onClick={redirectToWhatsApp}
        >
          Contact
        </button>
      </div>

      <div className="flex items-center mt-3 ml-5">
        <input
          type="text"
          className="px-3 py-2 border rounded-md mr-2"
          placeholder="Name of the House"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap mx-5 mt-10 gap-24 overflow-auto">
        {data
          ?.filter((item) => item.email !== userEmail)
          .map((item, index) => (
            <Auctioncard
              key={index}
              imagelink={item.image}
              houseName={item.houseName}
              details={`${item.modelYear} ${item.modelName}, ${item.details}`}
              startbid={item.startingPrice}
              id={item._id}
            />
          ))}
      </div>

      <div className="ml-5 font-semibold my-10 md:text-2xl text-xl relative">
        Auction Your House
        <div className="absolute h-0.5 w-full bg-gray-800 bottom-0"></div>
      </div>

      <div className="flex justify-center bg-gray-900 rounded-[50px] shadow-lg md:mx-0 mx-5">
        <Auctoinform />
      </div>

      <div className="ml-5 font-semibold my-10 md:text-2xl text-xl relative">
        My Auctions
        <div className="absolute h-0.5 w-full bg-gray-800 bottom-0"></div>
      </div>

      <div className="flex flex-wrap mx-5 mt-10 gap-24 overflow-auto">
        {userHouses?.map((item, index) => (
          <Auctioncard
            key={index}
            imagelink={item.image}
            houseName={item.houseName}
            details={`${item.modelYear} ${item.modelName}, ${item.details}`}
            startbid={item.startingPrice}
            placebid={false}
            id={item._id}
          />
        ))}
      </div>

      <div className="ml-5 font-semibold my-10 text-2xl relative">
         Bids
        <div className="absolute h-0.5 w-full bg-gray-800 bottom-0"></div>
      </div>
      <div className="flex flex-wrap mx-5 my-10 gap-24 overflow-auto">
        <table id="bookingTable" className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                ID
              </th>
              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                House Destination
              </th>
              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                Bidder's Email
              </th>
              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                Placed Bid
              </th>
              <th className="w-14 h-8 px-5 py-1.5 bg-white rounded shadow">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {userHouses?.map((house, index) =>
              house.bidders?.map((bidder, subIndex) => (
                <tr key={`${index}-${subIndex}`}>
                  <td className="pt-2">{index + 1}</td>
                  <td className="pt-2">{house.houseName}</td>
                  <td className="pt-2">{bidder.bidderEmail}</td>
                  <td className="pt-2">
                    <b>{bidder.bidAmount}</b>
                  </td>
                  <td className="pt-2 flex justify-center">
                    <button
                      onClick={() => <Payment
                      id = {bidder._id}
                      
                      />}
                      className="rounded shadow-sm bg-green-300 text-black"
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isNotificationModalOpen && (
        <NotificationModal
          isOpen={isNotificationModalOpen}
          notifications={notifications}
          onClose={toggleNotificationModal}
        />
      )}
    </>
  );
};

export default CustomerDashboard;
