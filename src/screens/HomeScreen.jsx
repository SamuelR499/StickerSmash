import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Image, StatusBar } from "react-native";
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
          CREATE TABLE IF NOT EXISTS Users_Teste (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            email_address TEXT NOT NULL,
            phone TEXT NOT NULL,
            instagram TEXT,
            cnpj TEXT,
            type TEXT NOT NULL
          );
        `);
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
