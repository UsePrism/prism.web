import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { addReview, featuredReviews, getCategories } from "../api/businessapi";
import { handleApiResponse, uploadFile } from "core/helpers/generalHelpers";
import notification from "core/helpers/notification";

type BusinessState = {
  isLoading: boolean;
  categories: Category[];
  featuredReviews: FeaturedReview[];
  setLoading: (status: boolean) => void;
  getCategories: () => Promise<void>;
  getFeaturedReview: () => Promise<void>;
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
            message: res?.status ? res?.data?.data?.message : res?.message,
            type: res?.status ? "success" : "danger",
          });

          set({ isLoading: false });
          return res;
        },
        reset: () => {
          set({
            isLoading: false,
            categories: [],
          });
        },
      }),
      {
        name: "businessstore",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export default useBusinessStore;
