import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import { SubscriptionContext } from '../subscriptionContext';

const PaywallScreen: React.FC = () => {
  const { setIsSubscribed } = useContext(SubscriptionContext);

  const handleSubscribe = () => {
    setIsSubscribed(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Премиум медитации</Text>
        <Text style={styles.subtitle}>
          Получите доступ к коллекции медитаций, чтобы практиковать осознанность каждый день.
        </Text>

        <View style={styles.buttonContainer}>
          <PrimaryButton title="Подписаться" onPress={handleSubscribe} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#E5E7EB',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 24,
  },
});

export default PaywallScreen;

