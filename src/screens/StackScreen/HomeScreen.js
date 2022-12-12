import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Button } from '@react-native-material/core'

const HomeScreen = ({ navigation: { navigate } }) => {
  return (
    <View>
      <Image 
      style={{width: 400, height: 200}}
      source={{uri: 'https://data.whicdn.com/images/330427451/original.gif'}} />
      <Text style={styles.text}>Find and share everyday cooking inspiration on this app. Discover recipes, cooks, videos, and how-tos based on the food you love and the friends you follow.</Text>
      <Button title="Categories" onPress={() => navigate('Categories')} style={styles.categoriesButton} />
    </View>
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
    fontWeight: 'bold',
    fontSize: "35px",
    textAlign: 'center'
  },
  categoriesButton: {
    backgroundColor: "#FFA500",
    marginTop: 20
  }
});

export default HomeScreen