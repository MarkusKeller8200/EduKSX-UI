import { createContext, useContext } from 'react';
import type { Entry } from './registry';

/** Die gerade gezeigte Seite des Inhaltsverzeichnisses (für Baustein-Seiten: Versionen, Wünsche). */
export const EntryContext = createContext<Entry | undefined>(undefined);
export const useEntry = () => useContext(EntryContext);
