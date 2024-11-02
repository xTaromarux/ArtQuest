import { ContainerProps } from '@/utils/types';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Container: React.FC<ContainerProps> = ({ height, children }) => {
    return (
      <View style={[styles.container, { height }]}>
        {children}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
  });
  
  export default Container;