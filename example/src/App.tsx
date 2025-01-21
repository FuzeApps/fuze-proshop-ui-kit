import * as React from 'react';
import {
  AmityUiKitProvider,
  AmityUiKitSocial,
} from '@amityco/asc-react-native-ui-kit';

export default function App() {
  return (
    <AmityUiKitProvider
      apiKey="b0ebe05d6bd8a46d4830de15060017da850bdaeaef676e2a"
      apiRegion="us"
      userId={'robert_plant'}
      displayName={'Robert'}
      apiEndpoint="https://api.us.amity.co"
    >
      <AmityUiKitSocial />
    </AmityUiKitProvider>
  );
}
