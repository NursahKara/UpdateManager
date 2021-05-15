import React, { Component } from 'react';
import RNFS from 'react-native-fs';
import ApkInstaller from 'react-native-apk-install';
import {
  Alert,
  Button,
  View,
  Text,
  StyleSheet,
  Linking
} from 'react-native';
import RNAndroidInstalledApps from 'react-native-android-installed-apps-unblocking';
import VersionCheck from 'react-native-version-check';
var pkg = require('./package.json');
var version = pkg.version;
var packageName = VersionCheck.getPackageName();
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // If you have something in state, you will be able to provide status to users
      downloadProgress: -1,
      url:''
    }
  
  }

  updateApk = (url) => {
    try {

      var filePath = RNFS.CachesDirectoryPath + '/' +packageName;
      var download = RNFS.downloadFile({
        fromUrl: url,
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

  checkUpdates = () =>{
    try{
      fetch('http://192.168.1.58:5501' + '/update/checkupdates?packagename='+packageName+'&version='+version, {
        method: 'GET',
        headers: {
          'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IklGU0FQUCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdXNlcmRhdGEiOiJ7XCJVc2VybmFtZVwiOlwiSUZTQVBQXCIsXCJFbmNyeXB0ZWRQYXNzd29yZFwiOlwibkgvM3c1U3p3SWZnSDliaDdLY25oUT09XCJ9IiwibmJmIjoxNjIxMDk0NDYzLCJleHAiOjE2MjExODA4NjMsImlzcyI6InNmaS5jb20udHIiLCJhdWQiOiJzZmkuYXVkaWVuY2UifQ.VFr9lXxqbs3BZNcFW0wxx-YscHx36SjEfkmU0kE-yGU'
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log('responseJson', responseJson);
          this.setState({url:responseJson.url});
          if(responseJson.upToDate == true) {
            Alert.alert(
              "Alert Title",
              "Yeni bir güncelleme mevcut. Yüklensin mi?",
              [
                {
                  text: "Yükle",
                  onPress: () => this.updateApk(responseJson.url)
                },
                { text: "Kapat", onPress: () => console.log("Kapat Pressed") }
              ]
            );
          }
         
        })
        .catch((error)=>{
          console.warn(error);
        });
    }
    catch(error){
      console.warn(error);
    }
  }
  onPressButton = () => {
    this.checkUpdates();
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


