import React, { FC, TouchEvent } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from './styles';

interface CustomTouchableOpacityProps {
    onPress: (event?: TouchEvent<any>) => void;
    children: React.ReactNode;
    disabled?: boolean;
    style?: StyleSheet.TouchableOpacityStyle;
}

const CustomTouchableOpacity: FC<CustomTouchableOpacityProps> = ({
    onPress,
    children,
    disabled = false,
    style,
    ...otherProps
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[styles.customTouchableOpacity, style]}
            {...otherProps}
        >
            {children}
        </TouchableOpacity>
    );
};

export default CustomTouchableOpacity;
