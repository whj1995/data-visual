import * as React from 'react';
import { Panel, PanelProps } from './panel';
import * as classNames from 'classnames';
import './style.styl';

type SidebarMode = 'left' | 'right';

interface SidebarProps {
  width?: string;
  height?: string;
  mode?: SidebarMode;
}

interface SidebarState {
  selectKey: number;
  isCollapsed: boolean;
}

export default class Sidebar extends React.Component<SidebarProps, SidebarState> {
  constructor(props: SidebarProps) {
    super(props);
    this.renderIconBar = this.renderIconBar.bind(this);
    this.renderPanel = this.renderPanel.bind(this);
    this.collapsePanel = this.collapsePanel.bind(this);
    this.state = {
      selectKey: 0,
      isCollapsed: false
    };
  }

  static defaultProps = {
    mode: 'left',
    width: '100%',
    height: '100%'
  };

  static Panel = Panel;

  private barNode: HTMLDivElement;

  public barWidth: string;

  renderIconBar(c: React.ReactElement<PanelProps>, i: number) {
    const { icon, title } = c.props;
    return (
      <li key={i} className={classNames(
        { bright: !this.state.isCollapsed && this.state.selectKey === i })}
        onClick={() => this.setState({ selectKey: i, isCollapsed: false })}>
        <span className={icon}>{typeof (icon) === 'undefined' && title}</span>
      </li>
    );
  }

  collapsePanel(event: React.MouseEvent<HTMLElement>) {
    this.setState({ isCollapsed: true });
  }

  renderPanel(c: React.ReactElement<PanelProps>, i: number) {
    if (i !== this.state.selectKey)
      return null;
    return React.cloneElement(c, { collapse: this.collapsePanel } as PanelProps);
  }

  componentDidMount() {
    const style = document.defaultView.getComputedStyle(this.barNode, null);
    this.barWidth = style.width;
  }

  render() {
    const { height, children, mode } = this.props;
    const width = this.state.isCollapsed ? this.barWidth : this.props.width;
    const sidebarCls = classNames('sidebar_container', {
      'sidebar_container_right': this.props.mode === 'right'
    });
    return (
      <div style={{ width: width, minWidth: width, height: height }} className={sidebarCls}>
        <div className='sidebar_bar' ref={(node) => this.barNode = node}>
          <ul>
            {React.Children.map(children, this.renderIconBar)}
          </ul>
        </div>
        <div className={classNames('sidebar_panels', { collapse: this.state.isCollapsed })}>
          {React.Children.map(children, this.renderPanel)}
        </div>
      </div>
    );
  }
}