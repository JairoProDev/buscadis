// AdvertisementList.js
import React from 'react';
import Advertisement from '../Advertisement/Advertisement';

function AdvertisementList({ ads }) {
    return (
        <div>
            {ads.map((ad) => (
                <Advertisement key={ad._id} ad={ad} />
            ))}
        </div>
    );
}

export default AdvertisementList;