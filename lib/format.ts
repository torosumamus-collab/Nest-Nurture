import { format, parseISO } from "date-fns";

export function formatDate(dateStr: string, pattern = "MMMM d, yyyy"): string {
  try {
    return format(parseISO(dateStr), pattern);
  } catch {
    return dateStr;
  }
}
