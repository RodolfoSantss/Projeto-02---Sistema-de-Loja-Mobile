import { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"
import { loadUsers } from "../services/storage"

export default function LoginScreen({ setScreen, setUser }) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin() {

    const trimmedUsername = username.trim()
    const trimmedPassword = password.trim()

    if (!trimmedUsername && !trimmedPassword) {
      alert("Erro: Usuário e senha estão vazios")
      return
    }

    if (!trimmedUsername) {
      alert("Erro: Preencha o usuário")
      return
    }

    if (!trimmedPassword) {
      alert("Erro: Preencha a senha")
      return
    }

    if (trimmedUsername.toLowerCase() === "samuel" && trimmedPassword === "prof") {
      setScreen("admin")
      return
    }

    const users = await loadUsers() || []

    const user = users.find(
      u =>
        u.username.toLowerCase() === trimmedUsername.toLowerCase() &&
        u.password === trimmedPassword
    )

    if (user) {
      setUser(user)
      setScreen("products")
    } else {
      alert("Erro: Usuário ou senha inválidos")
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

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
          <Button title="Entrar" onPress={handleLogin} />
        </View>

        <View style={styles.button}>
          <Button title="Criar conta" onPress={() => setScreen("register")} />
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

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 5
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 30
  },

  form: {
    width: "100%",
    maxWidth: 350
  },

  input: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
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
