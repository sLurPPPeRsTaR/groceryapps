import React, {useEffect, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  ScrollView,
  View,
  FlatList,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

export default function Home({navigation, route}) {
  const [product, setProduct] = useState({
    productName: '',
    quantity: '',
  });
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState({});
  const [tempMyName, setTempMyName] = useState('');

  useEffect(() => {
    setTempMyName(route.params.myName);
    if (route.params.myName == 'Admin') {
      alert('Welcome Admin !');
    } else {
      alert(
        `you are login with ${route.params.myName} , if you desire a super power such edit/remove the list you must login with Admin`,
      );
    }
  }, []);

  const genID = () => {
    return Date.now();
  };

  const handlerOnChange = (value, input) => {
    setProduct({
      ...product,
      [input]: value,
    });
  };

  const handlerSave = () => {
    if (edit.id) {
      let idx = products.indexOf(edit);
      let tempEdit = {
        id: edit.id,
        productName: product.productName,
        quantity: product.quantity,
      };
      products[idx] = tempEdit;
      setProducts(products);
      setProduct('');
      setEdit('');
      return;
    }
    if (product.productName && product.quantity) {
      setProducts([
        ...products,
        {
          id: genID(),
          productName: product.productName,
          quantity: product.quantity,
        },
      ]);
      setProduct('');
    } else {
      alert('your productname/quantity is empty!');
      setProduct('');
    }
  };

  const handlerRemove = data => {
    let copy = [...products];
    let result = copy.filter(item => {
      return item.id != data.id;
    });
    setProducts(result);
  };

  const handlerEdit = data => {
    setEdit(data);
    setProduct(data);
  };

  const handlerCancel = () => {
    setEdit('');
    setProduct('');
  };

  const handlerExit = () => {
    navigation.replace('Pages_Login');
  };

  return (
    <View style={{padding: 15, backgroundColor: 'salmon', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>
          Hello,{' '}
          <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
            {tempMyName}
          </Text>{' '}
          welcome back
        </Text>
        <Button title="exit" onPress={handlerExit} />
      </View>
      <Text>So, you ready now to put on list grocery you gonna buy?</Text>
      <TextInput
        placeholder="please enter product name"
        value={product.productName}
        onChangeText={value => handlerOnChange(value, 'productName')}
        // onChangeText={value => setProduct({...product, productName: value})}
      />
      <TextInput
        placeholder="please enter quantity of product"
        keyboardType="number-pad"
        value={product.quantity}
        onChangeText={value => handlerOnChange(value, 'quantity')}
        // onChangeText={value => setProduct({...product, quantity: value})}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginBottom: 30,
        }}>
        <Button
          title={edit.id ? 'Save Changes' : 'Save'}
          onPress={handlerSave}
        />
        {edit.id ? (
          <Button title="Cancel Changes" onPress={handlerCancel} />
        ) : (
          <></>
        )}
      </View>
      <View style={{padding: 15}}>
        {/* {products.map(item => {
          return (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 15,
                alignItems: 'center',
                borderWidth: 1,
                padding: 15,
              }}>
              <View>
                <Text>Product Name : {item.productName}</Text>
                <Text>Quantity : {item.quantity}</Text>
              </View>
              {tempMyName == 'Admin' && (
                <View>
                  {edit.id ? null : (
                    <>
                      <Button
                        title="remove"
                        onPress={() => handlerRemove(item)}
                      />
                      <View style={{height: 5}} />
                      <Button title="edit" onPress={() => handlerEdit(item)} />
                    </>
                  )}
                </View>
              )}
            </View>
          );
        })} */}
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 15,
                alignItems: 'center',
                borderWidth: 1,
                padding: 15,
              }}>
              <View>
                <Text>Product Name : {item.productName}</Text>
                <Text>Quantity : {item.quantity}</Text>
              </View>
              {tempMyName == 'Admin' && (
                <View>
                  {edit.id ? null : (
                    <>
                      <Button
                        title="remove"
                        onPress={() => handlerRemove(item)}
                      />
                      <View style={{height: 5}} />
                      <Button title="edit" onPress={() => handlerEdit(item)} />
                    </>
                  )}
                </View>
              )}
            </View>
          )}
        />
      </View>
    </View>
  );
}
