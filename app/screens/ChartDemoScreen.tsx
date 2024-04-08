import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { PieChart } from "react-native-gifted-charts"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ChartDemoScreenProps extends AppStackScreenProps<"ChartDemo"> {}

export const ChartDemoScreen: FC<ChartDemoScreenProps> = observer(function ChartDemoScreen() {
  // Data source for the example was taken from: https://djpk.kemenkeu.go.id/portal/data/apbd?periode=4&tahun=2024&provinsi=10&pemda=21
  const dataPosturAPBD = [
    { value: 3850.93, color: "red", text: "3850,93 M" },
    { value: 4158.59, color: "green", text: "4158,59 M" },
    { value: 307.65, color: "blue", text: "307,65 M" },
  ]
  
  const dataPosturAPBDData = {
    dataSets: [{
      label: "APBD",
      values: [
        { value: 3850.93, label: "A" },
        { value: 4158.59, label: "B" },
        { value: 307.65, label: "C" },
      ],
    }],
  }
  
  let focusValue = ""

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text preset="heading">Postur APBD Kota Depok (April 2024)</Text>
      <Text preset="subheading">react-native-gifted-charts</Text>
      <View>
        <PieChart
          donut
          showText
          radius={150}
          textBackgroundColor="#333"
          textColor="white"
          textSize={16}
          fontWeight="bold"
          // TODO: Figure out why onPress did not work
          onPress={(item, _) => {
            console.log("Press")
            console.log("Item Text: " + item.text)
            focusValue = item.text
          }}
          centerLabelComponent={() => {
            return (
              <Text preset="bold">{focusValue}</Text>
            )
          }}
          focusOnPress
          data={dataPosturAPBD}
        />
      </View>
      <Text>Sumber: https://djpk.kemenkeu.go.id/portal/data/apbd?periode=4&tahun=2024&provinsi=10&pemda=21</Text>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
