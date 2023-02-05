import React, { useContext, useEffect } from 'react'
import { FlatList, Text, View, StyleSheet, Button } from 'react-native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Seats } from '../context/context';


export default function TheatreLayout({ rows, columns }) {

  const { seats, setSeats, occupied, setOccupied, total, setTotal } = useContext(Seats);
  const totalSeats = rows * columns;

  // creating an array of length rows * columns
  const arrData = Array(totalSeats).fill(0);

  // converting array into array of objects
  const data = arrData.map((item, index) => {
    return {
      seatNo: index,
      price: (Math.trunc(index / columns) + 1) * (100),
    }
  })

  // handles seat selection
  const onSeatSelect = (item) => {
    // avoids selecting already booked seat
    if (occupied.some((seat) => seat.seatNo === item.seatNo)) {
      return
    }

    const seatSelected = seats.find((seat) => seat.seatNo === item.seatNo);
    if (seatSelected) {
      setSeats(seats.filter((seat) => seat.seatNo !== item.seatNo));
      setTotal(total - item.price);
    } else {
      setSeats([...seats, item]);
      setTotal(total + item.price);
    }
  };

  // handles book now button
  const handleBooking = (seatsToBeSaved) => {
    if (seats.length === 0) {
      return;
    }
    setOccupied([...occupied, ...seatsToBeSaved]);
    setSeats([]);
    setTotal(0);
  }

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <View style={{ marginTop: 30 }}></View>
        <FlatList
          numColumns={columns}
          data={data}
          keyExtractor={item => item.seatNo}
          renderItem={({ item }) => (
            <Pressable onPress={() => onSeatSelect(item)} >
              {
                seats.some(seat => seat.seatNo === item.seatNo) ? (
                  <View style={[styles.square, styles.selected]}></View>
                ) : occupied?.some(seat => seat.seatNo === item.seatNo) ? (
                  <View style={[styles.square, styles.occupied]}></View>
                ) : (
                  <View style={styles.square}></View>
                )
              }
            </Pressable>
          )}
        />
      </View>
      <View style={styles.row}>
        <View>
          <View style={styles.smallSquare}></View>
          <Text style={styles.smallText}>Vacant</Text>
        </View>
        <View>
          <View style={[styles.smallSquare, styles.selected]}></View>
          <Text style={styles.smallText}>Selected</Text>
        </View>
        <View>
          <View style={[styles.smallSquare, styles.occupied]}></View>
          <Text style={styles.smallText}>Occupied</Text>
        </View>
      </View>
      <View>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>Seats selected</Text>
            <Text style={styles.numbers}>{seats.length}</Text>
          </View>
          <View>
            <Text style={styles.text}>Total</Text>
            <Text style={styles.numbers}>{total}</Text>
          </View>
        </View>
        <Pressable onPress={() => handleBooking(seats)}>
          <Text style={styles.button}>Book now</Text>
        </Pressable>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#fff',
  },
  list: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
    borderTopWidth: 0.5,
    borderColor: '#dad7cd',
  },
  square: {
    borderColor: 'grey',
    borderRadius: 5,
    borderWidth: 0.5,
    margin: 10,
    width: 30,
    height: 30
  },
  smallSquare: {
    borderColor: 'grey',
    borderRadius: 5,
    borderWidth: 0.5,
    margin: 10,
    width: 20,
    height: 20
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#344e41'
  },
  smallText: {
    fontSize: 12,
    textAlign: 'center'
  },
  selected: {
    backgroundColor: '#0096c7'
  },
  occupied: {
    backgroundColor: 'grey'
  },
  button: {
    margin: 15,
    padding: 14,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#588157',
    color: 'white',
  },
  numbers: {
    fontSize: 24,
  }
});
