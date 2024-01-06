export {};

declare global {
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
}
