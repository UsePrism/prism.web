import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  addComment,
  addReview,
  deleteComment,
  deleteReview,
  featuredReviews,
  getBusinessById,
  getBusinessReview,
  getBusinesses,
  getCategories,
  getComments,
  likeReview,
  updateReview,
} from "../api/businessapi";
import { handleApiResponse, uploadFile } from "core/helpers/generalHelpers";
import notification from "core/helpers/notification";

type BusinessState = {
  isLoading: boolean;
  categories: Category[];
  query: SearchQuery;
  featuredReviews: FeaturedReview[];
  businessList: { businesses: Business[]; pagination: Pagination };
  commentList: { comments: Comment[]; pagination: Pagination };
  reviewList: { reviews: Review[]; pagination: Pagination };
  selectedBusiness: Business | null;
  selectedReview: Review | null;
  setQuery: (query: SearchQuery) => void;
  setLoading: (status: boolean) => void;
  setSelectedBusiness: (business: Business) => void;
  setSelectedReview: (review: Review) => void;
  resetSelectedBusiness: () => void;
  resetSelectedReview: () => void;
  getCategories: () => Promise<void>;
  getFeaturedReview: () => Promise<void>;
  getBusinessReview: (id: string, query: ReviewQuery) => Promise<void>;
  getBusinesses: (query: SearchQuery) => Promise<void>;
  getBusinessById: (id: string) => Promise<Business | null>;
  reset: () => void;
  uploadImage: (file: File) => Promise<string>;
  addReview: (review: NewReview, id: string) => Promise<GeneralResponse>;
  deleteReview: (businessId: string, reviewId: string) => Promise<void>;
  updateReview: (
    businessId: string,
    reviewId: string,
    review: UpdateReview,
  ) => Promise<GeneralResponse>;
  likeReview: (businessId: string, reviewId: string) => Promise<void>;
  addComment: (
    businessId: string,
    reviewId: string,
    comment: string,
  ) => Promise<GeneralResponse>;
  getComments: (query: CommmentQuery) => Promise<void>;
  deleteComment: (
    businessId: string,
    reviewId: string,
    commentId: string,
  ) => Promise<void>;
};

const initialState = {
  isLoading: false,
  featuredReviews: [],
  businessList: {
    businesses: [],
    pagination: {
      CurrentPage: 1,
      HasNext: false,
      HasPrevious: false,
      PageSize: 10,
      TotalCount: 0,
      TotalPages: 1,
    },
  },
  commentList: {
    comments: [],
    pagination: {
      CurrentPage: 1,
      HasNext: false,
      HasPrevious: false,
      PageSize: 10,
      TotalCount: 0,
      TotalPages: 1,
    },
  },
  reviewList: {
    reviews: [],
    pagination: {
      CurrentPage: 1,
      HasNext: false,
      HasPrevious: false,
      PageSize: 10,
      TotalCount: 0,
      TotalPages: 1,
    },
  },
  query: {
    categoryId: 0,
    pageNumber: 1,
    pageSize: 10,
    searchTerm: "",
    sortOrder: "",
  },
  selectedBusiness: null,
  selectedReview: null,
};

