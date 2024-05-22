import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';
import styles from './styles';

interface CustomTextProps {
  children: React.ReactNode;
  style?: StyleSheet.TextStyle;
}

const CustomText: FC<CustomTextProps> = ({ children, style, ...otherProps }) => {
  return (
    <Text style={[styles.customText, style]} {...otherProps}>
      {children}
    </Text>
  );
};

export default CustomText;
