// @flow

import React, { Component } from 'react';

import {
  ScrollView,
  Animated,
  PanResponder,
  BackHandler,
} from 'react-native';

import {
  StyleSheet,
  InjectedComponent,
  Platform,
  StatusBar,
} from '~/common';

import {
  TodayDetailCardImage,
  TodayDetailCardContent,
  TodayDetailCardClose,
  TodayDetailCardFloatingDownload,
} from '~/components';

import {
  TodayDetailCardStore,
} from '~/stores';

type Props = {
  TodayDetailCardStore: TodayDetailCardStore,
};

type State = {
  hasSwipeCloseAnimation: boolean,
};

const SWIPE_CLOSE_THRESHOLD = 30;

const SWIPE_MODE = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
};

type SwipeModeType = $Keys<typeof SWIPE_MODE>;

class TodayDetailCardComponent extends Component<Props, State> {
  state ={
    hasSwipeCloseAnimation: false,
  };

  _scrollViewRef = React.createRef<Class<ScrollView>>();

  _lastScrollY: number = 0;

  _swipeCloseAnimation = new Animated.Value(0);

  _isHiding = false;

  _swipeMode: SwipeModeType;

  _panResponder;

  _floatingDownloadRef = React.createRef();

  _floatingDownloadScrollThreshold: number;

