import { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"
import { loadUsers, saveUsers } from "../services/storage"

export default function RegisterScreen({ setScreen }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister() {
    const trimmedUsername = username.trim()
    const trimmedPassword = password.trim()

    if (!trimmedUsername || !trimmedPassword) {
      alert("Erro,preencha usuário e senha")
      return
    }

    const users = await loadUsers() || []

    const userExists = users.find(
      u => u.username.toLowerCase() === trimmedUsername.toLowerCase()
    )

    if (userExists) {
      alert("Erro,esse usuário já existe")
      return
    }

    const newUser = {
      username: trimmedUsername,
      password: trimmedPassword
    }

    const updatedUsers = [...users, newUser]

    await saveUsers(updatedUsers)

    alert("Sucesso,usuário cadastrado com sucesso!")

    setUsername("")
    setPassword("")

    setScreen("login")
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Cadastro de Cliente</Text>

      <View style={styles.form}>

        <TextInput
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <View style={styles.button}>
          <Button title="Cadastrar" onPress={handleRegister} />
        </View>

        <View style={styles.button}>
          <Button title="Voltar para login" onPress={() => setScreen("login")} />
        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  form: {
    width: "100%",
    maxWidth: 350
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#111827"
  },

  input: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 16
  },

  button: {
    marginTop: 8,
    borderRadius: 8,
    overflow: "hidden"
  }

})