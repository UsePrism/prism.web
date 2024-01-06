import { apicall } from "./apicall";

export const getCategories = () => {
  return apicall({
    endpoint: "/businesses/categories",
    method: "GET",
  });
};

export const generateUploadLink = (extension: string) => {
  return apicall({
    endpoint: "/uploads/generate-upload-link",
    pQuery: { contentType: `.${extension}` },
    method: "GET",
    auth: true,
  });
};

export const addReview = (review: NewReview) => {
  return apicall({
    endpoint: "/reviews",
    method: "POST",
    auth: true,
    body: {
      ...review,
      businessCategoryId: +review?.businessCategoryId,
      businessSocialMediaProfile:
        review?.businessSocialMediaProfile?.length > 0
          ? review?.businessSocialMediaProfile
          : null,
      businessFacebookProfileName:
        review?.businessFacebookProfileName?.length > 0
          ? review?.businessFacebookProfileName
          : null,
      businessPhoneNumber:
        review?.businessPhoneNumber?.length > 0
          ? review?.businessPhoneNumber
          : null,
      businessWebsite:
        review?.businessWebsite?.length > 0 ? review?.businessWebsite : null,
      businessAddress:
        review?.businessAddress?.length > 0 ? review?.businessAddress : null,
      businessEmailAddress:
        review?.businessEmailAddress?.length > 0
          ? review?.businessEmailAddress
          : null,
      channelPurchasedFrom: +review?.channelPurchasedFrom,
      rating: +review?.rating,
      assetId: review?.assetId?.length > 0 ? review?.assetId : null,
    },
  });
};

export const featuredReviews = () => {
  return apicall({
    endpoint: "/reviews/featured",
    method: "GET",
  });
};

export const getBusinesses = (searchQuery: SearchQuery) => {
  return apicall({
    endpoint: "/businesses",
    pQuery: searchQuery,
    method: "GET",
  });
};
