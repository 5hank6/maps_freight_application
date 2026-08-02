import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps } from 'react-native';
import { SemanticColors, Colors } from '../theme/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, style, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.inputFocused : null,
          error ? styles.inputError : null,
          style,
          { outlineStyle: 'none' } as any
        ]}
        placeholderTextColor={SemanticColors.textSecondary}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus && props.onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur && props.onBlur(e);
        }}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    color: Colors.ivory,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: Colors.asphalt,
    borderWidth: 1.5,
    borderColor: SemanticColors.border,
    borderRadius: 10,
    color: Colors.ivory,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 15,
  },
  inputFocused: {
    borderColor: Colors.gold,
    backgroundColor: '#0a1a2f', // slightly lighter on focus
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  inputError: {
    borderColor: Colors.red,
  },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
  },
});
