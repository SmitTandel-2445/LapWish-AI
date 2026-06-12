import { useSyncExternalStore } from "react";

const KEY = "lapwise:compare";
const MAX = 3;

type Listener = () => void;
const listeners = new Set<Listener>();

const EMPTY: string[] = [];
let cache: string[] = EMPTY;

function load(): string[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

// Initialize cache lazily on the client
function ensureCache() {
  if (cache === EMPTY && typeof window !== "undefined") {
    cache = load();
  }
  return cache;
}

function write(ids: string[]) {
  cache = ids;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
  }
  listeners.forEach((l) => l());
}

export const compareStore = {
  subscribe(l: Listener) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
  getSnapshot: () => ensureCache(),
  getServerSnapshot: () => EMPTY,
  add(id: string) {
    const cur = ensureCache();
    if (cur.includes(id) || cur.length >= MAX) return;
    write([...cur, id]);
  },
  remove(id: string) {
    write(ensureCache().filter((x) => x !== id));
  },
  clear() {
    write([]);
  },
  has(id: string) {
    return ensureCache().includes(id);
  },
  max: MAX,
};

export function useCompare() {
  return useSyncExternalStore(
    compareStore.subscribe,
    compareStore.getSnapshot,
    compareStore.getServerSnapshot,
  );
}

