import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
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
      ListHeaderComponent={
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
      </Picker>}
    />
   );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');

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

  const { repositories } = useRepositories(orderBy, orderDirection);

  return (
    <RepositoryListContainer
      repositories={repositories} 
      order={order}
      setOrder={setOrder}
    />
  )
};

export default RepositoryList;