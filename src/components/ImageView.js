import { useEffect, useState } from 'react';
import { Modal, View, Button, StyleSheet, ActivityIndicator } from "react-native";
import ImageFrame from './ImageFrame';
import { getPhoto } from '../api';

export const ImageView = ({ selectedImg, setSelectedImg }) => {
  const [imageToShow, setImageToShow] = useState();

  useEffect(() => {
    getPhoto(selectedImg).then(res => setImageToShow(res));
  }, [selectedImg]);

  return (
    <Modal 
      transparent
      animationType='fade'
      visible={selectedImg !== ''}
      onRequestClose={() => setSelectedImg('')}
    >
      <View style={styles.modal}> 
        {imageToShow 
        ? <ImageFrame 
          url={imageToShow.urls?.regular} 
          style={styles.imgInModal}
          spinnerSize={150}
          contain
          /> 
        : <ActivityIndicator size={150} style={styles.spinner}/>}
        <Button
          title='Close'
          onPress={() => setSelectedImg('')}
        />
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8);',
  },
  imgInModal: {
    flex: 1,
    height: 100,
    width: null,
  },
  spinner: {
    flex: 1,
  }
})