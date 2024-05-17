import * as React from "react";
import { View, SafeAreaView, Image, Text } from "react-native";

const RegisterUser = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Image
          source={require("../../assets/images/FTW.png")}
          style={{
            marginVertical: 30,
            margin: 10,
            alignSelf: "center",
            width: 350,
            height: 140,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text>REGISTER</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
