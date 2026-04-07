import { View, Text } from 'react-native'
import React from 'react'

export default function SobreScreen() {
  return (
    <View styles={styles.container}>
        <Text styles={styles.titulo}> ℹ️ Postboard Mobile App</Text>
        <Text styles={styles.subtitulo}>Ivan Santos</Text>
        <Text styles={styles.subtitulo}>Versão 1.0</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e3a5f',
        marginBottom: 8
    },
    subtitulo: {
        fontSize: 15,
        color: '#6b7280',
        textAlign: 'center'
    },
});