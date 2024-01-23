import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  addReview,
  featuredReviews,
  getBusinessReview,
  getBusinesses,
  getCategories,
  likeReview,
} from "../api/businessapi";
import { handleApiResponse, uploadFile } from "core/helpers/generalHelpers";
import notification from "core/helpers/notification";

type BusinessState = {
  isLoading: boolean;
  categories: Category[];
  query: SearchQuery;
  featuredReviews: FeaturedReview[];
  businesses: Business[];
  reviews: Review[];
  selectedBusiness: Business | null;
  setQuery: (query: SearchQuery) => void;
  setLoading: (status: boolean) => void;
  setSelectedBusiness: (business: Business) => void;
  resetSelectedBusiness: () => void;
  getCategories: () => Promise<void>;
  getFeaturedReview: () => Promise<void>;
  getBusinessReview: (id: string, query: ReviewQuery) => Promise<void>;
  getBusinesses: (query: SearchQuery) => Promise<void>;
  reset: () => void;
  uploadImage: (file: File) => Promise<string>;
  addReview: (review: NewReview) => Promise<GeneralResponse>;
  likeReview: (businessId: string, reviewId: string) => Promise<void>;
};

const useBusinessStore = create<BusinessState>()(
  devtools(
    persist(
      (set, get): BusinessState => ({
        isLoading: false,
        featuredReviews: [],
        businesses: [],
        reviews: [],
        query: {
          categoryId: 0,
          pageNumber: 1,
          pageSize: 20,
          searchTerm: "",
          sortOrder: "",
        },
        selectedBusiness: null,
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
          var res = handleApiResponse(apiRes);

          set({ isLoading: false, businesses: res?.data?.data });
          return;
        },
        getBusinessReview: async (id, query) => {
          set({ isLoading: true });

          const apiRes = await getBusinessReview(id, query);
          var res = handleApiResponse(apiRes);

          set({ isLoading: false, reviews: res?.data?.data });
          return;
        },
        uploadImage: async (file) => {
          set({ isLoading: true });
          var res = await uploadFile(file);
          set({ isLoading: false });
          return res;
        },
        addReview: async (review) => {
          set({ isLoading: true });
          const apiRes = await addReview(review);
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
              reviews: state.reviews.map((review) =>
                review.id === reviewId
                  ? {
                      ...review,
                      totalLikes: res?.data?.data?.likesCount,
                    }
                  : review,
              ),
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
        reset: () => {
          set({
            isLoading: false,
            categories: [],
            featuredReviews: [],
            reviews: [],
            selectedBusiness: null,
          });
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
