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
    "Now, let's give your house a title",
    'Create your description',
    'Now, set your price',
    'Add some photos of your house',
    // 'Yay! It’s time to publish.'
]

export const FormSubTitles = [
    'Your address is only shared with guests after they’ve made a reservation.',
    "You'll add more details later, like bed types.",
    "You can add more amenities after you publish your listing.",
    "Short titles work best. Have fun with it—you can always change it later.",
    "Share what makes your place special.",
    "You can change it anytime.",
    "You'll need 5 photos to get started. You can add more or make changes later.",
    // "Here's what we'll show to guests. Before you publish, make sure to review the details."
]


export const progressBar = (page) => {
    try {
        return page / FormSubTitles.length;
    } catch {
        // console.log(e);
        return 0;
    }
}


export const PageDisplay = (page, formData, setFormData, hasSubmitted, allErrors, imageUpload, setImageUpload) => {
    // console.log(apiKey, formData, setFormData)
    // 
    switch (page) {
        case 0: return <MultiAddress formData={formData} setFormData={setFormData} hasSubmitted={hasSubmitted} addressErrors={allErrors.addressErrors} setAddressErrors={allErrors.setAddressErrors} geoError={allErrors.geoError} setGeoError={allErrors.setGeoError} />
        case 1: return <MultiRooms formData={formData} setFormData={setFormData} />
        case 2: return <MultiAmenities formData={formData} setFormData={setFormData} />
        case 3: return <MultiTitle formData={formData} setFormData={setFormData} hasSubmitted={hasSubmitted} titleErrors={allErrors.titleErrors} setTitleErrors={allErrors.setTitleErrors} />
        case 4: return <MultiDescription formData={formData} setFormData={setFormData} hasSubmitted={hasSubmitted} descriptionErrors={allErrors.descriptionErrors} setDescriptionErrors={allErrors.setDescriptionErrors} />
        case 5: return <MultiPrice formData={formData} setFormData={setFormData} hasSubmitted={hasSubmitted} priceErrors={allErrors.priceErrors} setPriceErrors={allErrors.setPriceErrors} />
        case 6: return <MultiImages formData={formData} setImageError={allErrors.setImageError} imageUpload={imageUpload} setImageUpload={setImageUpload} />
        // case 7: return <MultiPublish formData={formData} setFormData={setFormData} hasSubmitted={hasSubmitted} addressErrors={allErrors.addressErrors} setPriceErrors={allErrors.setPriceErrors}/>
        default: return null
    }
}

export const checkInput = (page, allErrors) => {
    switch (page) {
        case 0:
            if (allErrors.addressErrors.length) return false;
            else return true;
        case 1:
            return true;
        case 2:
            return true;
        case 3:
            if (allErrors.titleErrors.length) return false;
            else return true;
        case 4:
            if (allErrors.descriptionErrors.length) return false;
            else return true;
        case 5:
            if (allErrors.priceErrors.length) return false;
            else return true;        
        case 6:
            return true;
        // case 7:
        //     if (allErrors.addressErrors.length || allErrors.titleErrors.length || allErrors.descriptionErrors.length || allErrors.priceErrors.length) return false;
        //     else return true;
        default: return null
    }
}