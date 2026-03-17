import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, style }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PrimaryButton;

