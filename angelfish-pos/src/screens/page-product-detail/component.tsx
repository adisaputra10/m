import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  Alert,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import ImageSlider from 'react-native-image-slider';
import { NavigationScreenProps } from 'react-navigation';
import { Layout } from '../../components/layout';
import { StokList } from '../../components/stok-list';
import { ProductDescription } from '../../components/product-description';
import { styles } from './styles';
import config from '../../config';
import { Rating } from '../../components/rating';
import { fetchDataProduct } from './action';
import { Price } from './libraries/price';
import {
  fetchProductOffer,
  fetchProductVariant,
  fetchProductSpecification,
} from '../../helpers/fetch-data';
import numberFormat from '../../helpers/number-format';

interface PageProductDetailComponentProps extends NavigationScreenProps<any, any> {
  navigation: any;
  sku: string;
}

export class PageProductDetailComponent extends Component<PageProductDetailComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        fullName: '',
        sku: '',
        categoryName: '',
        images: null,
        loading: true,
      },
      variant: null,
      specification: [],
      showListBank: false,
      bankName: '',
      showListMonth: false,
      selectedMonth: 24,
    };
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;
    const sku = params.sku;
    fetchDataProduct(sku)
      .then(data => {
        if (data.sku !== '') {
          this.setState({
            product: data,
            loading: false,
          });
        } else {
          Alert.alert('Error!', `Error Hubungi API Engineer dengan SKU: ${sku}`, [
            { text: 'OK', onPress: () => this.props.navigation.pop() },
          ]);
        }
      })
      .catch(err => console.log('Error', err));
    fetchProductVariant(params.variantId)
      .then(variant => {
        this.setState({ variant });
      })
      .catch(err => console.log(err));
    fetchProductSpecification(sku)
      .then(specification => this.setState({ specification }))
      .catch(err => console.log('error product specifications: ', err));
  }
  backCategory = () => {
    this.props.navigation.pop();
  };
  productImage = () => {
    const { product } = this.state;
    let image = require('./assets/icGreyNoImage.png');
    const winWidth = Dimensions.get('window').width * 0.667;
    if (product.images !== null) {
      if (product.images.length > 1) {
        const productImages = product.images.map(i => i.imagePath);
        return (
          <ImageSlider
            autoPlayWithInterval={3000}
            images={productImages}
            width={winWidth}
            backgroundColor="#fff"
            customSlide={({ index, item, style, width }) => {
              return (
                <View key={item}>
                  <Image
                    source={{ uri: item }}
                    resizeMode="cover"
                    style={{ width: winWidth, height: 700 }}
                  />
                </View>
              );
            }}
            customButtons={(position, move) => (
              <View style={styles.buttons}>
                {productImages.map((image, index) => {
                  const styleSelected = position === index ? styles.buttonSelected : styles.button;
                  return (
                    <TouchableHighlight
                      key={index}
                      underlayColor="#ccc"
                      onPress={() => move(index)}
                      style={styleSelected}
                    >
                      <Text />
                    </TouchableHighlight>
                  );
                })}
              </View>
            )}
          />
        );
      } else {
        return <Image source={{ uri: product.images[0].imagePath }} style={styles.productImage} />;
      }
    }
    return null;
  };
  toggleListBank = (value: boolean, bankName: string = '') => {
    this.setState({ showListBank: value, bankName, showListMonth: false });
  };
  listDataBank = () => {
    return (
      <View style={styles.filterDropdownContainer}>
        <View style={styles.centilanContainer}>
          <Image source={require('./assets/triangle.png')} />
        </View>
        <View style={styles.optionsContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.toggleListBank(false, 'BCA');
            }}
          >
            <View style={styles.sortContainer}>
              <View style={styles.sectionSortContainer}>
                <Text style={styles.textSort}>BCA</Text>
              </View>
              {this.state.bankName == 'BCA' && this.checkSelectedSortBy()}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.toggleListBank(false, 'BNI')}>
            <View style={styles.sortContainer}>
              <View style={styles.sectionSortContainer}>
                <Text style={styles.textSort}>BNI</Text>
              </View>
              {this.state.bankName == 'BNI' && this.checkSelectedSortBy()}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.toggleListBank(false, 'Bank Mandiri')}>
            <View style={styles.sortContainer}>
              <View style={styles.sectionSortContainer}>
                <Text style={styles.textSort}>Bank Mandiri</Text>
              </View>
              {this.state.bankName == 'Bank Mandiri' && this.checkSelectedSortBy()}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.toggleListBank(false, 'ANZ')}>
            <View style={[styles.sortContainer, styles.noBorderBottom]}>
              <View style={styles.sectionSortContainer}>
                <Text style={styles.textSort}>ANZ</Text>
              </View>
              {this.state.bankName == 'ANZ' && this.checkSelectedSortBy()}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };
  toggleListMonth = (value: boolean, selectedMonth: number = 24) => {
    this.setState({ showListMonth: value, selectedMonth, showListBank: false });
  };
  listDataMonth = () => {
    return (
      <View style={styles.filterDropdownMonthContainer}>
        <View style={styles.centilanContainer}>
          <Image source={require('./assets/triangle.png')} />
        </View>
        <View style={styles.optionsContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.toggleListMonth(false, 3);
            }}
          >
            <View style={styles.sortContainer}>
              <View style={styles.sectionSortContainer}>
                <Text style={styles.textSort}>3 Bulan</Text>
              </View>
              {this.state.selectedMonth === 3 && this.checkSelectedSortBy()}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.toggleListMonth(false, 6)}>
            <View style={styles.sortContainer}>
              <View style={styles.sectionSortContainer}>
                <Text style={styles.textSort}>6 Bulan</Text>
              </View>
              {this.state.selectedMonth === 6 && this.checkSelectedSortBy()}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.toggleListMonth(false, 12)}>
            <View style={styles.sortContainer}>
              <View style={styles.sectionSortContainer}>
                <Text style={styles.textSort}>12 Bulan</Text>
              </View>
              {this.state.selectedMonth === 12 && this.checkSelectedSortBy()}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.toggleListMonth(false, 24)}>
            <View style={[styles.sortContainer, styles.noBorderBottom]}>
              <View style={styles.sectionSortContainer}>
                <Text style={styles.textSort}>24 Bulan</Text>
              </View>
              {this.state.selectedMonth === 24 && this.checkSelectedSortBy()}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };
  checkSelectedSortBy = () => (
    <View style={styles.checkContainer}>
      <Image source={require('./assets/check.png')} width={24} height={24} style={styles.check} />
    </View>
  );
  render() {
    const { product, loading, specification } = this.state;
    const productImage = this.productImage();

    if (loading) {
      return <ActivityIndicator color={config.color.blue} />;
    }

    const headerLeftColumn = (
      <View style={styles.headerStyleCustom}>
        <View style={styles.headerCategoryContainer}>
          <View style={styles.buttonBackCategoryContainer}>
            <TouchableWithoutFeedback onPress={this.backCategory}>
              <View style={styles.backCategory}>
                <Image source={require('./assets/backArrow.png')} />
                <Text style={styles.backCategoryText}>Kategori</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.titleCategoryContainer}>
            <View style={styles.titleCategory}>
              <Text style={styles.titleCategoryName}>Detail Produk</Text>
            </View>
          </View>
        </View>
      </View>
    );
    let totalCicilan = 0;
    if (product.price) {
      const normalPrice = product.price.bhinneka.normalPrice;
      const specialPrice = product.price.bhinneka.specialPrice;
      const finalPrice = specialPrice.isActive ? specialPrice.specialPrice : normalPrice;
      totalCicilan = numberFormat(Math.round(finalPrice / this.state.selectedMonth));
    }
    const leftColumn = (
      <View style={styles.container}>
        {headerLeftColumn}
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={!this.state.showListBank && !this.state.showListMonth}
        >
          <View style={styles.content}>
            <View style={styles.productImageContainer}>{productImage}</View>
            {this.state.showListBank && this.listDataBank()}
            {this.state.showListMonth && this.listDataMonth()}
            <Text style={styles.productTitle}>{product.fullName}</Text>
            <View style={styles.productCategorySku}>
              <Text style={styles.categoryText}>
                {product.brandName} . {product.categoryName}
              </Text>
              <View style={styles.skuRating}>
                <Text style={styles.skuText}>{product.sku}</Text>
                <Rating totalRating={product.rating} totalReview={product.totalReview} />
              </View>
            </View>
            {product.price && (
              <Price
                normalPrice={product.price.bhinneka.normalPrice}
                specialPrice={product.price.bhinneka.specialPrice}
                offerStatus={product.offerStatus}
              />
            )}
            <View style={styles.rowSectionContainer}>
              <View style={styles.rowTitleSectionContainer}>
                <Image source={require('./assets/bank.png')} style={{ marginRight: 8 }} />
                <Text style={styles.cicilanText}>
                  Simulasi cicilan: <Text style={styles.bold}>Rp {totalCicilan} / bulan</Text>
                </Text>
              </View>
              <View style={[styles.rowContentContainer, { flexDirection: 'row' }]}>
                <TouchableWithoutFeedback
                  onPress={() => this.toggleListBank(!this.state.showListBank, this.state.bankName)}
                >
                  <View style={styles.dropdownContainer}>
                    <View style={styles.dropdownTextContainer}>
                      <Text style={styles.dropdownText}>
                        {this.state.bankName === '' ? 'Pilih' : this.state.bankName}
                      </Text>
                    </View>
                    <View style={styles.dropdownIconContainer}>
                      <Image
                        source={require('./assets/chevronDown.png')}
                        style={styles.dropdownIcon}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  disabled={this.state.bankName === ''}
                  onPress={() =>
                    this.toggleListMonth(!this.state.showListMonth, this.state.selectedMonth)
                  }
                >
                  <View
                    style={[
                      styles.dropdownTime,
                      this.state.bankName === '' ? { backgroundColor: config.color.border } : null,
                    ]}
                  >
                    <View style={styles.dropdownTextContainer}>
                      <Text style={styles.dropdownText}>{this.state.selectedMonth}</Text>
                    </View>
                    <View style={styles.dropdownIconContainer}>
                      <Image
                        source={require('./assets/chevronDown.png')}
                        style={[styles.dropdownIcon, { marginRight: 32 }]}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={styles.rowSectionContainer}>
              <View style={styles.rowTitleSectionContainer}>
                <Image source={require('./assets/list.png')} style={styles.iconSection} />
                <Text style={styles.textSectionTitle}>Deskripsi</Text>
              </View>
              <View style={styles.rowContentContainer}>
                <Text>{product.description}</Text>
              </View>
            </View>
            {product.warranty && (
              <View style={styles.rowSectionContainer}>
                <View style={styles.rowTitleSectionContainer}>
                  <Image source={require('./assets/verified.png')} style={styles.iconSection} />
                  <Text style={styles.textSectionTitle}>Garansi</Text>
                </View>
                <View style={styles.rowContentContainer}>
                  <Text style={styles.contentSection}>{product.warranty}</Text>
                </View>
              </View>
            )}
            <View style={styles.rowSectionContainer}>
              <View style={styles.rowTitleSectionContainer}>
                <Image source={require('./assets/warehouse.png')} style={styles.iconSection} />
                <Text style={styles.textSectionTitle}>Stok</Text>
              </View>
              {this.state.variant && <StokList stocks={this.state.variant.stock} />}
              <View style={styles.buttonStokHabis}>
                <Text style={styles.textButtonStokHabis}>STOK HABIS</Text>
              </View>
            </View>
            <View style={styles.rowSectionContainerNoBorder}>
              <ProductDescription
                productDescription={product.description}
                productSpecification={specification}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
    const rightColumn = <View />;
    if (loading === false) {
      return <Layout leftColumn={leftColumn} rightColumn={rightColumn} />;
    } else {
      return <ActivityIndicator color={config.color.blue} />;
    }
  }
}

export default { PageProductDetailComponent };
