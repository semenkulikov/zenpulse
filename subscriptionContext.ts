import { createContext } from 'react';

export type SubscriptionContextValue = {
  isSubscribed: boolean;
  setIsSubscribed: (value: boolean) => void;
};

export const SubscriptionContext = createContext<SubscriptionContextValue>({
  isSubscribed: false,
  // Default no-op implementation; real setter is provided in App.
  setIsSubscribed: () => {},
});

