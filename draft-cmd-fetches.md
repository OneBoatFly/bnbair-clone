npm install cookie-parser cors csurf dotenv express express-async-errors helmet jsonwebtoken morgan per-env sequelize@6 sequelize-cli@6

npm install -D sqlite3 dotenv-cli nodemon

npx sequelize migration:generate --name add-names-col-user

npx sequelize-cli seed:generate --name demo-booking

git push heroku main
heroku run npm run sequelize db:migrate
heroku run npm run sequelize db:seed:all


**Spots Table Model and Migration**
npx sequelize model:generate --name Spot --attributes ownerId:integer,address:string,city:string,state:string,country:string,lat:decimal,lng:decimal,name:string,description:string,price:decimal

**SpotImages Table Model and Migration**
npx sequelize model:generate --name SpotImage --attributes spotId:integer,url:string,preview:boolean

**Bookings Table Model and Migration**
npx sequelize model:generate --name Booking --attributes spotId:integer,userId:integer,stateDate:date,endDate:date
  *validation* added for start date and end date
  *scope* guestView

**Reviews Table Model and Migration**
npx sequelize model:generate --name Review --attributes spotId:integer,userId:integer,review:string,stars:integer

**ReviewImages Table Model and Migration**
npx sequelize model:generate --name ReviewImage --attributes reviewId:integer,url:string

**figure out unique**
*Spot* 
address, city, state and country -- no repeat address -- added

*SpotImage*
spotId, url -- no repeat image for the spot -- added

*Review*
spotId and userId -- no repeat reviews -- added

*ReviewImage*
reviewId and url -- no repeat image for the spot -- added

**figure out cascade**
spots will be deleted if the user is deleted
spot images will be deleted if the spot is deleted
bookings and reviews will be deleted if either user or spot is deleted
review images will be deleted if the review is deleted


npx dotenv sequelize db:migrate

npx dotenv sequelize db:migrate:undo

`login:`
fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({ credential: 'DemoUser1', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));

`create a review:`
fetch('/api/spots/5/reviews', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({
    "review": "This was an awesome spot!",
    "stars": 5
  })
}).then(res => res.json()).then(data => console.log(data));

INSERT INTO `Reviews` (`id`,`spotId`,`userId`,`review`,`stars`) VALUES (NULL,5,11,"This was an awesome spot!",5);

*** FRONT END ***

`check proxy`
fetch('/api/csrf/restore').then(res => res.json()).then(data => console.log(data))

`test login`
store.dispatch(sessionActions.login({credential:"DemoUser1", password:"password"}))