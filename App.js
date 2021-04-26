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

      var filePath = RNFS.CachesDirectoryPath + '/com.sample.apk';
      var download = RNFS.downloadFile({
        fromUrl: 'https://download.wetransfer.com//eugv/5e932b07bfdd9da0185023f06f1d234a20210426133607/d0ad858b4c10a6c976b62cda85ac908ab011d33d/com.sony.nfx.app.sfrc_5.2.26.30.2-16522630_minAPI22%28nodpi%29_apkmirror.com.apk?cf=y&token=eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTk0NDQ4NDMsInVuaXF1ZSI6IjVlOTMyYjA3YmZkZDlkYTAxODUwMjNmMDZmMWQyMzRhMjAyMTA0MjYxMzM2MDciLCJmaWxlbmFtZSI6ImNvbS5zb255Lm5meC5hcHAuc2ZyY181LjIuMjYuMzAuMi0xNjUyMjYzMF9taW5BUEkyMihub2RwaSlfYXBrbWlycm9yLmNvbS5hcGsiLCJ3YXliaWxsX3VybCI6Imh0dHA6Ly9wcm9kdWN0aW9uLmJhY2tlbmQuc2VydmljZS5ldS13ZXN0LTEud3Q6OTI5Mi93YXliaWxsL3YxL3Nhcmthci85MDZiYWY3Yzk4ZGMxN2ZhYjhiNWYwYzI2NzE5NjRhMDIwMzYxODk3ZDIxOTAwMzQ0ZjBkYmQ4ZGM5NGZlZDAyNTdkYWZmZTg0OTkxMjIxZmJhOTY3MCIsImZpbmdlcnByaW50IjoiZDBhZDg1OGI0YzEwYTZjOTc2YjYyY2RhODVhYzkwOGFiMDExZDMzZCIsImNhbGxiYWNrIjoie1wiZm9ybWRhdGFcIjp7XCJhY3Rpb25cIjpcImh0dHA6Ly9wcm9kdWN0aW9uLmZyb250ZW5kLnNlcnZpY2UuZXUtd2VzdC0xLnd0OjMwMDAvd2ViaG9va3MvYmFja2VuZFwifSxcImZvcm1cIjp7XCJ0cmFuc2Zlcl9pZFwiOlwiNWU5MzJiMDdiZmRkOWRhMDE4NTAyM2YwNmYxZDIzNGEyMDIxMDQyNjEzMzYwN1wiLFwiZG93bmxvYWRfaWRcIjoxMTk3MzAyNzUzMH19In0.xVh6r9xSd_Prt1a8LMcIdUJjxEa9upsZwoMT-KirbtI',
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


