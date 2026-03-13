import { useState } from "react"

import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import AdminPanel from "./screens/AdminPanel"
import CreateProduct from "./screens/CreateProduct"
import ProductListScreen from "./screens/ProductList"
import CartScreen from "./screens/CartScreen"

export default function App(){

  const [screen,setScreen] = useState("login")
  const [user,setUser] = useState(null)

  if(screen === "login"){
    return <LoginScreen setScreen={setScreen} setUser={setUser}/>
  }

  if(screen === "register"){
    return <RegisterScreen setScreen={setScreen}/>
  }

  if(screen === "admin"){
    return <AdminPanel setScreen={setScreen}/>
  }

  if(screen === "createProduct"){
    return <CreateProduct setScreen={setScreen}/>
  }

  if(screen === "products"){
    return <ProductListScreen setScreen={setScreen} user={user}/>
  }

  if(screen === "cart"){
    return <CartScreen setScreen={setScreen} user={user}/>
  }

}