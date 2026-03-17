import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import { SubscriptionContext } from '../subscriptionContext';

const MeditationScreen: React.FC = () => {
  const { setIsSubscribed } = useContext(SubscriptionContext);

  const handleUnsubscribe = () => {
    setIsSubscribed(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Медитация на дыхание</Text>
          <Text style={styles.subtitle}>
            Устройтесь удобно, закройте глаза и сфокусируйтесь на дыхании. Наблюдайте, как воздух входит и выходит,
            не оценивая ощущения.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.helperText}>Вы в премиум-доступе. Расслабьтесь и наслаждайтесь практикой.</Text>
          <View style={styles.buttonWrapper}>
            <PrimaryButton title="Отменить подписку" onPress={handleUnsubscribe} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#020617',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#E5E7EB',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 22,
  },
  footer: {
    marginTop: 24,
  },
  helperText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  buttonWrapper: {
    alignSelf: 'flex-start',
  },
});

export default MeditationScreen;

