import { Href, Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser'; // Renamed to avoid conflict with `openBrowserAsync`
import { Platform } from 'react-native';
import React from 'react'; // Using JSX, React needs to be imported

export function ExternalLink({ href, ...rest }) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await WebBrowser.openBrowserAsync(href); // Use WebBrowser.openBrowserAsync
        }
      }}
    />
  );
}