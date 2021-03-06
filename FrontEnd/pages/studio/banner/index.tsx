import * as React from 'react';
import { Charts, ZoomType } from '@pages/studio/index';
import { tree } from '@container/split-container/tree';
import './style.styl';

interface IBannerProps {
  charts: Charts;
  canvasSize: Base.Size;
  zoomType: ZoomType;
  isBorder: boolean;
}

interface IBannerItemProps {
  name: string;
  icon: string;
  onClick: () => void;
}

export default class Banner extends React.Component<IBannerProps, undefined> {
  constructor(props: IBannerProps) {
    super(props);
    this.handlePreviewClick = this.handlePreviewClick.bind(this);
  }

  handlePreviewClick() {
    const { canvasSize, charts, zoomType, isBorder } = this.props;
    const previeWindow: any = window.open('preview/index.html');
    previeWindow.onload = () => {
      previeWindow.init(charts, tree, canvasSize, zoomType, isBorder);
    };
  }

  render() {
    return (
      <div className='banner'>
        <span className='banner_head'>Data-Visual</span>
        <div className='banner_right'>
          <BannerIcon name='预览' icon='icon-preview' onClick={this.handlePreviewClick} />
          <BannerIcon name='发布' icon='icon-publish' onClick={() => { }} />
        </div>
      </div>
    );
  }
}

function BannerIcon(props: IBannerItemProps) {
  return (
    <div onClick={props.onClick} className='banner_item'>
      <p className='banner_icon'>
        <i className={props.icon}></i>
      </p>
      <p className='banner_text'>{props.name}</p>
    </div>
  );
}