import { ScrollView, View, TouchableOpacity, Text, Button, StyleSheet, ActivityIndicator, Animated } from "react-native";
import { useState, useEffect, useRef } from 'react';
import { getThumbs } from "../api";
import ImageFrame from "./ImageFrame";

export const Thumbs = ({ setSelectedImg, page }) => {
  const [images, setImages] = useState([]);
  const [isErrorThumbs, setIsErrorThumbs] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [counter, setCounter] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    fadeAnim.setValue(1);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  
  useEffect(() => {
    fadeOut();
    setIsLoaded(false);
    getThumbs(page).then(res => {
      setImages(res.results);
    })
    .catch(() => setIsErrorThumbs(true))
    .finally(() => {
      setIsLoaded(true);
      fadeIn();
    });
  }, [counter, page]);


  return (
    <>
      {isLoaded ?
        <Animated.View style={{...styles.container, opacity: fadeAnim}}>
          <ScrollView contentContainerStyle={{ paddingBottom: 10}}
          >
            {!isErrorThumbs ? (
            <View style={styles.row}>
              {images.length !== 0 && (
                images.map(img => (
                  <TouchableOpacity 
                    key={img.id} 
                    onPress={() => {
                      setSelectedImg(img.id);
                  }}>
                    <View style={styles.card}>
                      <ImageFrame 
                        url={img.urls.thumb} 
                        style={styles.img}
                      />
                    <Text style={styles.textContainer}>{img.user.first_name} {img.user.last_name}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>) 
            : (
            <View style={styles.viewError}>
              <Text style={styles.errorText}>Failed loading thumbs</Text>
              <Button
                title='Try again'
                onPress={() => setCounter(prev => prev+1)}
              />
            </View>
            )}
          </ScrollView>
        </Animated.View>
      : (
        <ActivityIndicator size={150} style={{flex: 1}}/>
      )}
    </>
  )
}; 

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    padding: 10,
    paddingBottom: 5,
  },
  img: {
    flex: 1,
    height: 100,
    width: 100,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    width: 150,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  textContainer: {
    fontSize: 20,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 30,
    color: '#fff',
  },
  viewError: {
    backgroundColor: '#212121',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
