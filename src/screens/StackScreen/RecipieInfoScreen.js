import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  SectionList,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from '@react-native-material/core';
import { Button, Divider } from "@react-native-material/core";
import { parse as uuidParse } from 'uuid';
import Modal from "react-native-modal";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage"]); // Ignore log notification by message
LogBox.ignoreLogs(["VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead."]); // Ignore log notification by message


function RecipieInfoScreen({ navigation: { navigate }, route }) {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [initialElements, setInitialElements] = useState([]);
  const [deleteElelemnt, setDeleteElement] = useState([])
  const [retrieve, setRetrieve] = useState(true);
  const { id, category, name, ingredients, directions, image } = route.params;
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const valueString = await AsyncStorage.getItem('@storage_Key');
        const value = JSON.parse(valueString);
        console.log('retrieve: ', valueString);
        value === null ? setInitialElements([]) : setInitialElements(value);
        //setInitialElements("")

        

      } catch (error) {
        console.log(error);
      }
    }
    if (retrieve)
      retrieveData();
    setRetrieve(false);
  }, [retrieve])

  const saveData = async (id, username, comment) => {
    try {
      console.log('username: ', username)
      const newObj = {
        id: uuid.v4(),
        recipieid: id,
        username: username,
        comment: comment
      }
      console.log('55: ', newObj)
      console.log('56: ', initialElements)
      const jsonValue = JSON.stringify([...initialElements, newObj]);
      console.log(jsonValue)
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      setInitialElements(JSON.parse(jsonValue));
      console.log('yes');
    } catch (e) {
      onsole.log('Can not save value');
    }
    setIsModalVisible(false)
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      console.log('Get data: ', jsonValue);
      setInitialElements(JSON.parse(jsonValue));
    } catch (e) {
      console.log("Can't read data");
    }
  }


  return (
    <>
      <SafeAreaView style={styles.background}>
        <ScrollView style={styles.container}>
          <View style={{ alignSelf: 'center', padding: 15, }}>
            <Text
              style={styles.title}>
              {name}</Text>
          </View>
          <SafeAreaView>
            <Image
              style={styles.photo}
              source={{ uri: image }}>
            </Image>
          </SafeAreaView>
          <Text
            style={styles.ingredients}>
            Ingredients:
          </Text>
          <SafeAreaView>
            <FlatList
              data={ingredients}
              renderItem={({ item }) => (
                <>
                  <Text style={{ fontFamily: 'Arial', fontSize: "15px", marginLeft: "2%" }}>{item}</Text>
                  <Divider style={{ marginTop: 5 }} />
                </>
              )} />
          </SafeAreaView>
          <Text style={styles.ingredients}>Directions:</Text>
          <Text style={{ fontFamily: 'Arial', fontSize: "15px", marginLeft: "2%" }}>{directions}</Text>
          <Button
            title="Add comment"
            style={styles.commentButton}
            onPress={handleModal}
          />
          <Modal isVisible={isModalVisible}>
            <View style={styles.container3}>
              <TextInput
                style={styles.input}
                placeholder='Enter Username'
                defaultValue={username}
                onChangeText={(value) => setUsername(value)} />
              <TextInput
                style={styles.input}
                placeholder="Insert Comment here"
                defaultValue={comment}
                onChangeText={(value) => setComment(value)} />
              <Button title="Add comment" onPress={() => saveData(id, username, comment)} style={styles.commentBack}/>
              <Button title="Back" onPress={handleModal} style={styles.commentBack} />
            </View>
          </Modal>
          <Text style={styles.ingredients}>Comments:</Text>
                  <View>
                    <FlatList
                      data={initialElements}
                      renderItem={({ item, index }) => {
                        index = item.id
                        if (id == item.recipieid) {
                          return (
                            <>
                              <View style={styles.container2}>
                                <View style={styles.item2}>
                                  <Text
                                    style={{ fontSize: "18px", marginTop: "5%" }}
                                  >{item.username}</Text>
                                </View>
                                <View style={styles.item2}>
                                  <View>
                                    {/* <ButtonComponent
                                      style={{ width: 100, marginTop: "5%" }}
                                      title='Delete'
                                      event={() => deleteComment(item.id, item.recepieid, item.username, item.comment)}>
                                    </ButtonComponent> */}
                                    <Text>{item.comment}</Text>
                                  </View>
                                </View>
                              </View><Divider style={{ marginTop: 5 }} />
                            </>

                          );
                        }
                      }}
                      keyExtractor={(item) => item.id} />
                  </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}


const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    padding: 10,
  },
  container: {
  },
  photo: {
    width: 400,
    height: 400,
  },
  background:
  {
    backgroundColor: '#f6f6f7'
  },
  title: {
    fontFamily: 'Georgia',
    fontSize: "30px",
    alignContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  ingredients: {
    fontFamily: 'Georgia',
    fontSize: "25px",
    alignContent: 'center',
    fontWeight: 'bold',
    marginLeft: "2%",
    marginBottom: 5,
  },
  container2:
  {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  item2:
  {
    width: '50%',
  },
  commentButton:
  {
    width: 150,
    alignItems: "center",
    marginTop: 10,
  },
  commentBack:
  {
    width: 250,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 30
  },
  container3:
  {
    flex: 1,
    marginTop: 245,
    padding: 20,
    marginBottom: 20
  },
});

export default RecipieInfoScreen