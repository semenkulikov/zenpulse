import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
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
      <View style={styles.backgroundOverlay}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.badgeText}>ZenPulse</Text>
              <Text style={styles.title}>ZenPulse Premium</Text>
              <Text style={styles.subtitle}>
                Открой доступ к полному спокойствию и концентрации
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Что вы получите</Text>
              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.benefitText}>Безлимитные медитации</Text>
                </View>
                <View style={styles.benefitItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.benefitText}>Персональные рекомендации</Text>
                </View>
                <View style={styles.benefitItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.benefitText}>Отсутствие рекламы</Text>
                </View>
                <View style={styles.benefitItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.benefitText}>Доступ к эксклюзивным сессиям</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Тарифы</Text>
              <View style={styles.plansContainer}>
                <View style={styles.planCard}>
                  <Text style={styles.planLabel}>Месячный</Text>
                  <Text style={styles.planPrice}>9.99$</Text>
                  <Text style={styles.planDescription}>Гибкая подписка с оплатой каждый месяц.</Text>
                </View>

                <View style={styles.planCardFeatured}>
                  <View style={styles.planBadge}>
                    <Text style={styles.planBadgeText}>Выгоднее</Text>
                  </View>
                  <Text style={styles.planLabelFeatured}>Годовой</Text>
                  <Text style={styles.planPriceFeatured}>59.99$</Text>
                  <Text style={styles.planDescriptionFeatured}>
                    Экономия по сравнению с помесячной оплатой и полный год спокойствия.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <PrimaryButton title="Попробовать бесплатно" onPress={handleSubscribe} />
            <Text style={styles.footerNote}>Отмена в любой момент в один тап.</Text>
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
  backgroundOverlay: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#020617',
  },
  container: {
    flex: 1,
    borderRadius: 24,
    padding: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.96)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    marginBottom: 24,
  },
  badgeText: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    color: '#7DD3FC',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#E5E7EB',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A5B4FC',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  benefitsList: {
    gap: 10,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginRight: 10,
    backgroundColor: '#4F46E5',
  },
  benefitText: {
    fontSize: 15,
    color: '#E5E7EB',
  },
  plansContainer: {
    gap: 12,
  },
  planCard: {
    borderRadius: 18,
    padding: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 81, 0.9)',
  },
  planCardFeatured: {
    borderRadius: 18,
    padding: 18,
    backgroundColor: 'rgba(79, 70, 229, 0.28)',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  planBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: '#22C55E',
    marginBottom: 8,
  },
  planBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#022C22',
  },
  planLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  planLabelFeatured: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EEF2FF',
    marginBottom: 4,
  },
  planPriceFeatured: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  planDescriptionFeatured: {
    fontSize: 13,
    color: '#E5E7EB',
  },
  footer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(31, 41, 55, 0.9)',
  },
  footerNote: {
    marginTop: 8,
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default PaywallScreen;

