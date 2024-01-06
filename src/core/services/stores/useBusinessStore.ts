import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {
  addReview,
  featuredReviews,
  getBusinesses,
  getCategories,
} from "../api/businessapi";
import { handleApiResponse, uploadFile } from "core/helpers/generalHelpers";
import notification from "core/helpers/notification";

type BusinessState = {
  isLoading: boolean;
  categories: Category[];
  query: SearchQuery;
  featuredReviews: FeaturedReview[];
  businesses: Business[];
  setQuery: (query: SearchQuery) => void;
  setLoading: (status: boolean) => void;
  getCategories: () => Promise<void>;
  getFeaturedReview: () => Promise<void>;
  getBusinesses: (query: SearchQuery) => Promise<void>;
  reset: () => void;
  uploadImage: (file: File) => Promise<string>;
  addReview: (review: NewReview) => Promise<GeneralResponse>;
};

const useBusinessStore = create<BusinessState>()(
  devtools(
    persist(
      (set, get): BusinessState => ({
        isLoading: false,
        featuredReviews: [],
        businesses: [],
        query: {
          categoryId: 0,
          pageNumber: 1,
          pageSize: 20,
          searchTerm: "",
          sortOrder: "",
        },
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
        reset: () => {
          set({
            isLoading: false,
            categories: [],
            featuredReviews: [],
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
