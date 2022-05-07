import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Copyright } from '../Copyright';

import { feedbackTypes } from '../../utils/feedbackTypes'
import { styles } from './styles';
import { Option } from '../Option';
import { FeedbackType } from '../Widgets';


interface Props {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function Options({onFeedbackTypeChanged}: Props) {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Deixe seu feedback
      </Text>


     
        <View style={styles.options}>
          {
            Object.entries(feedbackTypes).map(([key, value], index) => {
              return (
                <Option key={key} image={value.image} title={value.title} onPress={() => onFeedbackTypeChanged(key as FeedbackType)}  />
              )
            })
          }
        </View>
    
      <Copyright />
    </View>
  );
}