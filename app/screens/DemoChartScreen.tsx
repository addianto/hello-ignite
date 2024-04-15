import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, View, ActivityIndicator } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Dropdown, Screen } from "app/components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { Text } from "../components"
import { spacing } from "app/theme"

interface DemoChartScreenProps extends AppStackScreenProps<"DemoChart"> {}

export const DemoChartScreen: FC<DemoChartScreenProps> = observer(function DemoChartScreen(
  _props: DemoChartScreenProps,
) {
  const { daerahStore, tahunStore } = useStores()

  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedDaerah, setSelectedDaerah] = React.useState("")
  const [selectedTahun, setSelectedTahun] = React.useState("")

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
    <Screen contentContainerStyle={$container} preset="scroll" safeAreaEdges={["top"]}>
      <Text preset="heading" text="Penyerapan APBD" style={$title} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Dropdown
            onValueChange={(value) => {
              setSelectedDaerah(value)
            }}
            items={daerahStore.daerahs.map((d) => ({ label: d.daerah, value: d.id }))}
            placeholder={{ label: "Pilih daerah ...", value: "" }}
          />
          <Dropdown
            onValueChange={(value) => {
              setSelectedTahun(value)
            }}
            items={tahunStore.tahuns.map((t) => ({
              label: t.tahun ? t.tahun.toString() : "",
              value: t.tahun ? t.tahun.toString() : "",
            }))}
            placeholder={{ label: "Pilih tahun ...", value: "" }}
          />
          <Text preset="subheading">
            APBD {daerahStore.getDaerahStringById(Number(selectedDaerah))} Tahun {selectedTahun}
          </Text>
        </View>
      )}
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  fontSize: spacing.sm,
}
