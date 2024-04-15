import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ViewStyle, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen } from "app/components"
// import { useNavigation } from "@react-navigation/native"
import { Daerah, Tahun, useStores } from "app/models"
import RNPickerSelect from "react-native-picker-select"

interface DemoChartScreenProps extends AppStackScreenProps<"DemoChart"> {}

export const DemoChartScreen: FC<DemoChartScreenProps> = observer(function DemoChartScreen(
  _props: DemoChartScreenProps,
) {
  const { daerahStore, tahunStore } = useStores()

  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      await daerahStore.fetchDaerahs()
      await tahunStore.fetchTahuns()
      setIsLoading(false)
    })()
  }, [daerahStore, tahunStore])
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen contentContainerStyle={$screenContentContainer} preset="fixed" safeAreaEdges={["top"]}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <DaerahDropdown data={daerahStore.getDaerahs().slice()} />
          <TahunDropdown data={tahunStore.getTahuns().slice()} />
        </View>
      )}
    </Screen>
  )
})

const TahunDropdown = function TahunDropdown({ data }: { data: Tahun[] }) {
  const toItems = (data: Tahun[]) =>
    data.map((t) => {
      return {
        label: t.tahun.toString(),
        value: t.tahun.toString(),
      }
    })

  return (
    <RNPickerSelect
      onValueChange={(value) => console.info(value)}
      placeholder={{
        label: "Pilih tahun ...",
        value: "",
      }}
      items={toItems(data)}
    />
  )
}

const DaerahDropdown = function DaerahDropdown({ data }: { data: Daerah[] }) {
  const toItems = (data: Daerah[]) =>
    data.map((d) => {
      return {
        label: d.daerah ? d.daerah.toString() : "",
        value: d.id.toString(),
      }
    })

  return (
    <RNPickerSelect
      onValueChange={(value) => console.info(value)}
      placeholder={{
        label: "Pilih daerah ...",
        value: "",
      }}
      items={toItems(data)}
    />
  )
}

const $screenContentContainer: ViewStyle = {
  flex: 1,
}
