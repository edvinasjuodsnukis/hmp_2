import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image } from 'react-native'
import React from 'react'
import { Button } from '@react-native-material/core'
import { recepieData } from '../../data/data'
import { Divider } from "@react-native-material/core";

export default function RecipiesScreen({ navigation: { navigate }, route }) {
    const { category } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f6f6f7'}}>
      <FlatList
        data={recepieData}
        renderItem={({ item }) => {
          if (category === item.category) {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => navigate('Recipie', item)}
                >
                  <Image
                    style={styles.photo}
                    source={{uri:item.image}}>
                  </Image>

                  <SafeAreaView style={styles.container}>
                    <Text style={styles.text2}> </Text>
                    <Text style={styles.text}>{item.name}</Text>

                    
                    
                    </SafeAreaView>


                  <Divider style={{ marginTop: 5 }} />


                </TouchableOpacity>



              </View>
            )
          }
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    photo: {
      width: 414,
      height: 200,
      marginTop: "2%"
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      marginTop: "-8%",
      marginBottom: 5,
      fontWeight: 'bold',
      fontSize: "20px",
      fontFamily: 'AppleSDGothicNeo-Bold',
    },
    text2: {
      marginTop:"-10%",
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      height: 20,
      width: 414,
      borderWidth: 2,
  
    },
  });
  