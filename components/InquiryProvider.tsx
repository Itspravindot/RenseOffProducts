"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { InquiryItem } from "@/lib/inquiry";

type AddInput = {
  productId: string;
  name: string;
  variant?: string;
  size?: string;
  image?: string;
  quantity?: number;
};

type InquiryContextValue = {
  items: InquiryItem[];
  note: string;
  setNote: (value: string) => void;
  add: (input: AddInput) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);
const STORAGE_KEY = "renseoff-inquiry-v1";

const clampQuantity = (value: number) => Math.max(1, Math.min(99, value));
const itemId = (productId: string, size?: string) =>
  `${productId}::${size ?? "default"}`;

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [note, setNote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as {
          items?: InquiryItem[];
          note?: string;
        };
        if (Array.isArray(parsed.items)) {
          setItems(
            parsed.items.filter(
              (item) =>
                item &&
                typeof item.id === "string" &&
                typeof item.name === "string" &&
                typeof item.quantity === "number",
            ),
          );
        }
        if (typeof parsed.note === "string") setNote(parsed.note);
      }
    } catch {
      // A blocked or malformed store must never break the page.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, note }));
    } catch {
      // Ignore storage failures (private mode, quota, etc.).
    }
  }, [items, note, ready]);

  const add = useCallback((input: AddInput) => {
    const id = itemId(input.productId, input.size);
    const quantity = clampQuantity(input.quantity ?? 1);

    setItems((current) => {
      const existing = current.find((item) => item.id === id);
      if (existing) {
        return current.map((item) =>
          item.id === id
            ? { ...item, quantity: clampQuantity(item.quantity + quantity) }
            : item,
        );
      }
      return [
        ...current,
        {
          id,
          productId: input.productId,
          name: input.name,
          variant: input.variant,
          size: input.size,
          image: input.image,
          quantity,
        },
      ];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: clampQuantity(quantity) }
          : item,
      ),
    );
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setNote("");
    setIsOpen(false);
  }, []);

  const value = useMemo<InquiryContextValue>(
    () => ({
      items,
      note,
      setNote,
      add,
      remove,
      setQuantity,
      clear,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [items, note, add, remove, setQuantity, clear, isOpen],
  );

  return (
    <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>
  );
}

export function useInquiry(): InquiryContextValue {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error("useInquiry must be used inside InquiryProvider");
  }
  return context;
}