  _backkHandlerEvent;

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this._onMoveShouldSetPanResponder,
      onPanResponderGrant: this._onPanResponderGrant,
      onPanResponderMove: this._onPanResponderMove,
      onPanResponderRelease: this._onPanResponderRelease,
      onPanResponderTerminate: this._onPanResponderRelease,
    });

    if (Platform.isAndroid) {
      this._backkHandlerEvent = BackHandler.addEventListener('hardwareBackPress', this._onPressHardwareBack);
    }
  }

  componentWillUnmount() {
    this._backkHandlerEvent && this._backkHandlerEvent.remove();
  }

  _onPressHardwareBack = () => {
    if (this.props.TodayDetailCardStore.isVisible) {
      this._hide();
      return true;
    }

    return false;
  }

  _onMoveShouldSetPanResponder = (event, gestureState) => {
    if (this._isHiding) {
      return false;
    }

    const {
      moveX,
      dx,
      dy,
    } = gestureState;

    if (moveX < 44 && dx > 4) {
      this._swipeMode = SWIPE_MODE.HORIZONTAL;
      return true;
    } if (this._lastScrollY === 0 && dy > 4) {
      this._swipeMode = SWIPE_MODE.VERTICAL;
      return true;
    }

    return false;
  }

  _onPanResponderGrant = () => {
    this._swipeCloseAnimation.setValue(0);

    this.setState({
      hasSwipeCloseAnimation: true,
    }, () => {
      this.props.TodayDetailCardStore.hasDimmedLayer = true;
    });
  }

  _onPanResponderMove = (event, gestureState) => {
    const move = this._swipeMode === SWIPE_MODE.HORIZONTAL ? gestureState.dx : gestureState.dy;

    if (move > SWIPE_CLOSE_THRESHOLD) {
      this._swipeHide();
      return;
    }

    this._swipeCloseAnimation.setValue(move / SWIPE_CLOSE_THRESHOLD);
  }

  _onPanResponderRelease = (event, gestureState) => {
    if (this._isHiding) return;

    const move = this._swipeMode === SWIPE_MODE.HORIZONTAL ? gestureState.dx : gestureState.dy;

    if (move >= SWIPE_CLOSE_THRESHOLD / 2) {
      this._swipeHide();
      return;
    }

    Animated.timing(this._swipeCloseAnimation, {
      toValue: 0,
      duration: 150,
    }).start(() => {
      this.setState({
        hasSwipeCloseAnimation: false,
      });
    });
  }

  _onLoadImage = () => {
    this.props.TodayDetailCardStore.isImageLoaded = true;
    this._floatingDownloadScrollThreshold = this.props.TodayDetailCardStore.info?.imageHeight + 100;
    this._startShowAnimation();
  }

  _startShowAnimation = () => {
    const {
      cardAnimation,
      contentAnimation,
      info,
    } = this.props.TodayDetailCardStore;

    if (!info) {
      return;
    }

    StatusBar.hide();

    cardAnimation.setValue(0);
    contentAnimation.setValue(0);

    Animated.sequence([
      Animated.timing(cardAnimation, {
        toValue: 1,
        duration: info.duration,
        overshootClamping: true,
      }),
      Animated.timing(contentAnimation, {
        toValue: 1,
        duration: info.duration,
        useNativeDriver: true,
      }),
    ]).start();
  }

  _onPressClose = () => {
    this._hide();
  }

  _swipeHide() {
    if (this._isHiding) return;
    this._isHiding = true;

    Animated.timing(this._swipeCloseAnimation, {
      toValue: 2,
      duration: 250,
      overshootClamping: true,
    }).start(() => {
      StatusBar.show();
      this.props.TodayDetailCardStore.hide();

      this._isHiding = false;

      this.setState({
        hasSwipeCloseAnimation: false,
      });
    });
  }

  _hide() {
    this._floatingDownloadRef.current && this._floatingDownloadRef.current.hide(false);

    if (this._lastScrollY > 0) {
      this._scrollViewRef.current && this._scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }

    const {
      contentAnimation,
      cardAnimation,
      info,
    } = this.props.TodayDetailCardStore;

    Animated.parallel([
      Animated.timing(contentAnimation, {
        toValue: 0,
        duration: info?.duration,
        useNativeDriver: true,
      }),
      Animated.spring(cardAnimation, {
        toValue: 0,
        tension: 25,
        overshootClamping: true,
      }),
    ]).start(() => {
      StatusBar.show();
      this.props.TodayDetailCardStore.hide();
    });
  }

  _getRenderVariables() {
    const {
      info,
      cardAnimation,
      isImageLoaded,
    } = this.props.TodayDetailCardStore;

    const {
      hasSwipeCloseAnimation,
    } = this.state;

    const containerStyle = [styles.container];

    if (info && isImageLoaded) {
      if (hasSwipeCloseAnimation) {
        containerStyle.push({
          left: 0,
          top: this._swipeCloseAnimation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, 0, (Number(info.pageY) - 20)],
          }),
          width: Platform.windowWidth,
          height: Platform.windowHeight,
          borderRadius: this._swipeCloseAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 16],
          }),
          transform: [{
            scale: this._swipeCloseAnimation.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [1, 0.9, 0.95],
            }),
          }],
        });
      } else {
        containerStyle.push({
          left: cardAnimation.interpolate({
            inputRange: [0, 0.7, 1],
            outputRange: [info.pageX, -20, 0],
          }),
          top: cardAnimation.interpolate({
            inputRange: [0, 0.7, 1],
            outputRange: [info.pageY, -20, 0],
          }),
          width: cardAnimation.interpolate({
            inputRange: [0, 0.7, 1],
            outputRange: [info.width, info.windowWidth + 40, info.windowWidth],
          }),
          height: cardAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [info.height, info.windowHeight],
          }),
          borderRadius: cardAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 0],
          }),
        });
      }
    }

    return {
      containerStyle,
    };
  }

  _onScroll = (event) => {
    this._lastScrollY = event.nativeEvent.contentOffset.y;

    if (!this.props.TodayDetailCardStore.hasFloatingDownload || !this._floatingDownloadRef.current) {
      return;
    }

    if (this._lastScrollY > this._floatingDownloadScrollThreshold) {
      this._floatingDownloadRef.current.show();
    } else {
      this._floatingDownloadRef.current.hide();
    }
  }

  render() {
    const {
      isVisible,
      item,
      info,
      cardAnimation,
      contentAnimation,
      hasFloatingDownload,
    } = this.props.TodayDetailCardStore;

    if (!isVisible) {
      return null;
    }

    const {
      containerStyle,
    } = this._getRenderVariables();

    return (
      <Animated.View style={containerStyle} {...this._panResponder.panHandlers}>
        <ScrollView
          ref={this._scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          pinchGestureEnabled={false}
          bounces={false}
          onScroll={this._onScroll}
          scrollEventThrottle={16}
        >
          <TodayDetailCardImage
            item={item}
            info={info}
            cardAnimation={cardAnimation}
            onLoad={this._onLoadImage}
          />
          <TodayDetailCardContent
            item={item}
            contentAnimation={contentAnimation}
          />
        </ScrollView>

        <TodayDetailCardClose
          cardAnimation={cardAnimation}
          onPress={this._onPressClose}
        />

        {hasFloatingDownload && <TodayDetailCardFloatingDownload ref={this._floatingDownloadRef} item={item} />}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: Platform.windowHeight + 100,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 20,
  },
});

export const TodayDetailCard = InjectedComponent(TodayDetailCardComponent, TodayDetailCardStore);
