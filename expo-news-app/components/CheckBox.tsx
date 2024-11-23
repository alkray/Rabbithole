import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Props = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

const CheckBox = ({ label, checked, onPress }: Props) => {
  // Animated container style
  const rnAnimatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(checked ? Colors.tint: Colors.white, {
        duration: 200,
      }),
      borderColor: withTiming(checked ? Colors.tint : Colors.black, {
        duration: 200,
      }),
    };
  }, [checked]);

  // Animated text style
  const rnTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(checked ? Colors.tintLight : Colors.black, {
        duration: 150,
      }),
    };
  }, [checked]);

  return (
    <Animated.View
      style={[styles.container, rnAnimatedContainerStyle]}
      onTouchEnd={onPress} // Handle press
      layout={LinearTransition.springify().mass(0.8)}
    >
      <Animated.Text style={[styles.label, rnTextStyle]}>{label}</Animated.Text>
      {checked && (
        <Animated.View
          style={styles.iconWrapper}
          entering={FadeIn.duration(350)}
          exiting={FadeOut}
        >
          <AntDesign name="checkcircle" size={14} color={Colors.tint} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 8,
    borderColor: Colors.black,
    borderRadius: 32,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    color: Colors.tint,
  },
  iconWrapper: {
    marginLeft: 8,
    height: 14,
    width: 14,
  },
});
