import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity,Image,  } from 'react-native'
import React from 'react'
import { Button } from '@react-native-material/core'
import { recepieData } from '../../data/data'
import { Divider } from "@react-native-material/core";


export default function CategoriesScreen({ navigation: { navigate } }) {
  return (
    // <View>
    //   <Text>CategoriesScreen</Text>
    //   <Button title="Recipies" onPress= {() => navigate('Recipies')}/>
    // </View>
    <>
    <SafeAreaView style={styles.container}>
        <FlatList
          data={recepieData}
          renderItem={({ item }) => {
            if (item.id <= 3) {
              return (
                <View>
                  <SafeAreaView>
                    <TouchableOpacity
                      onPress={() => navigate('Recipies', item)}>
                      <Image
                        style={styles.photo}
                        source={{uri:item.image}}>
                      </Image>
                      <Text
                        style={styles.text}>
                        {item.category}
                      </Text>
                    </TouchableOpacity>
                    <Divider style={{ marginTop: 15 }} />
                  </SafeAreaView>
                </View>
              )
            }
          }} />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
    photo: {
      width: 414,
      height: 200,
      marginTop: "5%"
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f6f6f7'
    },
    text: {
      marginTop: "-25%",
      backgroundColor: 'white',
      width: 160,
      fontWeight: 'bold',
      fontSize: "35px",
      fontFamily: 'AppleSDGothicNeo-Bold',
    },
  });