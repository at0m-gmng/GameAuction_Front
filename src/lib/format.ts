export function formatBalance(amount: number): string {
  return `${amount.toLocaleString("en-US")} ₵`;
}

export function formatMemberSince(isoDate: string): string {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const date = new Date(isoDate);
  return `MEMBER SINCE // ${months[date.getUTCMonth()]}_${date.getUTCFullYear()}`;
}
