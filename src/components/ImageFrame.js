import { useState } from "react";
import { StyleSheet, ActivityIndicator, Image} from "react-native";

export default function ImageFrame({ url, style, spinnerSize, contain }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Image 
        source={{uri: url}} 
        style={{...style, display: !isLoaded ? 'none' : 'flex'}}
        resizeMode={contain ? 'contain' : 'cover'}
        onLoadStart={() => setIsLoaded(false)}
        onLoadEnd={() => setIsLoaded(true)}
      />
      {!isLoaded && <ActivityIndicator size={spinnerSize} animating={!isLoaded} style={styles.spinner}/>}
    </>
  )
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  }
});