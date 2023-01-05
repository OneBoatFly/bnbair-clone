import MultiAddress from './MultiAddress';
import MultiRooms from './MultiRooms';
import MultiAmenities from './MultiAmenities';
import MultiImages from './MultiImages';
import MultiTitle from './MultiTitle';
import MultiDescription from './MultiDescription';
import MultiPrice from './MultiPrice';
import MultiPublish from './MultiPublish';

export const FormTitles = [
    'Confirm your address',
    'Share some basics about your place',
    "Tell guests what your place has to offer",
    'Add some photos of your house',
    "Now, let's give your house a title",
    'Create your description',
    'Now, set your price',
    'Yay! It’s time to publish.'
]

export const FormSubTitles = [
    'Your address is only shared with guests after they’ve made a reservation.',
    "You'll add more details later, like bed types.",
    "You can add more amenities after you publish your listing.",
    "You'll need 5 photos to get started. You can add more or make changes later.",
    "Short titles work best. Have fun with it—you can always change it later.",
    "Share what makes your place special.",
    "You can change it anytime.",
    "Here's what we'll show to guests. Before you publish, make sure to review the details."
]


export const progressBar = (page) => {
    try {
        return page / FormSubTitles.length;
    } catch {
        // console.log(e);
        return 0;
    }
}


export const PageDisplay = (page, apiKey, formData, setFormData) => {
    // console.log(apiKey, formData, setFormData)
    switch (page) {
        case 0: return <MultiAddress apiKey={apiKey} formData={formData} setFormData={setFormData} />
        case 1: return <MultiRooms />
        case 2: return <MultiAmenities />
        case 3: return <MultiImages />
        case 4: return <MultiTitle />
        case 5: return <MultiDescription />
        case 6: return <MultiPrice />
        case 7: return <MultiPublish />
        default: return null
    }
}

export const checkInput = (page) => {
    switch (page) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
        default: return null
    }
}