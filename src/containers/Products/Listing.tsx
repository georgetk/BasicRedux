import React, {useEffect} from 'react';
import {FlatList, Image, Pressable, Text, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {
  PRODUCT_COUNT_OPERATION,
  fetchProductsThunk,
  updateCountThunk,
} from './listActions';
import {NavigationProps, SCREEN_NAMES} from '../../../App';
import {STATE_OBJECT} from './listReducer';
import {useAppDispatch} from '../../redux';

export const renderSeparator = () => <View style={styles.separator} />;

export const Listing: React.FC<{navigation: NavigationProps}> = ({
  navigation,
}) => {
  const disptach = useAppDispatch();

  const products = useSelector((state: STATE_OBJECT) => state.products);

  useEffect(() => {
    disptach(fetchProductsThunk());
  }, [disptach]);

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={renderSeparator}
        data={products}
        renderItem={({item}) => (
          <View style={styles.contentContainer}>
            <Image
              resizeMode={'contain'}
              source={{uri: item.img}}
              style={styles.image}
            />
            <Text>{item.name}</Text>
            <Text>{`Price: ${item.price}`}</Text>

            <Pressable
              onPress={() => {
                disptach(
                  updateCountThunk(
                    item.id,
                    products,
                    PRODUCT_COUNT_OPERATION.INCREMENT,
                  ),
                );
                navigation.navigate(SCREEN_NAMES.CART);
              }}
              style={styles.buttonText}>
              <Text>Add to cart</Text>
              {item?.count ? <Text>{`In cart: ${item?.count}`}</Text> : null}
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, margin: 20},
  separator: {height: 10},
  contentContainer: {backgroundColor: 'salmon', padding: 10},
  buttonText: {
    backgroundColor: 'cyan',
    marginVertical: 15,
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image: {height: 150, width: 150},
});
