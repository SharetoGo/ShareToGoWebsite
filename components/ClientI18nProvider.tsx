'use client';

import React from 'react';
import '@/lib/i18n'; // inicializa i18n en el cliente

export default function ClientI18nProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
