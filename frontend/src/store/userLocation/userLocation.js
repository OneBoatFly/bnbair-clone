// this needs to be refactored. Might be able to delete this part since App.js is getting geodata already.
export const getLocationPromise = new Promise((resolve, reject) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude
            const lng = position.coords.longitude

            resolve({lat, lng})
        })

    } else {
        reject('No geolocation data.')
    }
})