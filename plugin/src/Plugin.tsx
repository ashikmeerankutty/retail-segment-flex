import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomTaskList from '../src/components/CustomTaskList/CustomTaskList';
import CustomPanel2 from '../src/components/CustomPanel2/CustomPanel2';

const PLUGIN_NAME = 'Plugin';

export default class Plugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    const options: Flex.ContentFragmentProps = { sortOrder: -1 };
    flex.AgentDesktopView.Panel1.Content.add(<CustomTaskList key="Plugin-component" />, options);
     // Custom Panel 2
    flex.AgentDesktopView.Panel2.Content.add(<CustomPanel2 key="herth"/>, options);
    flex.CRMContainer.Content.replace(<div key="empty-div-component" />, options);
  }
}
