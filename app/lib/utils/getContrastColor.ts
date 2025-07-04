import { converter, formatHex, oklch, parse } from "culori"

const toSRGB = converter("rgb")

export default function getContrastingColor(color: string): string {
  const parsed = parse(color)
  if (!parsed) return "#000000"

  const lch = oklch(parsed)
  if (!lch) return "#000000"

  const newL = lch.l > 0.5 ? 0.1 : 0.9

  const contrastOkLCH = { ...lch, l: newL }

  const contrastColor = toSRGB(contrastOkLCH)

  return formatHex(contrastColor)
}
