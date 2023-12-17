export {};

declare global {
  interface NewReview {
    businessName: string;
    businessCategoryId?: string | number;
    businessSocialMediaProfile?: string;
    businessFacebookProfileName?: string;
    businessPhoneNumber?: string;
    businessWebsite?: string;
    businessAddress?: string;
    businessEmailAddress?: string;
    businessBankName?: string;
    businessBankAccountNumber?: string;
    channelPurchasedFrom?: string | number;
    productName?: string;
    rating: number;
    reviewTitle?: string;
    reviewBody: string;
    assetId?: string;
  }
}
