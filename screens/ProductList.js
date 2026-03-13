import { useEffect, useState } from "react"
import { View, Text, Button, StyleSheet, ScrollView } from "react-native"
import { loadProducts, loadCart, saveCart } from "../services/storage"
import ProductCard from "../components/ProductCard"

export default function ProductListScreen({ setScreen, user }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    loadProductsData()
  }, [])

  async function loadProductsData() {
    const data = await loadProducts() || []
    setProducts(data)
  }

  async function addToCart(product) {
    const cart = await loadCart(user.username)

    const existing = cart.find(p => p.id === product.id)

    if (existing) {
      if (existing.quantity < product.stock) {
        existing.quantity += 1
      } else {
        alert("Estoque insuficiente,não é possível adicionar mais unidades desse produto.")
        return
      }
    } else {
      if (product.stock > 0) {
        cart.push({ ...product, quantity: 1 })
      } else {
        alert("Produto sem estoque, não é possível adicionar esse produto.")
        return
      }
    }

    await saveCart(user.username, cart)
    alert("Sucesso, produto adicionado ao carrinho")
  }

  function buyNow(product) {
    addToCart(product).then(() => setScreen("cart"))
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Produtos</Text>

      <ScrollView contentContainerStyle={styles.productList}>
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={addToCart}
            onBuyNow={buyNow}
          />
        ))}
      </ScrollView>

      <View style={styles.footerButtons}>
        <View style={styles.button}>
          <Button title="Carrinho" onPress={() => setScreen("cart")} />
        </View>

        <View style={styles.button}>
          <Button title="Logout" onPress={() => setScreen("login")} color="#555" />
        </View>
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
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#111827"
  },

  productList: {
    paddingBottom: 20
  },

  footerButtons: {
    marginTop: 10
  },

  button: {
    marginTop: 8,
    borderRadius: 8,
    overflow: "hidden"
  },

})