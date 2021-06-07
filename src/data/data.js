const date = new Date();

const thisDay = date.getDate(), thisMonth = date.getMonth()+1, thisYear = date.getFullYear();
const tomorrow = thisDay + 1;

const afterDay = thisMonth + '-' + thisYear;

export const dateOptions = [
    {label: "Today", value: `${thisDay + '-' + afterDay}`},
    {label: "Tomorrow", value: `${tomorrow + '-' + afterDay}`}
]

export const defaultParams = {
    baseUrl: "https://cdn-api.co-vin.in/api/v2/",
    metadataBase: "admin/location/",
    metaDistrictBase: "districts/",
    appointmentBase: "appointment/sessions/public/findByDistrict"
}