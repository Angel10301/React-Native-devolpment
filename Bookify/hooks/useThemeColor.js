
import { Colors } from '@/constants/Colors';

/**
 * A custom hook to determine the color based on the current theme (light/dark).
 *
 * @param {object} props - An object containing light and dark color values.
 * @param {string} [props.light] - The color value to use in light mode.
 * @param {string} [props.dark] - The color value to use in dark mode.
 * @param {string} colorName - The name of the color from the `Colors` constant to use as a fallback.
 * @returns {string} The resolved color string for the current theme.
 */
export function useThemeColor(props, colorName) {
  // Determine the current theme (light or dark) from the system or user preference.
  // Falls back to 'light' if colorScheme is null/undefined.
  const theme = useColorScheme() ?? 'light';

  // Check if specific light/dark colors are provided in props.
  // If 'props' is an object and contains a color for the current 'theme', use it.
  if (props && typeof props === 'object' && props[theme]) {
    return props[theme];
  }

  // If no specific prop color is found for the current theme,
  // fall back to the color defined in the global 'Colors' constant based on 'colorName'.
  return Colors[theme][colorName];
}