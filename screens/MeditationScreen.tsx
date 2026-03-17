import React, { useContext } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SubscriptionContext } from '../subscriptionContext';
import type { RootStackParamList } from '../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type MeditationNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Meditation'>;

type MeditationItem = {
  id: string;
  title: string;
  duration: string;
  imageColor: string;
  isPremium: boolean;
};

const meditations: MeditationItem[] = [
  {
    id: '1',
    title: 'Утреннее пробуждение',
    duration: '10 мин',
    imageColor: '#38BDF8',
    isPremium: false,
  },
  {
    id: '2',
    title: 'Медитация на дыхание',
    duration: '12 мин',
    imageColor: '#4F46E5',
    isPremium: false,
  },
  {
    id: '3',
    title: 'Снятие стресса',
    duration: '15 мин',
    imageColor: '#F97316',
    isPremium: true,
  },
  {
    id: '4',
    title: 'Перед сном',
    duration: '20 мин',
    imageColor: '#22C55E',
    isPremium: true,
  },
  {
    id: '5',
    title: 'Фокус и концентрация',
    duration: '8 мин',
    imageColor: '#EC4899',
    isPremium: true,
  },
  {
    id: '6',
    title: 'Осознанная пауза',
    duration: '5 мин',
    imageColor: '#A855F7',
    isPremium: false,
  },
];

const MeditationScreen: React.FC = () => {
  const { isSubscribed } = useContext(SubscriptionContext);
  const navigation = useNavigation<MeditationNavigationProp>();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Медитации</Text>
          <Text style={styles.subtitle}>
            Выберите практику под своё состояние. Премиум-сессии доступны по подписке ZenPulse Premium.
          </Text>
        </View>

        <FlatList
          data={meditations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isLocked = !isSubscribed && item.isPremium;

            return (
              <Pressable
                onPress={() => {
                  if (isLocked) {
                    navigation.navigate('Paywall');
                  }
                }}
                style={({ pressed }) => [
                  styles.card,
                  isLocked && styles.cardLocked,
                  pressed && !isLocked && styles.cardPressed,
                ]}
              >
                <View style={styles.cardRow}>
                  <View style={[styles.imagePlaceholder, { backgroundColor: item.imageColor }]}>
                    <Image
                      style={styles.imageOverlay}
                      // Заглушка вместо реального изображения, можно заменить на ассет
                      source={{ uri: 'https://via.placeholder.com/80x80.png?text=Zen' }}
                    />
                  </View>
                  <View style={styles.cardTextContainer}>
                    <View style={styles.cardTitleRow}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      {isLocked && (
                        <Text style={styles.lockBadge}>
                          🔒 Только Premium
                        </Text>
                      )}
                    </View>
                    <Text style={styles.cardDuration}>{item.duration}</Text>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
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
  },
  header: {
    marginBottom: 24,
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
  listContent: {
    paddingBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 14,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 12,
  },
  cardPressed: {
    opacity: 0.9,
  },
  cardLocked: {
    opacity: 0.5,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 64,
    aspectRatio: 1,
    borderRadius: 14,
    overflow: 'hidden',
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlay: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E5E7EB',
    flexShrink: 1,
    marginRight: 8,
  },
  cardDuration: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  lockBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#F97316',
  },
});

export default MeditationScreen;

