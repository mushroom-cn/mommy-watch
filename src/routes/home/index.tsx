import { Button } from '@rneui/themed';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Home() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  if (!permission?.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    flex: 1,
  },
  buttonContainer: {
    // backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    margin: 64,
  },
  camera: {
    // flex: 1,
    // height: '100%',
  },
  container: {
    // height: '100%',
    padding: 10,
    width: '100%',
  },
  text: {
    // color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
