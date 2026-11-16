
"use client";

import { useSyncExternalStore } from "react";

import type {
  HealthPackage,
  TestSummary,
} from "@/lib/types";

const EMPTY_TEST_CART: TestSummary[] = [];
const EMPTY_PACKAGE_CART: HealthPackage[] = [];

let testCart: TestSummary[] = EMPTY_TEST_CART;
let packageCart: HealthPackage[] = EMPTY_PACKAGE_CART;

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getTestSnapshot() {
  return testCart;
}

function getPackageSnapshot() {
  return packageCart;
}

function getServerTestSnapshot() {
  return EMPTY_TEST_CART;
}

function getServerPackageSnapshot() {
  return EMPTY_PACKAGE_CART;
}

export function useCart() {
  return useSyncExternalStore(
    subscribe,
    getTestSnapshot,
    getServerTestSnapshot,
  );
}

export function usePackageCart() {
  return useSyncExternalStore(
    subscribe,
    getPackageSnapshot,
    getServerPackageSnapshot,
  );
}

export function addTestToCart(test: TestSummary): boolean {
  if (testCart.some((item) => item.id === test.id)) {
    return false;
  }

  testCart = [...testCart, test];
  emitChange();

  return true;
}

export function removeTestFromCart(testId: string) {
  const nextCart = testCart.filter(
    (item) => item.id !== testId,
  );

  if (nextCart.length === testCart.length) return;

  testCart = nextCart.length > 0
    ? nextCart
    : EMPTY_TEST_CART;

  emitChange();
}

export function addPackageToCart(
  healthPackage: HealthPackage,
): boolean {
  if (packageCart.some((item) => item.id === healthPackage.id)) {
    return false;
  }

  packageCart = [...packageCart, healthPackage];
  emitChange();

  return true;
}

export function removePackageFromCart(packageId: string) {
  const nextCart = packageCart.filter(
    (item) => item.id !== packageId,
  );

  if (nextCart.length === packageCart.length) return;

  packageCart = nextCart.length > 0
    ? nextCart
    : EMPTY_PACKAGE_CART;

  emitChange();
}

export function clearCart() {
  if (
    testCart.length === 0 &&
    packageCart.length === 0
  ) {
    return;
  }

  testCart = EMPTY_TEST_CART;
  packageCart = EMPTY_PACKAGE_CART;

  emitChange();
}
