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
      channelPurchasedFrom: +review?.channelPurchasedFrom,
      rating: +review?.rating,
    },
  });
};

export const featuredReviews = () => {
  return apicall({
    endpoint: "/reviews/featured",
    method: "GET",
  });
};
