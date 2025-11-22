import { create } from "zustand";
import type { Category } from "../service/types";
import { getAllCategories } from "../service/categoriesService";

interface CategoriesState {
    categories: Category[] | null;
    loading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
    categories: null,
    loading: false,
    error: null,

    fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
            const categories = await getAllCategories();
            set({ categories, loading: false });
        } catch (error: any) {
            set({
                categories: null,
                loading: false,
                error: error?.message || "Failed to fetch categories",
            });
        }
    },
}));
