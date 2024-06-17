import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import Mytextinput from "../components/Mytextinput";
import Mybutton from "../components/Mybutton";
import MyRadioButton from "../components/MyRadioButton";
import { DatabaseConnection } from "../database/database-connection";

const RegisterUser = ({ navigation }) => {
  const radiusOptions = [
    "Pessoa Física",
    "Pessoa Jurídica",
    "Profissional da saúde",
  ];

  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userSocial, setUserSocial] = useState("");
  const [userCnpj, setUserCnpj] = useState("");
  const [selectedRadius, setSelectedRadius] = useState(radiusOptions[0]);

  const [db, setDb] = useState(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const database = await DatabaseConnection.getConnection();
        setDb(database);
      } catch (error) {
        console.error("Error initializing database: ", error);
      }
    };

    initializeDatabase();
  }, []);

  const handleCnpjChange = (text) => {
    const cnpj = text.replace(/\D/g, "");

    if (cnpj.length <= 14) {
      let formatted = "";
      for (let i = 0; i < cnpj.length; i++) {
        if (i === 2 || i === 5) {
          formatted += `.${cnpj[i]}`;
        } else if (i === 8) {
          formatted += `/${cnpj[i]}`;
        } else if (i === 12) {
          formatted += `-${cnpj[i]}`;
        } else {
          formatted += cnpj[i];
        }
      }
      setUserCnpj(formatted);
    } else {
      setUserCnpj(text);
    }
  };

  const handlePhoneChange = (text) => {
    const phone = text.replace(/\D/g, "");

    let formatted = "";
    for (let i = 0; i < phone.length; i++) {
      if (i === 0) {
        formatted += `(${phone[i]}`;
      } else if (i === 2) {
        formatted += `) ${phone[i]}`;
      } else if (i === 7) {
        formatted += `-${phone[i]}`;
      } else {
        formatted += phone[i];
      }
    }
    setUserContact(formatted);
  };

  const submitData = async () => {
    if (!db) {
      return { success: false, message: "Database not initialized." };
    }

    try {
      const result = await db.runAsync(
        "INSERT INTO Users_Teste (name, email_address, phone, instagram, cnpj, type) VALUES (?, ?, ?, ?, ?, ?)",
        [
          userName,
          userContact,
          userAddress,
          userSocial,
          userCnpj,
          selectedRadius,
        ]
      );
      if (result.changes) {
        return { success: true, message: "Usuário Registrado com Sucesso !!!" };
      } else {
        return {
          success: false,
          message: "Erro ao tentar Registrar o Usuário !!!",
        };
      }
    } catch (error) {
      return { success: false, message: `Erro: ${error.message}` };
    }
  };

  const register_user = () => {
    if (!userName) {
      alert("Por favor preencha o nome!");
      return;
    }
    if (!userContact) {
      alert("Por favor preencha o contato!");
      return;
    }
    if (!userAddress) {
      alert("Por favor preencha o e-mail!");
      return;
    }

    Alert.alert(
      "Aviso de Coleta de Dados",
      'Nós coletamos os dados solicitados neste formulário. Seus dados serão usados exclusivamente para os fins indicados e não serão compartilhados com terceiros sem o seu consentimento.\n\nAo clicar em "Concordo", você concorda com o uso responsável de seus dados.',
      [
        {
          text: "Cancelar",
          onPress: () => {
            Alert.alert(
              "Confirmação",
              "Tem certeza que deseja sair? O conteúdo do formulário será perdido.",
              [
                {
                  text: "Sim",
                  onPress: () => {
                    setUserName("");
                    setUserContact("");
                    setUserAddress("");
                    setUserSocial("");
                    setUserCnpj("");
                    setSelectedRadius(radiusOptions[0]);
                  },
                },
                {
                  text: "Não",
                },
              ],
              { cancelable: false }
            );
          },
        },
        {
          text: "Concordo",
          onPress: async () => {
            const result = await submitData();
            Alert.alert(
              result.success ? "Sucesso" : "Erro",
              result.message,
              [
                {
                  text: "Ok",
                  onPress: () => {
                    if (result.success) {
                      setUserName("");
                      setUserContact("");
                      setUserAddress("");
                      setUserSocial("");
                      setUserCnpj("");
                      setSelectedRadius(radiusOptions[0]);
                      navigation.navigate("Register");
                    }
                  },
                },
              ],
              { cancelable: false }
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#e5272c" />
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
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: "space-between" }}
            >
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
                onChangeText={(userName) => setUserName(userName)}
                style={{ padding: 10 }}
                value={userName}
              />
              <Mytextinput
                placeholder="Telefone"
                onChangeText={handlePhoneChange}
                maxLength={14}
                keyboardType="numeric"
                style={{ padding: 10 }}
                value={userContact}
              />
              <Mytextinput
                placeholder="E-mail"
                onChangeText={(userAddress) => setUserAddress(userAddress)}
                maxLength={225}
                style={{ padding: 10 }}
                value={userAddress}
              />
              <Mytextinput
                placeholder="Instagram (Opcional)"
                onChangeText={(userSocial) => setUserSocial(userSocial)}
                maxLength={225}
                style={{ padding: 10 }}
                value={userSocial}
              />
              {selectedRadius === radiusOptions[1] && (
                <Mytextinput
                  placeholder="CNPJ"
                  onChangeText={handleCnpjChange}
                  maxLength={18}
                  keyboardType="numeric"
                  style={{ padding: 10 }}
                  value={userCnpj}
                />
              )}
              <Mybutton
                title="Salvar"
                btnIcon="content-save-check-outline"
                customClick={register_user}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
