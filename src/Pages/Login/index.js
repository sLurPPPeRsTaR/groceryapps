import {View, Button, Text, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../assets/logo/Logo.svg';

export default function Login({navigation}) {
  const [myName, setMyName] = useState('');

  const handlerSubmit = () => {
    if (myName.length >= 3) {
      navigation.navigate('Pages_Home', {myName: myName});
    } else if (myName.length == 0) {
      Alert.alert('WARNING !!!', 'Please enter your name', [
        {
          text: 'Ok',
        },
      ]);
    } else if (myName.length < 3) {
      Alert.alert('WARNING !', 'At least 3 Character !', [
        {
          text: 'Ok',
        },
      ]);
    }
    setMyName('');
  };

  const handlerOnChange = value => {
    setMyName(value);
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      }}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Logo width="500" height="500" />
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{fontSize: 30}}>Please input your name</Text>
        <TextInput
          placeholder="enter your name"
          style={{
            marginVertical: 15,
            borderWidth: 1,
            textAlign: 'center',
            borderRadius: 50,
          }}
          value={myName}
          onChangeText={handlerOnChange}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button title="S u b m i t" onPress={handlerSubmit} />
        </View>
      </View>
    </View>
  );
}
