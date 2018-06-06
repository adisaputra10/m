import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../styles';
import config from '../../../config';

interface componentProps {
  summary: any;
  content: any;
  selengkapnya: boolean;
  setSelengkapnya: any;
}

export class ContentSpecification extends Component<componentProps, any> {
  constructor(props) {
    super(props);
  }
  renderContent = (isSummary: boolean = false) => {
    const { content } = this.props;
    return (
      <View>
        {content.map((spec, specIndex) => {
          if (isSummary && specIndex > 4) return null;
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingVertical: 8,
                borderBottomColor: config.color.border,
                borderBottomWidth: 1,
                alignItems: 'center',
              }}
              key={spec.ID + '-' + specIndex}
            >
              <View style={{ width: 100 }}>
                <Text style={styles.contentStyleName}>{spec.Name} </Text>
              </View>
              <View style={{ marginLeft: 16 }}>
                <Text style={styles.contentStyle}>{spec.Value.value}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };
  render() {
    const { summary, content, selengkapnya, setSelengkapnya } = this.props;
    return (
      <View>
        <View style={styles.contentContainer}>
          {!selengkapnya && this.renderContent(true)}
          {selengkapnya && this.renderContent()}
        </View>
        {!selengkapnya && (
          <TouchableWithoutFeedback onPress={() => setSelengkapnya()}>
            <View style={styles.selengkapnyaContainer}>
              <Text style={styles.selengkapnya}>Selengkapnya</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}
ContentSpecification.propTypes = {
  summary: PropTypes.any.isRequired,
  content: PropTypes.any.isRequired,
  selengkapnya: PropTypes.bool,
  setSelengkapnya: PropTypes.func,
};
ContentSpecification.defaultProps = {
  selengkapnya: false,
  setSelengkapnya: () => {},
};
export default ContentSpecification;
