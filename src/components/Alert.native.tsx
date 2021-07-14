import { View } from 'moti'
import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, State } from '../@types'
import { alert as alertAction } from '../action-creators'
import { commonStyles } from '../style/commonStyles'

const { flexEnd, whiteText, centerText } = commonStyles

/** An alert component with an optional closeLink that fades in and out. */
const AlertComponent = () => {
  const alert = useSelector((state: State) => state.alert) as NonNullable<Alert>
  const dispatch = useDispatch()

  // eslint-disable-next-line jsdoc/require-jsdoc
  const close = () => {
    dispatch(alertAction(null))
  }

  return (
    <View
      style={[styles.container]}
      from={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'timing',
        duration: 350,
      }}
    >
      {alert?.showCloseLink ? (
        <TouchableOpacity style={flexEnd} onPress={close}>
          <Text style={whiteText}>x</Text>
        </TouchableOpacity>
      ) : null}

      <Text style={[centerText, whiteText]}>{alert?.value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    width: '100%',
    opacity: 0.9,
    zIndex: 1000,
    paddingVertical: 5,
  },
})

export default AlertComponent
