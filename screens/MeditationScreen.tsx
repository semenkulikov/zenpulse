import React, { useContext, useState } from 'react';
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

type Mood = 'happy' | 'neutral' | 'sad';

const mockAiCompletion = (prompt: string): string => {
  if (prompt.includes('happy')) {
    return 'Сегодня хороший день, чтобы мягко улыбнуться себе и миру. Дышите глубоко и напомните себе: я достоин(на) спокойствия и радости.';
  }

  if (prompt.includes('neutral')) {
    return 'Сделайте несколько спокойных вдохов и выдохов, просто замечая ощущения. Позвольте уму стать чуть тише — без оценки, только мягкое наблюдение.';
  }

  return 'Сейчас может быть непросто, и это нормально. Почувствуйте опору под собой, сделайте медленный вдох и скажите себе: я не один(а), я забочусь о себе прямо сейчас.';
};

const generateMeditationText = (mood: Mood): string => {
  const basePrompt = 'Generate short Russian meditation support message for mood: ';

  switch (mood) {
    case 'happy':
      return mockAiCompletion(`${basePrompt}happy`);
    case 'neutral':
      return mockAiCompletion(`${basePrompt}neutral`);
    case 'sad':
    default:
      return mockAiCompletion(`${basePrompt}sad`);
  }
};

const MeditationScreen: React.FC = () => {
  const { isSubscribed, setIsSubscribed } = useContext(SubscriptionContext);
  const navigation = useNavigation<MeditationNavigationProp>();
  const [aiText, setAiText] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isAiExpanded, setIsAiExpanded] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <Text style={styles.title}>Медитации</Text>
            {isSubscribed && (
              <Pressable onPress={() => setIsSubscribed(false)}>
                <Text style={styles.unsubscribeText}>Отменить подписку</Text>
              </Pressable>
            )}
          </View>
          <Text style={styles.subtitle}>
            Выберите практику под своё состояние. Премиум-сессии доступны по подписке ZenPulse Premium.
          </Text>
        </View>

        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>AI настрой дня</Text>
          <Text style={styles.aiSubtitle}>Выберите настроение, и мы подберём мягкий текст-поддержку.</Text>

          {isAiExpanded && (
            <>
              <View style={styles.aiMoodRow}>
                <Pressable
                  onPress={() => {
                    const text = generateMeditationText('happy');
                    setAiText(text);
                    setSelectedMood('happy');
                  }}
                  style={[
                    styles.aiMoodButton,
                    selectedMood === 'happy' && styles.aiMoodButtonSelected,
                  ]}
                >
                  <Text style={styles.aiMoodEmoji}>😊</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    const text = generateMeditationText('neutral');
                    setAiText(text);
                    setSelectedMood('neutral');
                  }}
                  style={[
                    styles.aiMoodButton,
                    selectedMood === 'neutral' && styles.aiMoodButtonSelected,
                  ]}
                >
                  <Text style={styles.aiMoodEmoji}>😐</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    const text = generateMeditationText('sad');
                    setAiText(text);
                    setSelectedMood('sad');
                  }}
                  style={[styles.aiMoodButton, selectedMood === 'sad' && styles.aiMoodButtonSelected]}
                >
                  <Text style={styles.aiMoodEmoji}>😔</Text>
                </Pressable>
              </View>

              <View style={styles.aiResultCard}>
                <Text style={styles.aiResultLabel}>Ответ AI</Text>
                <Text style={styles.aiResultText}>
                  {aiText ?? 'Выберите настроение, чтобы получить мягкую подсказку на день.'}
                </Text>
              </View>
            </>
          )}

          <Pressable
            onPress={() => setIsAiExpanded((prev) => !prev)}
            style={styles.aiArrowToggle}
          >
            <Text style={styles.aiArrowText}>{isAiExpanded ? '▲' : '▼'}</Text>
          </Pressable>
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
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#E5E7EB',
  },
  unsubscribeText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    lineHeight: 22,
  },
  aiCard: {
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 20,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  aiSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  aiMoodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  aiMoodButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#020617',
  },
  aiMoodButtonSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#111827',
  },
  aiMoodEmoji: {
    fontSize: 20,
  },
  aiResultCard: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#111827',
  },
  aiResultLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
  },
  aiResultText: {
    fontSize: 14,
    color: '#E5E7EB',
    lineHeight: 20,
  },
  aiArrowToggle: {
    marginTop: 8,
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  aiArrowText: {
    fontSize: 14,
    color: '#9CA3AF',
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

