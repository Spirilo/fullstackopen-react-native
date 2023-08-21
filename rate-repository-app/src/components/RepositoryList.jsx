import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  search: {
    padding: 2,
    borderRadius: 10,
    margin: 5,
    backgroundColor: theme.colors.search
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onEndReach, order, setOrder, searchQuery, onChangeSearch }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  
  const click = (id) => {
    console.log('clicked', id);
    navigate(`/${id}`);
    
  }

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => 
      <Pressable onPress={() => click(item.id)}>
        <RepositoryItem
          id={item.id}
          image={item.ownerAvatarUrl}
          name={item.fullName}
          description={item.description}
          language={item.language}
          forks={item.forksCount}
          stars={item.stargazersCount}
          rating={item.ratingAverage}
          reviews={item.reviewCount}
        />
      </Pressable>
      }
      keyExtractor={item => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
      <>
        <Searchbar
          style={styles.search}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Picker
          selectedValue={order}
          onValueChange={(itemValue) =>
            setOrder(itemValue)
        }>
          <Picker.Item label="Select order.." value="" enabled={false} />
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Oldest repositories" value="oldest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      </>
      }
    />
   );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);

  const onChangeSearch = query => setSearchQuery(query);

  let orderBy;
  let orderDirection;

  switch(order) {
    case 'latest':
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
      break;
    case 'oldest':
      orderBy = 'CREATED_AT';
      orderDirection = 'ASC';
      break;
    case 'highest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'lowest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
  }

  const { repositories, fetchMore } = useRepositories({
    first: 3,
    orderBy,
    orderDirection,
    searchKeyword
  });

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  }

  return (
    <RepositoryListContainer
      repositories={repositories} 
      onEndReach={onEndReach}
      order={order}
      setOrder={setOrder}
      onChangeSearch={onChangeSearch}
      searchQuery={searchQuery}
    />
  )
};

export default RepositoryList;