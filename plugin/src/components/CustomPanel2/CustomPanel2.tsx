import React, { useState } from 'react';

import { Alert } from '@twilio-paste/core/alert';
import { Theme } from '@twilio-paste/core/theme';
import { Text } from '@twilio-paste/core/text';
import NameHeader from './NameHeader';

const CustomPanel2 = (): JSX.Element | null => {
  
  return (
    <Theme.Provider theme="default">
      <NameHeader/>
    </Theme.Provider>
  );
};

export default CustomPanel2;
