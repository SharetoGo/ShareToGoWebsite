import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Días hasta la próxima publicación: último día del mes (28/29/30/31).
 * - Si hoy es el último día del mes, devuelve 0.
 */
export function getDaysUntilNextPublication(): number {
  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  // Último día real del mes
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  return lastDayOfMonth - currentDay;
}

/**
 * Fecha formateada de la próxima publicación (último día del mes),
 * en formato es-ES: "31 de enero", "28 de febrero", etc.
 */
export function getNextPublicationDate(): string {
  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  return lastDayOfMonth.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
  });
}
