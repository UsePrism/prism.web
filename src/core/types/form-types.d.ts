export {};

declare global {
  interface User {
    firstName: string;
    lastName: string;
    id?: string;
    userId?: string;
  }

  interface NewReview {
    businessName: string;
    businessCategoryId: string | number;
    businessSocialMediaProfile: string;
    businessFacebookProfileName: string;
    businessPhoneNumber: string;
    businessWebsite: string;
    businessAddress: string;
    businessEmailAddress: string;
    businessBankName: string;
    businessBankAccountNumber: string;
    channelPurchasedFrom: string | number;
    productName: string;
    rating: number;
    reviewTitle: string;
    reviewBody: string;
    assetId: string;
  }

  interface UpdateReview {
    rating: number;
    reviewTitle: string;
    reviewBody: string;
  }

  interface NewUser {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
  }

  interface ResetPasswordDetail {
    newPassword: string;
    confirmNewPassword: string;
    userId: string;
    token: string;
  }

  interface Waitlist {
    firstName: string;
    lastName: string;
    businessEmail: string;
    businessName: string;
  }

  interface SearchQuery {
    categoryId: number;
    searchTerm: string;
    sortOrder: string;
    pageNumber: number;
    pageSize: number;
  }

  interface ReviewQuery {
    sortOrder: string;
    pageNumber: number;
    pageSize: number;
  }

  interface Comment {
    id: string;
    commenterName: string;
    commenterId: string;
    businessId: string;
    reviewId: string;
    commentBody: string;
    createdAt: string;
  }

  interface CommmentQuery {
    pageNumber: number;
    pageSize: number;
    businessId: string;
    reviewId: string;
  }
}
