import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  Text,
} from "react-native";
import MyImageButton from "../components/MyImageButton";
import { DatabaseConnection } from "../database/database-connection";

const HomeScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const db = await DatabaseConnection.getConnection();
        await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            email_address TEXT NOT NULL,
            phone TEXT NOT NULL,
            instagram TEXT NOT NULL,
            cnpj_cpf TEXT NOT NULL
          );
          INSERT INTO Users (name, email_address, phone, instagram, cnpj_cpf) VALUES ('John Doe', 'john@example.com', '123-456-7890', '@john', '12345678901');
          INSERT INTO Users (name, email_address, phone, instagram, cnpj_cpf) VALUES ('Jane Smith', 'jane@example.com', '098-765-4321', '@jane', '23456789012');
          INSERT INTO Users (name, email_address, phone, instagram, cnpj_cpf) VALUES ('Alice Johnson', 'alice@example.com', '555-123-4567', '@alice', '34567890123');
        `);

        const result = await db.runAsync(
          "INSERT INTO Users (name, email_address, phone, instagram, cnpj_cpf) VALUES (?, ?, ?, ?, ?)",
          "aaa",
          "aaa@example.com",
          "000-000-0000",
          "@aaa",
          "45678901234"
        );
        console.log(result.lastInsertRowId, result.changes);
        await db.runAsync(
          "UPDATE Users SET phone = ? WHERE name = ?",
          "999-999-9999",
          "aaa"
        ); // Binding unnamed parameters from variadic arguments
        await db.runAsync("UPDATE Users SET phone = ? WHERE name = ?", [
          "999-999-9999",
          "aaa",
        ]); // Binding unnamed parameters from array
        await db.runAsync("DELETE FROM Users WHERE name = $name", {
          $name: "aaa",
        }); // Binding named parameters from object

        const firstRow = await db.getFirstAsync("SELECT * FROM Users");
        setUsers([firstRow]);
      } catch (error) {
        console.error("Error initializing database: ", error);
      }
    };

    initializeDatabase();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#e5272c" />
      <View style={{ flex: 1, backgroundColor: "#fff2f2" }}>
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
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text>ID: {item.id}</Text>
                <Text>Name: {item.name}</Text>
                <Text>Email: {item.email_address}</Text>
                <Text>Phone: {item.phone}</Text>
                <Text>Instagram: {item.instagram}</Text>
                <Text>CNPJ/CPF: {item.cnpj_cpf}</Text>
              </View>
            )}
          />
          <View style={{ flex: 1 }}>
            <MyImageButton
              title="Registrar Usuário"
              btnColor="#59a412"
              btnIcon="user-plus"
              customClick={() => navigation.navigate("Register")}
            />
            <MyImageButton
              title="Atualizar Usuário"
              btnColor="#f6a700"
              btnIcon="user-circle"
              customClick={() => navigation.navigate("Update")}
            />
            <MyImageButton
              title="Visualizar Todos"
              btnColor="#212529"
              btnIcon="users"
              customClick={() => navigation.navigate("ViewAll")}
            />
            <MyImageButton
              title="Excluir Usuário"
              btnColor="#e5272c"
              btnIcon="user-times"
              customClick={() => navigation.navigate("Delete")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
