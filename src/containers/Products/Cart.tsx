import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {
  PRODUCT_COUNT_OPERATION,
  PRODUCT_OBJECT,
  updateCounThunk,
} from './listActions';
import {useAppDispatch} from '../../redux';
import {STATE_OBJECT} from './listReducer';
import {renderSeparator} from './Listing';

interface FooterProps {
  products: PRODUCT_OBJECT[];
}

const Footer: React.FC<FooterProps> = ({products}) => {
  const result = products.reduce(
    (acc, curr) => {
      acc.tCount += curr.count;
      acc.tPrice += curr.count * curr.price;
      return acc;
    },
    {tCount: 0, tPrice: 0},
  );

  const {tCount, tPrice} = result;

  return (
    <View>
      <Text>{`Total count: ${tCount}`}</Text>

      <Text>{`Total price: ${tPrice.toFixed(2)}`}</Text>
    </View>
  );
};

export const Cart = () => {
  const disptach = useAppDispatch();

  const products = useSelector((state: STATE_OBJECT) => state.products);

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={renderSeparator}
        data={products}
        renderItem={({item}) => (
          <>
            {item?.count >= 1 ? (
              <View style={styles.contentContainer}>
                <Text>{`${item.name} x ${item?.count}`}</Text>
                <Text style={styles.price}>{`Price: ${(
                  item.price * item?.count
                ).toFixed(2)}`}</Text>

                <View style={styles.buttonsContainer}>
                  <Pressable
                    onPress={() => {
                      disptach(
                        updateCounThunk(
                          item.id,
                          products,
                          PRODUCT_COUNT_OPERATION.INCREMENT,
                        ),
                      );
                    }}
                    style={styles.buttonText}>
                    <Text>Increment</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      disptach(
                        updateCounThunk(
                          item.id,
                          products,
                          PRODUCT_COUNT_OPERATION.DECREMENT,
                        ),
                      );
                    }}
                    style={styles.buttonText}>
                    <Text>Decrement</Text>
                  </Pressable>
                </View>
              </View>
            ) : null}
          </>
        )}
        ListFooterComponent={<Footer products={products} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, margin: 20},
  separator: {height: 10},
  contentContainer: {backgroundColor: 'salmon', padding: 10},
  price: {paddingTop: 10},
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    backgroundColor: 'cyan',
    marginVertical: 15,
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
