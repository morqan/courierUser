import React, {Component} from 'react'
import {Dimensions, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/OrderScreenStyle'
import MapView from 'react-native-maps'
import {Images} from '../Themes'
import MapViewDirections from 'react-native-maps-directions'
import MyButton from '../Components/MyButton'
import I18n from '../I18n'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SlidingPanel from 'react-native-sliding-up-down-panels'
import NewOrderTop from '../Components/NewOrderTop'
import NewOrderBody from '../Components/NewOrderBody'
import PriceAction from '../Redux/PriceRedux'
import OrderAction from '../Redux/OrderRedux'
import AsyncStorage from '@react-native-community/async-storage'
import {orders, prices} from '../Config/API'
import uuidv4 from 'uuid'
const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height
const GOOGLE_MAPS_APIKEY = 'AIzaSyCMfIpRhn8QaGkYQ0I5KPWvFT1kLbA-DAM'

class OrderScreen extends Component {
  componentDidMount () {
    const {startLongLat, endLongLat, distance, duration, price, startLocation, endLocation} = this.props
    console.log(distance, '-distance-')
    console.log(duration, '-duration-')
    this.setState({
      startLocation,
      endLocation,
      price,
      region: {
        latitude: startLongLat[0],
        longitude: startLongLat[1],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922 * ASPECT_RATIO
      },
      coordinates: [
        {
          latitude: startLongLat[0],
          longitude: startLongLat[1]
        },
        {
          latitude: endLongLat[0],
          longitude: endLongLat[1]
        }
      ]
    })
  }

  constructor (props) {
    super(props)

    // AirBnB's Office, and Apple Park
    this.state = {
      loading: false,
      coordinates: [
        {
          latitude: 37.3317876,
          longitude: -122.0054812
        },
        {
          latitude: 37.771707,
          longitude: -122.4053769
        }
      ],
      region: {
        latitude: 37.771707,
        longitude: -122.4053769,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    }

    AsyncStorage.getItem('@token')
      .then((token) => {
        this.token = 'Bearer ' + token
        console.log(token)
      })

    this.mapView = null
  }
  onPress = () => {
    const {startLongLat, endLongLat, distance, duration, startLocation, endLocation} = this.props
    let body = {
      pickup_location: [startLongLat[0], startLongLat[1]],
      drop_location: [endLongLat[0], endLongLat[1]]

    }
    // this.setState({loading: true})
    const self = this
    let price = prices + '?pickup_location=' + startLongLat[0] + ',' + startLongLat[1] + '&drop_location=' + endLongLat[0] + ',' + endLongLat[1]
    // console.log(body, login)
    console.log(body, '-body-')
    console.log(price, '-price-')
    fetch(price, {
      // body: JSON.stringify(body),
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(json)
      .then(status)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data)
        self.props.attemptPrice(data.distance, data.duration, data.price)
        useResponse(data)
      })
      .catch(function (error) {
        console.log(error, '-error-')
      })

    function status (response) {
      console.log(response, '-response-')
      console.log(response.status, '-responseStatus-')
      if (response.distance != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
        // return Promise.reject(new Error(response.statusText))
      }
    }

    function statusOrder (response) {
      console.log(response, '-response-')
      console.log(response.status, '-responseStatus-')
      self.setState({loading: false})
      if (response.id != null) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(response)
        // return Promise.reject(new Error(response.statusText))
      }
    }

    function json (response) {
      console.log(response, '-json-')
      return response.json()
    }

    useResponse = async () => {
      const ordersUrl = orders + uuidv4()
      console.log(ordersUrl, '-orderUrl-')

      let body = {
        bill_amount: self.state.price,
        pickup_ltd: '' + startLongLat[0],
        pickup_lng: '' + startLongLat[1],
        pickup_location: startLocation,
        drop_ltd: '' + endLongLat[0],
        drop_lng: '' + endLongLat[1],
        drop_location: endLocation,
        total_distance: distance,
        total_duration: duration,
        payment_type: 'cash'
      }
      console.log(body, '-body-')
      console.log(this.token, '-bareer + token-')

      let meResponse = await fetch(ordersUrl, {
        body: JSON.stringify(body),
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.token
        }
      })
        .then(json)
        .then(statusOrder)
        .then(function (data) {
          console.log('Request succeeded with JSON response', data)
          if (data.status === 'pending') {
            console.log('içeride')
            self.props.attemptOrder(data.id)
            self.props.attemptOrderSuccess(data)
            self.props.navigation.replace('CourierSeachScreen')
          }
        })
        .catch(function (error) {
          console.log(error, '-error-')
          self.setState({
            error: error.detail,
            loading: false
          })
        })
      // only proceed once promise is resolved
      let meData = await meResponse.json()

      try {
        // const is_company = data.data.is_company||0
        self.props.navigation.navigate('OrderScreen')
      } catch (e) {
        Alert.alert('Error: ' + e.message)
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.latitudeDelta
          }}
          style={{flex: 1}}
          ref={c => this.mapView = c}
          // onPress={this.onMapPress}
        >

          {this.state.coordinates.map((coordinate, index) =>
            <MapView.Marker key={`coordinate_${index}`} image={Images.marker} coordinate={coordinate} />
          )}
          {(this.state.coordinates.length >= 2) && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              waypoints={(this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1) : null}
              destination={this.state.coordinates[this.state.coordinates.length - 1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor='#451E5D'
              optimizeWaypoints
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`)
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`)
                console.log(`Duration: ${result.duration} min.`)

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (width / 20),
                    bottom: (height / 20),
                    left: (width / 20),
                    top: (height / 20)
                  }
                })
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
        <View hide>
          <SlidingPanel
            // onDrag={this.ondraq}
            headerLayoutHeight={320}
            headerLayout={() => <NewOrderTop />}
            slidingPanelLayout={() => <NewOrderBody
              loading={this.state.loading}
              onPress={this.onPress}
              token={this.token}
              orderId={this.state.orderId} />}
          />
        </View>
        <View style={styles.gumburger}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon style={styles.nameBoxIcon} size={30} name='keyboard-backspace' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    startLongLat: state.destinationAddress.startLongLat,
    endLongLat: state.destinationAddress.endLongLat,
    startLocation: state.destinationAddress.startLocation,
    endLocation: state.destinationAddress.endLocation,
    distance: state.price.distance,
    duration: state.price.duration,
    price: state.price.price
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptPrice: (distance, duration, price) => dispatch(PriceAction.priceRequest(distance, duration, price)),
    attemptOrder: (orderId) => dispatch(OrderAction.orderRequest(orderId)),
    attemptOrderSuccess: (payload) => dispatch(OrderAction.orderSuccess(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen)
