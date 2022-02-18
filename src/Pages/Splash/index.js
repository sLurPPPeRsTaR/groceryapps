import {View, ActivityIndicator, Text} from 'react-native';
import React from 'react';
import SplashImages from '../../assets/images/splash.svg';

export default function Splash({navigation}) {
  setTimeout(() => {
    navigation.replace('Pages_Login');
  }, 5000);
  return (
    <View style={{flex: 1}}>
      <View style={{position: 'relative', flex: 1}}>
        <SplashImages
          width="100%"
          height="100%"
          opacity="0.7"
          preserveAspectRatio="xMinYMin slice"
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            top: '40%',
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'black',
              marginVertical: 10,
            }}>
            Please Wait. . .
          </Text>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'black',
              marginVertical: 10,
            }}>
            Loading. . .
          </Text>
        </View>
      </View>
    </View>
  );
}
