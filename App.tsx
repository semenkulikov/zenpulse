import React, { useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaywallScreen from './screens/PaywallScreen';
import MeditationScreen from './screens/MeditationScreen';
import { SubscriptionContext } from './subscriptionContext';

export type RootStackParamList = {
  Paywall: undefined;
  Meditation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const subscriptionContextValue = useMemo(
    () => ({ isSubscribed, setIsSubscribed }),
    [isSubscribed],
  );

  return (
    <SubscriptionContext.Provider value={subscriptionContextValue}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Meditation"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Meditation" component={MeditationScreen} />
          <Stack.Screen name="Paywall" component={PaywallScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SubscriptionContext.Provider>
  );
}