const useBusinessStore = create<BusinessState>()(
  devtools(
    persist(
      (set, get): BusinessState => ({
        ...initialState,
        setQuery: async (query) => {
          set({ query });
        },
        setLoading: (status) => {
          set({ isLoading: status });
        },
        categories: [],
        getFeaturedReview: async () => {
          set({ isLoading: true });

          const apiRes = await featuredReviews();
          var res = handleApiResponse(apiRes);

          set({ isLoading: false, featuredReviews: res?.data?.data });
          return;
        },
        getCategories: async () => {
          set({ isLoading: true });

          const apiRes = await getCategories();
          var res = handleApiResponse(apiRes);

          set({ isLoading: false, categories: res?.data?.data });
          return;
        },
        getBusinesses: async (query) => {
          set({ isLoading: true });

          const apiRes = await getBusinesses(query);
          var pages = JSON.parse(apiRes?.headers.get("x-pagination"));
          var res = handleApiResponse(apiRes);

          set({
            isLoading: false,
            businessList: {
              businesses: res?.data?.data,
              pagination: {
                ...pages,
              },
            },
          });

          return;
        },
        getBusinessById: async (id) => {
          set({ isLoading: true });

          const apiRes = await getBusinessById(id);

          var res = handleApiResponse(apiRes);

          return res?.data?.data as Business;
        },
        getBusinessReview: async (id, query) => {
          set({ isLoading: true });

          const apiRes = await getBusinessReview(id, query);
          var pages = JSON.parse(apiRes?.headers.get("x-pagination"));

          var res = handleApiResponse(apiRes);

          set({
            isLoading: false,
            reviewList: {
              reviews: res?.data?.data,
              pagination: {
                ...pages,
              },
            },
          });
          return;
        },
        uploadImage: async (file) => {
          set({ isLoading: true });
          var res = await uploadFile(file);
          set({ isLoading: false });
          return res;
        },
        addReview: async (review, id) => {
          set({ isLoading: true });
          const apiRes = await addReview(review);
          var res = handleApiResponse(apiRes);

          notification({
            message: res?.status ? "Review added successfully" : res?.message,
            type: res?.status ? "success" : "danger",
          });

          if (res?.status) {
            if (id?.length > 0) {
              get().getBusinessReview(id, {
                pageNumber: 1,
                pageSize: 10,
                sortOrder: "",
              });
            } else {
              get().getBusinesses({
                categoryId: 0,
                pageNumber: 1,
                pageSize: 10,
                searchTerm: "",
                sortOrder: "",
              });
            }
          }

          set({ isLoading: false });
          return res;
        },
        updateReview: async (businessId, reviewId, review) => {
          set({ isLoading: true });
          const apiRes = await updateReview(businessId, reviewId, review);
          var res = handleApiResponse(apiRes);

          notification({
            message: res?.status ? "Review added successfully" : res?.message,
            type: res?.status ? "success" : "danger",
          });

          set({ isLoading: false });
          return res;
        },
        likeReview: async (businessId, reviewId) => {
          set({ isLoading: true });
          const apiRes = await likeReview(businessId, reviewId);
          var res = handleApiResponse(apiRes);

          if (res?.status) {
            set((state) => ({
              reviewList: {
                ...state.reviewList,
                reviews: state.reviewList?.reviews.map((review) =>
                  review.id === reviewId
                    ? {
                        ...review,
                        totalLikes: res?.data?.data?.likesCount,
                      }
                    : review,
                ),
              },
              selectedReview: {
                ...state.selectedReview!,
                totalLikes:
                  state.selectedReview?.id === reviewId
                    ? res?.data?.data?.likesCount
                    : state?.selectedReview?.totalLikes,
              },
            }));
          } else {
            notification({
              message:
                "You request to like or unlike review could not be processed. Please try again later",
              type: "danger",
            });
          }

          set({ isLoading: false });
          return;
        },
        setSelectedBusiness: async (business) => {
          set({ selectedBusiness: { ...business } });
        },
        resetSelectedBusiness: () => {
          set({ selectedBusiness: null });
        },
        setSelectedReview: async (review) => {
          set({ selectedReview: { ...review } });
        },
        resetSelectedReview: () => {
          set({ selectedReview: null });
        },
        getComments: async (query) => {
          set({ isLoading: true });

          const apiRes = await getComments(query);
          var pages = JSON.parse(apiRes?.headers.get("x-pagination"));
          var res = handleApiResponse(apiRes);

          set({
            isLoading: false,
            commentList: {
              comments: res?.data?.data,
              pagination: {
                ...pages,
              },
            },
          });
          return;
        },
        addComment: async (businessId, reviewId, comment) => {
          set({ isLoading: true });
          const apiRes = await addComment(businessId, reviewId, comment);
          var res = handleApiResponse(apiRes);

          if (res?.status) {
            set((state) => ({
              commentList: {
                ...state.commentList,
                comments:
                  get().selectedReview?.id === reviewId
                    ? [{ ...res?.data?.data }, ...state.commentList?.comments]
                    : [...state.commentList?.comments],
              },
              selectedReview: {
                ...state.selectedReview!,
                totalComments:
                  state.selectedReview?.id === reviewId
                    ? state.selectedReview?.totalComments! + 1
                    : state.selectedReview?.totalComments!,
              },
              reviewList: {
                ...state.reviewList,
                reviews: state.reviewList?.reviews?.map((rev) =>
                  rev.id === reviewId
                    ? {
                        ...rev,
                        totalComments: rev?.totalComments + 1,
                      }
                    : rev,
                ),
              },
            }));
          }

          notification({
            message: res?.status ? "Comment added successfully" : res?.message,
            type: res?.status ? "success" : "danger",
          });

          set({ isLoading: false });
          return res;
        },
        deleteComment: async (businessId, reviewId, commentId) => {
          set({ isLoading: true });

          const apiRes = await deleteComment(businessId, reviewId, commentId);

          var res = handleApiResponse(apiRes);
          if (res?.status) {
            set((state) => ({
              commentList: {
                ...state.commentList,
                comments: state.commentList?.comments.filter(
                  (comment: Comment) => comment.id !== commentId,
                ),
              },
              selectedReview: {
                ...state.selectedReview!,
                totalComments: state.selectedReview?.totalComments! - 1,
              },
              reviewList: {
                ...state.reviewList,
                reviews: state.reviewList?.reviews?.map((rev) =>
                  rev.id === reviewId
                    ? {
                        ...rev,
                        totalComments: rev?.totalComments - 1,
                      }
                    : rev,
                ),
              },
            }));
          }

          notification({
            message: res?.status ? "Comment has been deleted" : res?.message,
            type: res?.status ? "success" : "danger",
          });

          set({ isLoading: false });
          return;
        },
        deleteReview: async (businessId, reviewId) => {
          set({ isLoading: true });

          const apiRes = await deleteReview(businessId, reviewId);

          var res = handleApiResponse(apiRes);
          if (res?.status) {
            var business: any = await get().getBusinessById(businessId);

            set((state) => ({
              reviewList: {
                ...state.reviewList,
                reviews: state.reviewList?.reviews.filter(
                  (review) => review.id !== reviewId,
                ),
              },
              businessList: {
                ...state.businessList,
                businesses: state.businessList?.businesses?.map(
                  (bus: Business) =>
                    bus?.id === businessId ? { ...business } : bus,
                ),
              },
              selectedBusiness: business,
              selectedReview: null,
            }));
          }

          notification({
            message: res?.status ? "Review has been deleted" : res?.message,
            type: res?.status ? "success" : "danger",
          });

          set({ isLoading: false });
          return;
        },
        reset: () => {
          set({ ...initialState });
        },
      }),
      {
        name: "businessStore",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export default useBusinessStore;
