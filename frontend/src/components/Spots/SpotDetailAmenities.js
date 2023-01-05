import React, { useEffect, useState } from 'react'

export default function SpotDetailAmenities({ spot }) {
    const [amenities, setAmenities] = useState([]);

    useEffect(() => {
        if (!spot) return;

        const spotAmenityBasic = Object.keys(spot.AmenityBasic);
        const spotAmenityBasicBoo = Object.values(spot.AmenityBasic);
        

    }, [spot])

  return (
    <div>SpotDetailAmenities</div>
  )
}
