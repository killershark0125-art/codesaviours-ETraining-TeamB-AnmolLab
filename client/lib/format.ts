const priceFormatter = new Intl.NumberFormat("en-PK", {
  maximumFractionDigits: 0,
});

/** Formats a PKR amount, or returns a neutral label when no verified price exists. */
export function formatPrice(amount: number | null | undefined): string {
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount < 0) {
    return "Confirm with lab";
  }

  return `Rs ${priceFormatter.format(amount)}`;
}
