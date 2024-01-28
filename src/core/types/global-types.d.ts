export {};

declare global {
  interface RoutesType {
    name: string;
    layout: string;
    component: JSX.Element;
    icon: JSX.Element | string;
    path: string;
    secondary?: boolean;
  }

  interface GeneralResponse {
    status: boolean;
    statusCode: number;
    message: string;
    data: any;
    errors: {} | any;
  }

  interface Category {
    id: number;
    name: string;
    description?: string;
    imageUrl?: string;
    iconUrl?: string;
  }

  interface FeaturedReview {
    id: string;
    reviewTitle: string;
    reviewBody: string;
    rating: number;
    createdAt: string;
    business: FeaturedBusiness;
    reviewer: Reviewer;
  }
  interface FeaturedBusiness {
    name: string;
    category: string;
  }

  interface Reviewer {
    firstName: string;
    lastName: string;
  }

  interface Business {
    id: string;
    businessCategoryId: number;
    businessName: string;
    businessSocialMediaProfile: string;
    businessFacebookProfileName: string;
    businessPhoneNumber: string;
    businessWebsite: string;
    businessAddress: string;
    businessEmailAddress: string;
    businessBankName: string;
    businessBankAccountNumber: string;
    totalReviews: number;
    averageRating: number;
  }

  interface Review {
    id: string;
    businessCategoryId: number;
    reviewerId: string;
    reviewerName: string;
    businessId: string;
    productName: string;
    rating: number;
    reviewTitle: string;
    reviewBody: string;
    totalComments: number;
    totalLikes: number;
    totalShares: number;
    channelPurchasedFrom: number;
    userHasLiked: boolean;
    hasBeenEdited: boolean;
    createdAt: string;
    assets: Asset[];
  }

  interface Asset {
    id: string;
    url: string;
    contentType: string;
    fileName: string;
  }

  interface Pagination {
    CurrentPage: number;
    TotalPages: number;
    PageSize: number;
    TotalCount: number;
    HasPrevious: boolean;
    HasNext: boolean;
  }
}
