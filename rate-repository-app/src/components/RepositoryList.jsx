import { FlatList, View, StyleSheet, Pressable } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
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
      // other props
    />
   );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;