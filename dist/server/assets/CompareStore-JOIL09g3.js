import { useSyncExternalStore } from "react";
const KEY = "lapwise:compare";
const MAX = 3;
const listeners = /* @__PURE__ */ new Set();
const EMPTY = [];
let cache = EMPTY;
function load() {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : EMPTY;
  } catch {
    return EMPTY;
  }
}
function ensureCache() {
  if (cache === EMPTY && typeof window !== "undefined") {
    cache = load();
  }
  return cache;
}
function write(ids) {
  cache = ids;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
  }
  listeners.forEach((l) => l());
}
const compareStore = {
  subscribe(l) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
  getSnapshot: () => ensureCache(),
  getServerSnapshot: () => EMPTY,
  add(id) {
    const cur = ensureCache();
    if (cur.includes(id) || cur.length >= MAX) return;
    write([...cur, id]);
  },
  remove(id) {
    write(ensureCache().filter((x) => x !== id));
  },
  clear() {
    write([]);
  },
  has(id) {
    return ensureCache().includes(id);
  },
  max: MAX
};
function useCompare() {
  return useSyncExternalStore(
    compareStore.subscribe,
    compareStore.getSnapshot,
    compareStore.getServerSnapshot
  );
}
export {
  compareStore as c,
  useCompare as u
};
