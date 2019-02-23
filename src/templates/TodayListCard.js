// @flow

import React, { Component } from 'react';

import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';

import {
  reaction,
} from 'mobx';

import {
  StyleSheet,
  InjectedComponent,
} from '~/common';

import {
  TodayCardImage,
  TodayCardContent,
} from '~/components';

import {
  TodayDetailCardStore,
} from '~/stores';

import {
  type TodayItemType,
} from '~/types';

import {
  type ViewStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

type Props = {
  TodayDetailCardStore: TodayDetailCardStore,
  item: TodayItemType,
};

type State = {
  isHidden: boolean,
};

class TodayListCardComponent extends Component<Props, State> {
  _containerViewRef = React.createRef<Class<View>>();

  _scaleAnimation = new Animated.Value(0);

  _currentScaleAnimationValue: number = 0;

  _containerStyle: Array<ViewStyleProp>;

  state = {
    isHidden: false,
  };

  componentWillMount() {
    this._scaleAnimation.addListener(callback => this._currentScaleAnimationValue = callback.value);
  }

  _onPressIn = () => {
    this._startScaleAnimation(1);
  }

  _onPressOut = () => {
    this._startScaleAnimation(0);
  }

  _restore() {
    this._startScaleAnimation(0, 200);
  }

  _startScaleAnimation(toValue: number, duration: number = 400) {
    Animated.timing(this._scaleAnimation, {
      toValue,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
      isInteraction: false,
    }).start();
  }

  _onPress = () => {
    this._scaleAnimation.stopAnimation();

    this._containerViewRef.current && this._containerViewRef.current.measure((
      x, y, width, height, pageX, pageY,
    ) => {
      const position = {
        pageX,
        pageY,
        width,
        height,
        scale: 1 - (0.05 * this._currentScaleAnimationValue),
      };

      this.props.TodayDetailCardStore.show(this.props.item, position);

      reaction(
        () => this.props.TodayDetailCardStore.isImageLoaded,
        (isImageLoaded, reactionInstance) => {
          if (isImageLoaded) {
            this.setState({
              isHidden: true,
            });

            reactionInstance.dispose();
          }
        },
      );

      reaction(
        () => this.props.TodayDetailCardStore.isVisible,
        (isVisible, reactionInstance) => {
          if (!isVisible) {
            this._restore();
            reactionInstance.dispose();

            this.setState({
              isHidden: false,
            });
          }
        },
      );
    });
  }

  _getRenderVariables() {
    const {
      item: {
        image,
        payload,
      },
    } = this.props;

    const containerStyle = [
      styles.container,
      this.state.isHidden && styles.containerIsHidden,
      {
        transform: [{
          scale: this._scaleAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.95],
          }),
        }],
      },
    ];

    const components = [(
      <TodayCardImage
        key="image"
        image={image}
        payload={payload}
      />
    )];

    if (payload.cardContent) {
      components.push(<TodayCardContent key="content" cardContent={payload.cardContent} />);
    }

    return {
      containerStyle,
      components,
    };
  }

  render() {
    const {
      containerStyle,
      components,
    } = this._getRenderVariables();

    return (
      <TouchableWithoutFeedback
        onPressIn={this._onPressIn}
        onPressOut={this._onPressOut}
        onPress={this._onPress}
      >
        <Animated.View style={containerStyle}>
          <View ref={this._containerViewRef} style={styles.shadow}>
            {components}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    borderRadius: 16,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: '#aaa',
    shadowOffset: { height: 4, width: 3 },
  },
  containerIsHidden: {
    opacity: 0,
  },
  shadow: {
    overflow: 'hidden',
    borderRadius: 16,
  },
});

export const TodayListCard = InjectedComponent(TodayListCardComponent, TodayDetailCardStore);
