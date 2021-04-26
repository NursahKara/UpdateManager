import React, { Component } from 'react';
import RNFS from 'react-native-fs';
import ApkInstaller from 'react-native-apk-install';
import {
  Alert,
  Button,
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // If you have something in state, you will be able to provide status to users
      downloadProgress: -1,
    }
  }
  updateApk = () => {
    try {

      var filePath = RNFS.CachesDirectoryPath + '/Youtube_go.com.apk';
      var download = RNFS.downloadFile({
        fromUrl: 'https://www.apkmirror.com/wp-content/uploads/2021/04/14/60838f8f4dada/com.google.android.youtube_16.15.36-1520428480_minAPI21(arm64-v8a,armeabi-v7a,x86,x86_64)(nodpi)_apkmirror.com.apk?verify=1619301641-qeb4WP3uCcLvnAe9-UyeJA7ZUDqld5WfKmy8R3EExyk',
        toFile: filePath,
        progress: res => {
          console.log(((res.bytesWritten / res.contentLength) * 100).toFixed(2) + '%');
          this.setState({ downloadProgress: ((res.bytesWritten / res.contentLength) * 100).toFixed(2) + '%'  });
        },
        progressDivider: 1
      });

      download.promise.then(result => {
        if (result.statusCode == 200) {
          console.log(filePath);
          ApkInstaller.install(filePath);
        }
        else {
          Alert.alert(
            "Apk Bulunamadı!"
          )
        }
      });
    }
    catch (error) {
      console.warn(error);
    }
  }

  onPressButton = () => {
    this.updateApk();
  }
  render() {
    return (
      <View style={{ alignItems: "center" ,marginTop:100}}>
        <Button title="Güncelle" onPress={this.onPressButton.bind(this)} />
        {this.state.downloadProgress != -1 && (
          <Text style={styles.instructions}>
            Download Progress: {this.state.downloadProgress}
          </Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    fontSize: 12,
    textAlign: "left",
    color: "#333333",
    marginBottom: 5
  }
});


