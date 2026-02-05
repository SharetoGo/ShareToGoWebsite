// lib/utils/nextPublicationDays.ts
// Publicación: Último día del mes

// Obtener el último día del mes
function getLastDayOfMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

// Función para calcular días hasta próxima publicación (último día del mes)
export function getDaysUntilNextPublication(): number {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Obtener el último día del mes actual
  const lastDayOfMonth = getLastDayOfMonth(today);

  // Si hoy no es el último día del mes, calcular días hasta el final del mes
  if (currentDay < lastDayOfMonth) {
    return lastDayOfMonth - currentDay;
  } else if (currentDay === lastDayOfMonth) {
    // Si hoy es el último día, el próximo es el último del próximo mes
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    const lastDayNextMonth = getLastDayOfMonth(nextMonth);
    return lastDayNextMonth;
  } else {
    // Fallback (no debería ocurrir)
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    const lastDayNextMonth = getLastDayOfMonth(nextMonth);
    return lastDayNextMonth - currentDay;
  }
}

// Función para obtener la fecha formateada de la próxima publicación
export function getNextPublicationDate(): string {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const lastDayOfMonth = getLastDayOfMonth(today);

  // Si hoy no es el último día, la próxima es el último día de este mes
  if (currentDay < lastDayOfMonth) {
    return new Date(currentYear, currentMonth, lastDayOfMonth).toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long' 
    });
  } else {
    // Si hoy es o pasó el último día, próxima es el último del próximo mes
    const nextMonth = new Date(currentYear, currentMonth + 1, 1);
    const lastDayNextMonth = getLastDayOfMonth(nextMonth);
    return new Date(currentYear, currentMonth + 1, lastDayNextMonth).toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long' 
    });
  }
}

// Función adicional: obtener el próximo día de publicación en formato "X días"
export function getNextPublicationDay(): string {
  const daysUntil = getDaysUntilNextPublication();
  return `${daysUntil} días`;
}

// Función adicional: obtener la próxima fecha de publicación formateada
export function getCurrentMonthPublicationDates(): string {
  const today = new Date();
  const currentDay = today.getDate();
  const lastDayOfMonth = getLastDayOfMonth(today);

  // Si hoy no es el último día, la próxima es el último día de este mes
  if (currentDay < lastDayOfMonth) {
    return new Date(today.getFullYear(), today.getMonth(), lastDayOfMonth).toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  } else {
    // Si hoy es o pasó el último día, próxima es el último del próximo mes
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const lastDayNextMonth = getLastDayOfMonth(nextMonth);
    return new Date(today.getFullYear(), today.getMonth() + 1, lastDayNextMonth).toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  }
}

// Función adicional: obtener el número del último día del mes actual
export function getLastDayOfCurrentMonth(): number {
  return getLastDayOfMonth(new Date());
}

// Función adicional: verificar si hoy es el último día del mes
export function isLastDayOfMonth(): boolean {
  const today = new Date();
  const currentDay = today.getDate();
  const lastDay = getLastDayOfMonth(today);
  return currentDay === lastDay;
}