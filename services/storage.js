import AsyncStorage from '@react-native-async-storage/async-storage'

export async function saveUsers(users){
  await AsyncStorage.setItem("users", JSON.stringify(users))
}

export async function loadUsers(){
  const data = await AsyncStorage.getItem("users")
  return data ? JSON.parse(data) : []
}

export async function saveProducts(products){
  await AsyncStorage.setItem("products", JSON.stringify(products))
}

export async function loadProducts(){
  const data = await AsyncStorage.getItem("products")
  return data ? JSON.parse(data) : []
}

export async function saveCart(username, cart){
  await AsyncStorage.setItem("cart_" + username, JSON.stringify(cart))
}

export async function loadCart(username){
  const data = await AsyncStorage.getItem("cart_" + username)
  return data ? JSON.parse(data) : []
}

export async function clearCart(username){
  await AsyncStorage.removeItem("cart_" + username)
}

export async function clearProducts(){
  await AsyncStorage.removeItem("products")
}

export async function clearUsers(){
  await AsyncStorage.removeItem("users")
}
