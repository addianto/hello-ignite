import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle, ActivityIndicator } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
// import { useNavigation } from "@react-navigation/native"
import { Daerah, Tahun, useStores } from "app/models"
import { spacing } from "app/theme"
import { BarChart } from "react-native-gifted-charts"

interface ApbdBarChartScreenProps extends AppStackScreenProps<"ApbdBarChart"> {
  daerah: Daerah
  tahun: Tahun
}

export const ApbdBarChartScreen: FC<ApbdBarChartScreenProps> = observer(function ApbdBarChartScreen(
  props,
) {
  const { apbdStore } = useStores()
  const daerah: Daerah = props.daerah
  const tahun: Tahun = props.tahun

  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      await apbdStore.fetchApbdByDaerahAndTahun(daerah, tahun)
      setIsLoading(false)
    })()
  }, [apbdStore])

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$container} preset="fixed">
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={$title} preset="heading">
            Penyerapan APBD {daerah.daerah} tahun {tahun.tahun}
          </Text>
          <BarChart
            data={[
              { value: apbdStore.apbd?.anggaran ?? 0 },
              { value: apbdStore.apbd?.realisasi ?? 0 },
            ]}
          />
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
