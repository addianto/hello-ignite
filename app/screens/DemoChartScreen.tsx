import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"

interface DemoChartScreenProps extends AppStackScreenProps<"DemoChart"> {}

export const DemoChartScreen: FC<DemoChartScreenProps> = observer(function DemoChartScreen() {
  function DemoChartScreen(_props: DemoChartScreenProps) {
    const { daerahStore, tahunStore } = useStores()
    
    useEffect(() => {
      ;(async function load() {
        await daerahStore.fetchDaerahs();
        await tahunStore.fetchTahuns()
      })()
    }, [daerahStore, tahunStore])
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="demoChart" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
