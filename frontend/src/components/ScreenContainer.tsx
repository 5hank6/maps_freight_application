import React from 'react';
import { View, StyleSheet, SafeAreaView, ViewStyle, StatusBar } from 'react-native';
import { SemanticColors } from '../theme/colors';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={SemanticColors.background} />
      <View style={[styles.container, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SemanticColors.background,
  },
  container: {
    flex: 1,
    backgroundColor: SemanticColors.background,
    paddingHorizontal: 20,
  },
});
