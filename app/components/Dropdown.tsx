import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import RNPickerSelect from "react-native-picker-select"

export interface DropdownProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * A collection of items.
   * The props definition followed the library's PropTypes at: https://github.com/lawnstarter/react-native-picker-select/blob/master/src/index.js
   */
  items: {
    label: string
    value: any
    testID?: string
    inputLabel?: string
    key?: string | number
    color?: string
  }[]
  /**
   * An event handler function invoked for any change in the selected value.
   */
  onValueChange: (value: any) => void
  /**
   * An override for the default placeholder object with a label of `Select an item...` and a value of `null`.
   * Can be assigned to an empty object to disable the placeholder.
   */
  placeholder?: { label: string; value: any }
}

/**
 * Describe your component here
 */
export const Dropdown = observer(function Dropdown(props: DropdownProps) {
  const { style, items, onValueChange, placeholder } = props
  const $styles = [$container, $text, style]

  return (
    <View style={$styles}>
      <RNPickerSelect onValueChange={onValueChange} items={items} placeholder={placeholder} />
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
