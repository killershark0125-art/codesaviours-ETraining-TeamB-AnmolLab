"use client";

import { useSyncExternalStore } from "react";
import type { TestSummary } from "@/lib/types";

const EMPTY_CART: TestSummary[] = [];

let cart: TestSummary[] = EMPTY_CART;

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return cart;
}

function getServerSnapshot() {
  return EMPTY_CART;
}

export function useCart() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
}

export function addTestToCart(test: TestSummary) {
  if (cart.some((item) => item.id === test.id)) {
    return false;
  }

  cart = [...cart, test];
  emitChange();

  return true;
}

export function removeTestFromCart(testId: string) {
  const nextCart = cart.filter((item) => item.id !== testId);

  if (nextCart.length === cart.length) return;

  cart = nextCart.length > 0 ? nextCart : EMPTY_CART;
  emitChange();
}

export function clearCart() {
  if (cart.length === 0) return;

  cart = EMPTY_CART;
  emitChange();
}