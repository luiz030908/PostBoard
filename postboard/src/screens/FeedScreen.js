import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, RefreshControl,
} from 'react-native';
import { getPosts } from '../services/api';
import PostCard       from '../components/PostCard';
import LoadingIndicator from '../components/LoadingIndicator';
import EmptyState     from '../components/EmptyState';
 
export default function FeedScreen({ navigation }) {
  const [posts, setPosts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [erro, setErro]         = useState(null);
  const [refreshing, setRefreshing] = useState(false);
 
  // Botão '+' no header para criar novo post
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('FormularioTab')}
          style={{ marginRight: 4, padding: 4 }}
        >
          <Text style={{ color: '#fff', fontSize: 28, fontWeight: '300' }}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
 
  // Carrega os posts ao montar a tela
  useEffect(() => {
    carregarPosts();
  }, []);
 
  // ── Busca posts da API ─────────────────────────────────
  async function carregarPosts() {
    try {
      setLoading(true);
      setErro(null);
      const dados = await getPosts();
      setPosts(dados);
    } catch (e) {
      setErro('Não foi possível carregar os posts.\nVerifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }
 
  // ── Pull-to-refresh ───────────────────────────────────
  async function onRefresh() {
    try {
      setRefreshing(true);
      setErro(null);
      const dados = await getPosts();
      setPosts(dados);
    } catch (e) {
      setErro('Erro ao atualizar.');
    } finally {
      setRefreshing(false);
    }
  }
 
  // ── Tela de loading inicial ───────────────────────────
  if (loading) {
    return <LoadingIndicator mensagem="Carregando posts..." />;
  }
 
  // ── Tela de erro ──────────────────────────────────────
  if (erro && posts.length === 0) {
    return (
      <EmptyState
        icone="⚠️"
        titulo="Ops! Algo deu errado"
        mensagem={erro}
        textoBotao="Tentar novamente"
        onBotao={carregarPosts}
      />
    );
  }
 
  // ── Lista de posts ────────────────────────────────────
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => navigation.navigate('Detalhes', { post: item })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icone="📭"
            titulo="Nenhum post encontrado"
            mensagem="A lista está vazia no momento."
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#1a56db']}
            tintColor="#1a56db"
          />
        }
        contentContainerStyle={
          posts.length === 0 ? styles.listaVazia : styles.lista
        }
        ItemSeparatorComponent={() => <View style={styles.separador} />}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  lista: {
    padding: 16,
    paddingBottom: 32,
  },
  listaVazia: {
    flex: 1,
    justifyContent: 'center',
  },
  separador: {
    height: 12,
  },
});