import { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet,  ScrollView } from "react-native"
import { loadProducts, saveProducts } from "../services/storage"

export default function CreateProduct({ setScreen }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [stock, setStock] = useState("")

  async function handleCreate() {
    const trimmedName = name.trim()
    const trimmedDescription = description.trim()
    const trimmedPrice = price.trim()
    const trimmedStock = stock.trim()

    if (!trimmedName || !trimmedDescription || !trimmedPrice || !trimmedStock) {
      alert("Erro, preencha todos os campos")
      return
    }

    if (isNaN(trimmedPrice) || Number(trimmedPrice) <= 0) {
      alert("Erro,preço inválido")
      return
    }

    if (!Number.isInteger(Number(trimmedStock)) || Number(trimmedStock) < 0) {
      alert("Erro", "Estoque inválido")
      return
    }

    const products = await loadProducts() || []

    const newProduct = {
      id: Date.now(),
      name: trimmedName,
      description: trimmedDescription,
      price: Number(trimmedPrice),
      image: image.trim() || "https://via.placeholder.com/150",
      stock: Number(trimmedStock)
    }

    products.push(newProduct)
    await saveProducts(products)

    alert("Sucesso, produto criado com sucesso!")

    setName("")
    setDescription("")
    setPrice("")
    setImage("")
    setStock("")

    setScreen("admin")
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>Novo Produto</Text>
      <Text style={styles.subtitle}>Adicione um produto à loja</Text>

      <View style={styles.form}>

        <TextInput
          placeholder="Nome do produto"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />

        <TextInput
          placeholder="Preço"
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Estoque"
          value={stock}
          onChangeText={setStock}
          style={styles.input}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Link da imagem"
          value={image}
          onChangeText={setImage}
          style={styles.input}
        />

        <View style={styles.button}>
          <Button title="Salvar produto" onPress={handleCreate} />
        </View>

        <View style={styles.button}>
          <Button title="Voltar" onPress={() => setScreen("admin")} />
        </View>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 5
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 25
  },

  form: {
    width: "100%",
    maxWidth: 400
  },

  input: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
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