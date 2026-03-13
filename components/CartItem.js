import { View, Text, StyleSheet, Button } from "react-native"

export default function CartItem({ item, onIncrease, onDecrease }) {
  const isMax = item.quantity >= item.stock
  const isMin = item.quantity <= 1

  return (
    <View style={styles.card}>

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.text}>
          Quantidade: <Text style={styles.highlight}>{item.quantity}</Text>
        </Text>

        <Text style={styles.stock}>
          Estoque disponível: {item.stock}
        </Text>
      </View>

      <View style={styles.controls}>
        <View style={styles.button}>
          <Button
            title="+"
            onPress={() => onIncrease(item)}
            disabled={isMax}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="-"
            onPress={() => onDecrease(item)}
            disabled={isMin}
          />
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2
  },

  info: {
    flex: 1
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4
  },

  text: {
    fontSize: 14,
    color: "#333"
  },

  highlight: {
    fontWeight: "bold",
    fontSize: 16
  },

  stock: {
    fontSize: 13,
    color: "#666",
    marginTop: 2
  },

  controls: {
    flexDirection: "row",
    gap: 8
  },

  button: {
    borderRadius: 6,
    overflow: "hidden"
  }

})