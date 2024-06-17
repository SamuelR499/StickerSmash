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
import { DatabaseConnection } from "../database/database-connection";

const ViewAllUser = () => {
  const [flatListItems, setdataList] = useState([]);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const db = await DatabaseConnection.getConnection();
        const flatListItems = await db.getAllAsync("SELECT * FROM Users_Teste");
        setdataList(flatListItems);
      } catch (error) {
        console.error("Error initializing database: ", error);
      }
    };

    initializeDatabase();
  }, []);

  const handleClick = async () => {
    alert("Dado Expotado com sucesso kk LoL");
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.id}
        style={{
          backgroundColor: "#EEE",
          marginTop: 20,
          padding: 30,
          borderRadius: 10,
        }}
      >
        <Text style={styles.textheader}>Código</Text>
        <Text style={styles.textbottom}>{item.id}</Text>

        <Text style={styles.textheader}>Nome</Text>
        <Text style={styles.textbottom}>{item.name}</Text>

        <Text style={styles.textheader}>Contato</Text>
        <Text style={styles.textbottom}>{item.phone}</Text>

        <Text style={styles.textheader}>E-mail</Text>
        <Text style={styles.textbottom}>{item.email_address}</Text>

        <Text style={styles.textheader}>Instagram</Text>
        <Text style={styles.textbottom}>{item.instagram}</Text>

        <Text style={styles.textheader}>CNPJ</Text>
        <Text style={styles.textbottom}>{item.cnpj || "Não tem CNPJ"}</Text>

        <Text style={styles.textheader}>Tipo</Text>
        <Text style={styles.textbottom}>{item.type}</Text>
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
