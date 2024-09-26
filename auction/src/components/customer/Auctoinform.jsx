import React, { useState } from "react";
import axios from "axios";

const Auctoinform = () => {
  const [houseName, sethouseName] = useState("");
  const [HouseDest, setHouseDest] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [auctionStartTime, setAuctionStartTime] = useState("");
  const [auctionEndTime, setAuctionEndTime] = useState("");
  const [image, setImage] = useState("");
  const email = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).email
    : "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/auctoin/createauction",
        {
          houseName,
          email,
          modelName: HouseDest,
          modelYear,
          date,
          details,
          startingPrice,
          auctionStartTime,
          auctionEndTime,
          image, // Assuming this is a URL; if a file, adjust accordingly
        }
      );

      alert("Auction created successfully!");

      // Reset the form
      sethouseName("");
      setHouseDest("");
      setModelYear("");
      setDate("");
      setDetails("");
      setStartingPrice("");
      setAuctionStartTime("");
      setAuctionEndTime("");
      setImage("");
    } catch (err) {
      console.error("Error creating auction:", err);
      alert("Failed to create auction. Please try again.");
    }
  };

  return (
    <div>
      <form
        className="w-full max-w-lg my-10 md:px-0 px-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="houseName"
            >
              House Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="houseName"
              type="text"
              placeholder="..."
              value={houseName}
              onChange={(e) => sethouseName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="HouseDest"
            >
              House Destination
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="HouseDest"
              type="text"
              placeholder="..."
              value={HouseDest}
              onChange={(e) => setHouseDest(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="modelYear"
            >
              Construction Year
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="modelYear"
              type="text"
              placeholder="eg. 2015"
              value={modelYear}
              onChange={(e) => setModelYear(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-white font-bold mb-2"
              htmlFor="houseDetails"
            >
              House Details
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="houseDetails"
              type="text"
              placeholder="..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <p className="text-white text-xs italic">
              Explain the house best of your knowledge
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="startPrice"
            >
              Start Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="startPrice"
              type="text"
              placeholder="$"
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="auctionStartTime"
            >
              Auction Start Time
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="auctionStartTime"
              type="date"
              value={auctionStartTime}
              onChange={(e) => setAuctionStartTime(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="auctionEndTime"
            >
              Auction End Time
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="auctionEndTime"
              type="date"
              value={auctionEndTime}
              onChange={(e) => setAuctionEndTime(e.target.value)}
            />
          </div>
          <div className="w-full px-3 mt-2">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="house-image"
            >
              Image URL
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="house-image"
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <p className="text-gray-600 text-xs italic mt-2">
              Provide a URL for the image of the house.
            </p>
          </div>
        </div>

        <div className="flex md:justify-end justify-center">
          <button
            type="submit"
            className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auctoinform;
