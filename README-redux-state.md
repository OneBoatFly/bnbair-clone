# Redux State Shape
-- TO BE DELETED

```json
{
  session: {
    user: {
        id,
        username,
        email
    },
    spots: {
      1: {
        "id": 1,
        "ownerId": 1,
        "address": "123 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy",
        "description": "Place where web developers are created",
        "price": 123,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36",
        "avgRating": 4.5,
        "previewImage": "image url"
      },
      2: {
        "id": 2,
        "ownerId": 1,
        "address": "123 Disney Lane2",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy2",
        "description": "Place where web developers are created",
        "price": 123,
        "createdAt": "2021-11-19 20:39:36",
        "updatedAt": "2021-11-19 20:39:36",
        "avgRating": 4.5,
        "previewImage": "image url"
      }
    },
    reviews: {
      1: {
        "id": 1,
        "userId": 1,
        "spotId": 1,
        "review": "This was an awesome spot!",
        "stars": 5,
      },
      2: {
        "id": 2,
        "userId": 2,
        "spotId": 1,
        "review": "This was an awesome spot!",
        "stars": 5,
      }      
    },
    bookings: {
      1: {
        "id": 1,
        "spotId": 1,
        "userId": 2,
        "startDate": "2021-11-19",
        "endDate": "2021-11-20",
      }
      2: {
        "id": 2,
        "spotId": 1,
        "userId": 2,
        "startDate": "2024-11-19",
        "endDate": "2024-11-20",
      }      
    }
}
```