import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, TextInput, View} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'samplenih',
  createFromLocation:
    '../../../android/app/src/main/assets/database/samplenih.sqlite',
});

export default function Home({navigation, route}) {
  const [product, setProduct] = useState({
    productName: '',
    quantity: '',
  });
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState({});
  const [tempMyName, setTempMyName] = useState('');

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS grocery (id INTEGER PRIMARY KEY AUTOINCREMENT, productName TEXT,quantity TEXT)`,
        [],
        () => {
          console.log(`create table successfully`);
        },
        error => {
          console.log(`create table error ${error}`);
        },
      );
    });
  };

  useEffect(() => {
    createTable();
    getDataSQLite();
    setTempMyName(route.params.myName);
    if (route.params.myName == 'Admin') {
      alert('Welcome Admin !');
    } else {
      alert(
        `you are login with ${route.params.myName} , if you desire a super power such edit/remove the list you must login with Admin`,
      );
    }
  }, []);

  // const genID = () => {
  //   return Date.now();
  // };

  const handlerOnChange = (value, input) => {
    setProduct({
      ...product,
      [input]: value,
    });
  };

  const handlerSave = () => {
    if (edit.id) {
      // let idx = products.indexOf(edit);
      // let tempEdit = {
      //   id: edit.id,
      //   productName: product.productName,
      //   quantity: product.quantity,
      // };
      // products[idx] = tempEdit;
      // setProducts(products);
      db.transaction(tx => {
        tx.executeSql(
          `UPDATE grocery SET productName=?,quantity=? WHERE ID=?`,
          [product.productName, product.quantity, edit.id],
          (tx, res) => {
            // if (res.rows.length > 0) {
            //   let result = [];
            //   for (let i = 0; i < res.rows.length; i++) {
            //     let item = res.rows.item(i);
            //     result.push({
            //       id: item.id,
            //       productName: item.productName,
            //       quantity: item.quantity,
            //     });
            //   }
            //   setProducts(result);
            // }
            getDataSQLite();
            setProduct('');
            setEdit('');
          },
          error => {
            console.log(error);
          },
        );
      });
      return;
    }

    if (product.productName && product.quantity) {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO grocery (productName,quantity) VALUES(?,?)`,
          [product.productName, product.quantity],
          (tx, res) => {
            console.log('insert into table successfully');
            getDataSQLite();
            setProduct('');
          },
          error => console.log(`error insert ${error}`),
        );
      });
      // setProducts([
      //   ...products,
      //   {
      //     id: genID(),
      //     productName: product.productName,
      //     quantity: product.quantity,
      //   },
      // ]);
      // setProduct('');
    } else {
      alert('your productname/quantity is empty!');
      setProduct('');
    }
  };

  const getDataSQLite = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM grocery order by ID ASC`,
        [],
        (tx, res) => {
          if (res.rows.length > 0) {
            let result = [];
            for (let i = 0; i < res.rows.length; i++) {
              let item = res.rows.item(i);
              result.push({
                id: item.id,
                productName: item.productName,
                quantity: item.quantity,
              });
            }
            setProducts(result);
          }
        },
        error => console.log('cant get Data', error),
      );
    });
  };

  const handlerRemove = data => {
    // let copy = [...products];
    // let result = copy.filter(item => {
    //   return item.id != data.id;
    // });
    // setProducts(result);
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM grocery WHERE ID=?',
        [data.id],
        (tx, res) => {
          let result = [];
          for (let i = 0; i < res.rows.length; i++) {
            let item = res.rows.item[i];
            result.push({
              id: item.id,
              productName: item.productName,
              quantity: item.quantity,
            });
          }
          setProducts(result);
        },
        error => console.log('delete error', error),
      );
    });
    getDataSQLite();
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
      />
      <TextInput
        placeholder="please enter quantity of product"
        keyboardType="number-pad"
        value={product.quantity}
        onChangeText={value => handlerOnChange(value, 'quantity')}
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
      <View style={{padding: 15, flex: 1}}>
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 5,
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
