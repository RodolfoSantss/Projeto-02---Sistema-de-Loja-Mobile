import { View, Text, Button, StyleSheet, Image } from "react-native"

export default function ProductCard({ product, onAdd }) {
  const isOutOfStock = product.stock === 0

  return (
    <View style={styles.card}>

      <Image
        source={{ uri: product.image?.trim() || "https://via.placeholder.com/300" }}
        style={styles.image}
      />

      <View style={styles.info}>

        <Text style={styles.name}>{product.name}</Text>

        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.price}>R$ {product.price}</Text>

        <Text
          style={[
            styles.stock,
            isOutOfStock && styles.outOfStock
          ]}
        >
          {isOutOfStock ? "Sem estoque" : `Estoque: ${product.stock}`}
        </Text>

        {onAdd && (
          <View style={styles.button}>
            <Button
              title={isOutOfStock ? "Sem estoque" : "Adicionar ao carrinho"}
              onPress={() => onAdd(product)}
              disabled={isOutOfStock}
            />
          </View>
        )}

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3
  },

  image: {
    width: "100%",
    height: 160
  },

  info: {
    padding: 14
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4
  },

  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6
  },

  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4
  },

  stock: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10
  },

  outOfStock: {
    color: "#DC2626",
    fontWeight: "bold"
  },

  button: {
    marginTop: 6,
    borderRadius: 8,
    overflow: "hidden"
  }

})