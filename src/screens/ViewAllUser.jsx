import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import Mybutton from "../components/Mybutton";
import { DatabaseConnection } from "../database/database-connection";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const ViewAllUser = () => {
  const [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const db = await DatabaseConnection.getConnection();
        const result = await db.getAllAsync("SELECT * FROM Users_Teste");
        setFlatListItems(result);
        console.log(result);
      } catch (error) {
        console.error("Error initializing database: ", error);
      }
    };

    initializeDatabase();
  }, []);

  const createCSV = (data) => {
    const header = "Código,Nome,Contato,E-mail,Instagram,CNPJ,Tipo\n";
    const rows = data
      .map(
        (item) =>
          `${item.id},${item.name},${item.phone},${item.email_address},${
            item.instagram
          },${item.cnpj || "Não tem CNPJ"},${item.type}`
      )
      .join("\n");

    return header + rows;
  };

  const handleClick = async () => {
    try {
      const csvData = createCSV(flatListItems);
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const fileUri =
        FileSystem.documentDirectory + `Market-report-${timestamp}.csv`;
      await FileSystem.writeAsStringAsync(fileUri, csvData);

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert(
          "Erro",
          "Compartilhamento não está disponível no dispositivo"
        );
        return;
      }

      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error("Error exporting data: ", error);
      Alert.alert("Erro", "Falha ao exportar os dados");
    }
  };

  const listItemView = (item) => (
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
