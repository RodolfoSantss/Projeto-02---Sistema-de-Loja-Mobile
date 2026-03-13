import { useEffect, useState } from "react"
import { View, Text, Button, StyleSheet, ScrollView, Image } from "react-native"
import { loadProducts, saveProducts } from "../services/storage"

export default function AdminPanel({ setScreen }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    loadProductsData()
  }, [])

  async function loadProductsData() {
    const data = await loadProducts() || []
    setProducts(data)
  }


  return (
    <View style={styles.container}>

      <Text style={styles.title}>Painel do Administrador</Text>

      <View style={styles.createButton}>
        <Button title="Criar Produto" onPress={() => setScreen("createProduct")} />
      </View>

      <Text style={styles.subtitle}>Produtos cadastrados</Text>

      <ScrollView contentContainerStyle={styles.productList}>
        {products.length === 0 ? (
          <Text style={styles.empty}>Nenhum produto cadastrado</Text>
        ) : (
          products.map(p => (
            <View key={p.id} style={styles.card}>

              <Image
                source={{ uri: p.image || "https://via.placeholder.com/150" }}
                style={styles.image}
              />

              <View style={styles.info}>
                <Text style={styles.name}>{p.name}</Text>
                <Text style={styles.description}>{p.description}</Text>
                <Text style={styles.price}>R$ {p.price}</Text>
                <Text style={styles.stock}>Estoque: {p.stock}</Text>
              </View>

            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.logout}>
        <Button title="Logout" onPress={() => setScreen("login")} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#111827"
  },

  createButton: {
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden"
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },

  productList: {
    paddingBottom: 20
  },

  empty: {
    textAlign: "center",
    marginTop: 30,
    color: "#6B7280"
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12
  },

  info: {
    flex: 1
  },

  name: {
    fontSize: 17,
    fontWeight: "bold"
  },

  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 2
  },

  price: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 4
  },

  stock: {
    fontSize: 14,
    marginTop: 2
  },

  logout: {
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
    color:"#555"
  }

})