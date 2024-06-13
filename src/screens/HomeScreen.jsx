import React, { useEffect } from "react";
import { View, SafeAreaView, Image, StatusBar } from "react-native";
import MyImageButton from "../components/MyImageButton";
import { DatabaseConnection } from "../database/database-connection";

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const db = await DatabaseConnection.getConnection();
        await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
          INSERT INTO test (value, intValue) VALUES ('test1', 123);
          INSERT INTO test (value, intValue) VALUES ('test2', 456);
          INSERT INTO test (value, intValue) VALUES ('test3', 789);
          `);

        // `runAsync()` is useful when you want to execute some write operations.
        const result = await db.runAsync(
          "INSERT INTO test (value, intValue) VALUES (?, ?)",
          "aaa",
          100
        );
        console.log(result.lastInsertRowId, result.changes);
        await db.runAsync(
          "UPDATE test SET intValue = ? WHERE value = ?",
          999,
          "aaa"
        ); // Binding unnamed parameters from variadic arguments
        await db.runAsync("UPDATE test SET intValue = ? WHERE value = ?", [
          999,
          "aaa",
        ]); // Binding unnamed parameters from array
        await db.runAsync("DELETE FROM test WHERE value = $value", {
          $value: "aaa",
        }); // Binding named parameters from object

        // `getFirstAsync()` is useful when you want to get a single row from the database.
        const firstRow = await db.getFirstAsync("SELECT * FROM test");
        console.log(firstRow.id, firstRow.value, firstRow.intValue);
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
