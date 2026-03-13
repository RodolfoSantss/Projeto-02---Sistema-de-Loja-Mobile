import { useEffect, useState } from "react"
import { View, Text, Button, StyleSheet, ScrollView } from "react-native"
import CartItem from "../components/CartItem"
import { loadCart, saveCart, loadProducts, saveProducts } from "../services/storage"

export default function CartScreen({ setScreen, user }) {
  const [cart, setCart] = useState([])

  useEffect(() => {
    loadCartData()
  }, [])

  async function loadCartData() {
    const data = await loadCart(user.username)
    setCart(data)
  }

  async function updateCart(newCart) {
    setCart(newCart)
    await saveCart(user.username, newCart)
  }

  function handleIncrease(item) {
    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === item.id) {
        if (cartItem.quantity < cartItem.stock) {
          return { ...cartItem, quantity: cartItem.quantity + 1 }
        } else {
          alert("Estoque insuficiente,não é possível adicionar mais unidades desse produto.")
        }
      }
      return cartItem
    })
    updateCart(updatedCart)
  }

  function handleDecrease(item) {
    const updatedCart = cart
      .map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 0) }
          : cartItem
      )
      .filter(cartItem => cartItem.quantity > 0)

    updateCart(updatedCart)
  }

  async function finishPurchase() {
    const products = await loadProducts()

    const updatedProducts = products.map(product => {
      const cartItem = cart.find(c => c.id === product.id)

      if (cartItem) {
        return { ...product, stock: product.stock - cartItem.quantity }
      }

      return product
    })

    await saveProducts(updatedProducts)

    await saveCart(user.username, [])
    setCart([])

    alert("Sucesso,compra realizada!")
    setScreen("products")
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Seu Carrinho</Text>

      <ScrollView contentContainerStyle={styles.cartList}>
        {cart.length === 0 ? (
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
        ) : (
          cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          ))
        )}
      </ScrollView>

      <View style={styles.footerButtons}>

        {cart.length > 0 && (
          <View style={styles.button}>
            <Button title="Finalizar compra" onPress={finishPurchase} />
          </View>
        )}

        <View style={styles.button}>
          <Button title="Voltar para produtos" onPress={() => setScreen("products")} />
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

  cartList: {
    paddingBottom: 20
  },

  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#6B7280",
    marginTop: 40
  },

  footerButtons: {
    marginTop: 10
  },

  button: {
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden"
  }

})