// change this to a table

const AMENITIES = {
  wifi: 'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2Fwifi.png?alt=media&token=94821998-9010-4170-8f9a-016edc6f4197',
  tv: 'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2Ftv.png?alt=media&token=1c8eef7a-bdc3-4944-9ae3-db0c7b570718',
  kitchen:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2Fkitchen.png?alt=media&token=3dcbdf79-9519-4ca8-9625-0b4596d59f88',
  washer:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2Fwasher.png?alt=media&token=8db7fe2f-60fb-4185-a7a3-988066bd0485',
  freeParking:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FfreeParking.png?alt=media&token=3fe07769-3f26-4d97-9fa5-e6d8d85d5851',
  paidParking:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FpaidParking.png?alt=media&token=330c54bd-2812-4d3b-bae6-c86011ed0e7a',
  airConditioning:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FairCondintioning.png?alt=media&token=4bf27825-86ce-44e1-9ab1-62f7e63d7941',
  dedicatedWorkspace:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FdedicatedWorkspace.png?alt=media&token=a710a033-a08b-4f6d-9343-cb0e4cdc1c32',
  pool: 'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2Fpool.png?alt=media&token=779ca57e-7b8e-4e12-8647-9b685798e44e',
  hotTub:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FhotTub.png?alt=media&token=32716573-2366-47f0-9d87-86c0a71128f9',
  patio:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2Fpatio.png?alt=media&token=e2140cac-d9eb-41ed-bbed-a91614a680c4',
  bbqGrill:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FbbqGrill.png?alt=media&token=9fe7db9e-1e3f-4bc7-a7d3-66b81485f5ba',
  outdoorDining:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FoutdoorDining.png?alt=media&token=cfd8b24c-a279-4e7f-87f2-60e54bc5f2ff',
  Firepit:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2Ffirepit.png?alt=media&token=a1cce5ab-e8a7-4972-99e9-82a27ef059ca',
  poolTable:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FpoolTable.png?alt=media&token=751e2e67-bb45-4986-bac9-3cb827f69f8e',
  indoorFireplace:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FindoorFireplace.png?alt=media&token=af2b8a95-dcfa-41d7-9ce9-cec0f1bbeccb',
  piano:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2Fpiano.png?alt=media&token=33c60a3a-8d24-4e6a-9943-48cd9f39c22d',
  exerciseEquipment:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FexerciseEquipment.png?alt=media&token=26369930-6fa2-4090-8e06-d605ccf58a8a',
  lakeAccess:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FlakeAccess.png?alt=media&token=74e71666-454e-454e-b2ab-541877fe96d5',
  beachAccess:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FbeachAccess.png?alt=media&token=e75454e1-1282-405f-9c33-b6303b4dfafb',
  skiInOut:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FskiInOut.png?alt=media&token=a2928b66-735d-461b-87aa-6c3a2b034b82',
  outdoorShow:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FoutdoorShower.png?alt=media&token=0e067627-995c-4d43-89c9-67819b59d13a',
  smokeAlarm:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FsmokeAlarm.png?alt=media&token=a0a04a69-0ac9-4d0b-a606-9d0eea5016f0',
  firstAid:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FfirstAid.png?alt=media&token=7a16215b-1a37-4c99-8103-389862e6c78b',
  fireExtinguisher:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FfireExtinguisher.png?alt=media&token=8a86daed-f57b-4db1-a4d4-8bec643a74c9',
  bedroomDoorLock:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2FbedroomDoorLock.png?alt=media&token=c59df0ba-971f-473a-ba5b-e784ec9c3881',
  co2Alarm:
    'https://firebasestorage.googleapis.com/v0/b/bnbair.appspot.com/o/anemities%2Fco2Alarm.png?alt=media&token=b12c6b7a-de8c-4e9e-8eb3-c9ae64f5b964',
};

const AMENITY_TYPES = {
  wifi: 'Wifi',
  tv: 'TV',
  kitchen: 'Kitchen',
  washer: 'Washer',
  freeParking: 'Free parking on premises',
  paidParking: 'Paid parking on premises',
  airConditioning: 'Air conditioning',
  dedicatedWorkspace: 'Dedicated workspace',
  pool: 'Pool',
  hotTub: 'Hot tub',
  patio: 'Patio',
  bbqGrill: 'BBQ grill',
  outdoorDining: 'Outdoor dining area',
  Firepit: 'Fire pit',
  poolTable: 'Pool table',
  indoorFireplace: 'Indoor fireplace',
  piano: 'Piano',
  exerciseEquipment: 'Exercise equipment',
  lakeAccess: 'Lake access',
  beachAccess: 'Beach access',
  skiInOut: 'Ski-in/Ski-out',
  outdoorShow: 'Outdoor shower',
  smokeAlarm: 'Smoke alarm',
  firstAid: 'First aid kit',
  fireExtinguisher: 'Fire extinguisher',
  bedroomDoorLock: 'Lock on bedroom door',
  co2Alarm: 'Carbon monoxide alarm',
};

const AMENITIES_CLASSIFICATION = {
  basic: 7,
  standout: 21,
};

module.exports = {
  AMENITIES,
  AMENITY_TYPES,
  AMENITIES_CLASSIFICATION,
};
