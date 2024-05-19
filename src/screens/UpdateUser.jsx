import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";

import Mytext from "../components/Mytext";
import Mytextinput from "../components/Mytextinput";
import Mybutton from "../components/Mybutton";
import MyRadioButton from "../components/MyRadioButton";

const UpdateUser = ({ navigation }) => {
  const radiusOptions = [
    "Pessoa Física",
    "Pessoa Jurídica",
    "Profissional da saúde",
  ];
  const [inputUserId, setInputUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userSocial, setUserSocial] = useState("");
  const [userCnpj, setUserCnpj] = useState("");
  const [selectedRadius, setSelectedRadius] = useState(radiusOptions[0]);

  let updateAllStates = (name, contact, address, social, cnpj, userType) => {
    setUserName(name);
    setUserContact(contact);
    setUserAddress(address);
    setUserSocial(social);
    setUserCnpj(cnpj);
    setSelectedRadius(userType);
  };

  let updateUser = () => {
    if (!inputUserId) {
      alert("Por Favor informe o Código!");
      return;
    }
    if (!userName) {
      alert("Por favor informe o Nome !");
      return;
    }
    if (!userContact) {
      alert("Por Favor informe o Telefone !");
      return;
    }
    if (!userAddress) {
      alert("Por Favor informe o E-mail !");
      return;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#e5272c" />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: "space-between" }}
            >
              <Mytext text="Filtro de Usuário" />
              <Mytextinput
                placeholder="Entre com o Código do Usuário"
                style={{ padding: 10 }}
                onChangeText={(inputUserId) => setInputUserId(inputUserId)}
              />
              <Mybutton
                title="Buscar Usuário"
                customClick={() => alert("Click !")}
              />
              {radiusOptions.map((option, index) => (
                <View key={index}>
                  <MyRadioButton
                    label={option}
                    checked={selectedRadius === option}
                    onPress={() => setSelectedRadius(option)}
                  />
                </View>
              ))}
              <Mytextinput
                placeholder="Nome"
                value={userName}
                style={{ padding: 10 }}
                onChangeText={(userName) => setUserName(userName)}
              />
              <Mytextinput
                placeholder="Telefone"
                value={"" + userContact}
                onChangeText={(userContact) => setUserContact(userContact)}
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                value={userAddress}
                placeholder="E-mail"
                onChangeText={(userAddress) => setUserAddress(userAddress)}
                maxLength={225}
                style={{ padding: 10 }}
              />
              <Mytextinput
                value={userSocial}
                placeholder="Instagram (Opcional)"
                onChangeText={(userSocial) => setUserSocial(userSocial)}
                maxLength={225}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="CNPJ (Opcional)"
                value={userCnpj || ""}
                onChangeText={(userCnpj) => setUserCnpj(userCnpj)}
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mybutton title="Atualizar Usuário" customClick={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;
