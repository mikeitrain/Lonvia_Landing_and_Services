import { createStore, useStore } from 'zustand';

interface LoadingState {
  loadingItems: Set<string>;
  addLoadingItem: (id: string) => void;
  removeLoadingItem: (id: string) => void;
  isLoading: boolean;
}

const createLoadingStore = () => createStore<LoadingState>((set) => ({
  loadingItems: new Set<string>(),
  isLoading: false,
  addLoadingItem: (id: string) => {
    set(state => {
      const newItems = new Set(state.loadingItems).add(id);
      return { loadingItems: newItems, isLoading: newItems.size > 0 };
    });
  },
  removeLoadingItem: (id: string) => {
    set(state => {
      const newItems = new Set(state.loadingItems);
      newItems.delete(id);
      return { loadingItems: newItems, isLoading: newItems.size > 0 };
    });
  },
}));

const store = createLoadingStore();

export const useLoadingStore = () => useStore(store);

export class LoadingService {
  static start(id: string): string {
    const loadingId = id;
    store.getState().addLoadingItem(loadingId);
    return loadingId;
  }

  static stop(id: string): void {
    store.getState().removeLoadingItem(id);
  }

  static async withLoading<T>(promise: Promise<T>, id: string): Promise<T> {
    const loadingId = this.start(id);
    try {
      return await promise;
    } finally {
      this.stop(loadingId);
    }
  }

  get loading(): boolean {
    return store.getState().isLoading;
  }
}