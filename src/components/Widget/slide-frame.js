/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import 'Style/components/slideFrame.less';

/**
 * 侧拉组件，该组件内部组件将自带this.props.close(params)方法关闭侧拉栏
 */
class SlideFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: 'slide-frame animated hide',
      showFlag: false,
    };
  }

  /**
   * 根据传入的show值进行判断是否显示
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const { showFlag } = this.state
    if (nextProps.show !== showFlag)
      nextProps.show ? this.show() : this.close()
  }

  /**
   * 组装方法
   * @param content 内部组件
   * @return {*} 给组件添加this.props.close(params)方法,params为返回到最外层的值
   *             同时添加外部传入的props为内部组件可用
   */
  wrapClose = content => {
    const { params } = this.props
    const newProps = {
      close: this.close,
      params,
      // eslint-disable-next-line no-return-assign
      ref: ref => (this.content = ref),
    };
    return React.createElement(
      content,
      { ...params, ...newProps}
    );
  };

  show = () => {
    this.setState({
      className: 'slide-frame animated slideInRight',
      showFlag: true,
    });
  };

  /**
   * 关闭方法，如果内部有params参数，则传出至afterClose方法
   * @param params
   */
  close = params => {
    this.setState({
      className: 'slide-frame animated slideOutRight',
      showFlag: false,
    });
    setTimeout(() => {
      this.setState(
        {
          className: 'slide-frame animated hide',
        },
        () => {
          const { afterClose } = this.props
          afterClose(params);
          try {
            let form = null;
            console.log(this)
            if (this.content.getWrappedInstance) {
              form = this.content.getWrappedInstance();
              if (form) {
                form.resetFields();
              }
            }
          } catch (e) {
          }
        }
      );
    }, 501);
  };

  render() {
    const { width, show, title, onClose, hasMask, hasFooter, children } = this.props;
    const { showFlag, className } = this.state
    return (
      <div>
        <div
          className={
            hasMask && showFlag ? 'slide-mask' : 'hide'
          }
          onClick={onClose}
        />{' '}
        <div
          className={className}
          style={{
            width: width || '50vw',
          }}
        >
          <div className="slide-title">
            {' '}
            {title}{' '}
            <Icon
              type="close"
              className="close-icon"
              onClick={onClose}
            />
          </div>
          <div
            className={`slide-content ${!hasFooter && 'no-footer'}`}
          >
            {' '}
            {showFlag && children}{' '}
          </div>{' '}
        </div>{' '}
      </div>
    );
  }
}

SlideFrame.propTypes = {
  width: PropTypes.any, // 宽度
  title: PropTypes.string, // 标题
  show: PropTypes.bool, // 是否显示
  hasMask: PropTypes.bool, // 是否有遮罩层
  onClose: PropTypes.func, // 点击遮罩层或右上方x时触发的事件
  content: PropTypes.oneOfType([PropTypes.func, PropTypes.string]), // 内容component，包裹后的元素添加this.props.close方法进行侧滑关闭
  afterClose: PropTypes.func, // 关闭后触发的事件，用于更新外层的show值
  params: PropTypes.object, // 外部传入内部组件props
  hasFooter: PropTypes.bool, // 是否有底部操作区
  okText: PropTypes.string, // 确认按钮字样
  cancelText: PropTypes.string, // 取消按钮字样
};

SlideFrame.defaultProps = {
  width: '50vw',
  onClose: () => { },
  okText: '保存',
  cancelText: '取消',
  hasMask: true,
  afterClose: () => { },
  params: {},
  hasFooter: true,
};

export default SlideFrame;
