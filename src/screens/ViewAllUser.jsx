import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";
import Mybutton from "../components/Mybutton";

const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    temp = [
      {
        user_id: 1,
        user_name: "Teste 1",
        user_contact: "18 82202-2547",
        user_address: "teste1@teste.com",
        user_social: "@teste1.tst",
        user_cnpj: "",
        user_type: "Fisico",
      },
      {
        user_id: 1,
        user_name: "Teste 2",
        user_contact: "18 81203-2549",
        user_address: "teste2@teste.com",
        user_social: "@teste2.tst",
        user_cnpj: "",
        user_type: "Fisico",
      },
      {
        user_id: 1,
        user_name: "Teste 3",
        user_contact: "18 99202-0077",
        user_address: "teste3@teste.com",
        user_social: "@teste3.tst",
        user_cnpj: "",
        user_type: "Fisico",
      },
    ];
    setFlatListItems(temp);
  }, []);

  const handleClick = async () => {
    alert("teste");
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{
          backgroundColor: "#EEE",
          marginTop: 20,
          padding: 30,
          borderRadius: 10,
        }}
      >
        <Text style={styles.textheader}>Código</Text>
        <Text style={styles.textbottom}>{item.user_id}</Text>

        <Text style={styles.textheader}>Nome</Text>
        <Text style={styles.textbottom}>{item.user_name}</Text>

        <Text style={styles.textheader}>Contato</Text>
        <Text style={styles.textbottom}>{item.user_contact}</Text>

        <Text style={styles.textheader}>E-mail</Text>
        <Text style={styles.textbottom}>{item.user_address}</Text>

        <Text style={styles.textheader}>Instagram</Text>
        <Text style={styles.textbottom}>{item.user_social}</Text>

        <Text style={styles.textheader}>CNPJ</Text>
        <Text style={styles.textbottom}>
          {item.user_cnpj || "Não tem CNPJ"}
        </Text>

        <Text style={styles.textheader}>Tipo</Text>
        <Text style={styles.textbottom}>{item.user_type}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#e5272c" />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Mybutton
          title="Exportar"
          btnIcon="file-send-outline"
          customClick={handleClick}
        />
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: "#111",
    fontSize: 12,
    fontWeight: "700",
  },
  textbottom: {
    color: "#111",
    fontSize: 18,
  },
});

export default ViewAllUser;
