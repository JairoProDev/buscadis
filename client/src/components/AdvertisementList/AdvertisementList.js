// AdvertisementList.js
import React from "react";
import Advertisement from "../Advertisement/Advertisement";

function AdvertisementList({ ads }) {
  return (
    <div className="ad-column">
      <ul id="ad-list">
        {ads.map((ad) => (
          <Advertisement key={ad._id} ad={ad} />
        ))}
      </ul>
    </div>
  );
}

export default AdvertisementList;
