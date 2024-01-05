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
    business: Business;
    reviewer: Reviewer;
  }

  interface Business {
    name: string;
    category: string;
  }

  interface Reviewer {
    firstName: string;
    lastName: string;
  }
}
