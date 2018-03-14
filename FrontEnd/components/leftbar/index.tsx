import * as React from 'react';
import { Collapse } from 'antd';
import Sidebar from '@base/sidebar';
import Layer from '@components/layer';
import PieContainer from '@components/pie-container';
import BarContainer from '@components/bar-container';
import { Context as StudioContext } from '@pages/studio';

import './style.styl';

const Panel = Collapse.Panel;

const panelStyle = {
  background: '#000',
  border: 0
};

export default class LeftBar extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <StudioContext.Consumer>
        {({ updateCanvasPos }: any) => (
          <Sidebar onOpenChangeAfter={() => updateCanvasPos()} className='leftbar' mode='left' width='250px' height='100%'>
            <Sidebar.Panel className='component_panel' title='组件'>
              <Collapse bordered={false}>
                <Panel header='饼状图' key='1' style={panelStyle}>
                  <PieContainer />
                </Panel>
                <Panel header='柱状图' key='2' style={panelStyle}>
                  <BarContainer />
                </Panel>
                <Panel header='地图' key='3' style={panelStyle}>
                  <div>这是地图</div>
                </Panel>
              </Collapse>
            </Sidebar.Panel>
            <Sidebar.Panel className='layer_panel' title='图层'>
              <Layer />
            </Sidebar.Panel>
          </Sidebar>
        )}
      </StudioContext.Consumer>
    );
  }
}