import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableWithoutFeedback, Image } from 'react-native';
import styles from './styles';
import config from '../../config';

const colors = {
  1: {
    style: {
      backgroundColor: '#ffffff'
    }
  },
  2: {
    style: {
      backgroundColor: '#f5f5f6'
    }
  },
  3: {
    style: {
      backgroundColor: '#eff0f2'
    }
  },
  4: {
    style: {
      backgroundColor: '#e1e3e6'
    }
  }
};

interface FilterCategoriesProps {
  selectedCategoryId?: string;
  clickCancelCategories?: any;
  terapkanCategory?: any;
  dataCategories?: any[];
}

export class FilterCategoriesComponent extends Component<FilterCategoriesProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      openChild: [],
      selectedCategoryId: props.selectedCategoryId,
      selectedCategoryName: ''
    };
  }
  setFilterCategory = (id, name) => {
    this.setState({ selectedCategoryId: id, selectedCategoryName: name });
  };
  deleteFilterCategory = () => {
    this.setState({ selectedCategoryId: '', selectedCategoryName: '' });
  };
  selecCategory = category => {
    if (category.children) {
      this.setState({
        openChild: this.state.openChild.concat(category.id)
      });
    } else {
      this.setFilterCategory(category.id, category.name);
    }
  };
  _renderChildCategory = children => {
    if (children !== undefined) {
      return (
        <View>
          {children.map((category, categoryIndex) => {
            const level = category.level !== undefined ? category.level : 4;
            const customBg = colors[level]['style'];
            const imageChevron = this.state.openChild.includes(category.id)
              ? require('./assets/chevronUp.png')
              : require('./assets/chevronDown.png');
            const chevron = level !== 4 ? <Image source={imageChevron} /> : null;

            const imageCheck =
              this.state.selectedCategoryId === category.id ? (
                <Image source={require('./assets/radioButtonOn.png')} width={20} />
              ) : (
                <Image source={require('./assets/radioButtonOff.png')} width={20} />
              );
            return (
              <View key={category.id}>
                <TouchableWithoutFeedback onPress={() => this.selecCategory(category)}>
                  <View style={[styles.listContainerCategory, customBg]}>
                    {level === 4 && <View style={styles.circleStyle}>{imageCheck}</View>}
                    <View style={styles.listLeftCategory}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.titleListTextCategory} ellipsizeMode="tail">
                          {category.name}
                        </Text>
                        <Text style={styles.categoryCount}> ({category.docCount})</Text>
                      </View>
                    </View>
                    {category.children && (
                      <View style={styles.listRightCategory}>
                        <Text style={styles.titleListTextCategory}>{chevron}</Text>
                      </View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
                {this.state.openChild.includes(category.id) &&
                  this._renderChildCategory(category.children)}
              </View>
            );
          })}
        </View>
      );
    }
  };
  render() {
    const disableTerapkanCategory = this.state.selectedCategoryId == '';
    const disableTerapkanCategoryStyle = disableTerapkanCategory
      ? { backgroundColor: config.color.grey }
      : null;
    return (
      <View style={styles.container}>
        <View style={styles.rightColumnTop}>
          <View style={styles.headerRightFilterContainer}>
            <TouchableWithoutFeedback onPress={this.props.clickCancelCategories}>
              <View>
                <Text style={styles.filterCancelText}>Batal</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.headerRightText}>Kategori</Text>
            <TouchableWithoutFeedback onPress={this.deleteFilterCategory}>
              <View style={styles.removeButtonContainer}>
                <Text style={styles.filterDeleteText}>Hapus</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <ScrollView>{this._renderChildCategory(this.props.dataCategories)}</ScrollView>
        <View style={styles.buttonBottomContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (this.props.selectedCategoryId != this.state.selectedCategoryId) {
                this.props.terapkanCategory(
                  this.state.selectedCategoryId,
                  this.state.selectedCategoryName
                );
              }
              this.props.clickCancelCategories();
            }}
            disabled={disableTerapkanCategory}
          >
            <View style={[styles.buttonBottomStyle, disableTerapkanCategoryStyle]}>
              <Text style={styles.buttonBottomText}>TERAPKAN</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
export default FilterCategoriesComponent;
