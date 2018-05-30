import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Layout } from '../../components/layout';
import { StokList } from '../../components/stok-list';
import { ProductDescription } from '../../components/product-description';
import { styles } from './styles';
import config from '../../config';
import { Rating } from '../../components/rating';
import { fetchDataProduct } from './action';
import { Price } from './libraries/price';

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
        loading: true
      }
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
            loading: false
          });
        } else {
          Alert.alert('Error!', `Error Hubungi API Engineer dengan SKU: ${sku}`, [
            { text: 'OK', onPress: () => this.props.navigation.pop() }
          ]);
        }
      })
      .catch(err => console.log('Error', err));
  }
  backCategory = () => {
    this.props.navigation.pop();
  };
  productImage = () => {
    const { product } = this.state;
    let image = require('./assets/icGreyNoImage.png');
    if (product.images !== null) {
      if (product.images.length > 0) {
        image = { uri: product.images[0].imagePath };
      }
    }
    return image;
  };
  render() {
    const { product, loading } = this.state;
    const productImage = this.productImage();

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
    const leftColumn = (
      <View style={styles.container}>
        {headerLeftColumn}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.productImageContainer}>
              <Image source={productImage} style={styles.productImage} />
            </View>
            <Text style={styles.productTitle}>{product.fullName}</Text>
            <View style={styles.productCategorySku}>
              <Text style={styles.categoryText}>
                {product.brandName} . {product.categoryName}
              </Text>
              <View style={styles.skuRating}>
                <Text style={styles.skuText}>{product.sku}</Text>
                <Rating />
              </View>
            </View>
            <Price normalPrice={20000000} specialPrice={18000000} discount={20} />
            <View style={styles.rowSectionContainer}>
              <View style={styles.rowTitleSectionContainer}>
                <Image source={require('./assets/bank.png')} style={{ marginRight: 8 }} />
                <Text style={styles.cicilanText}>
                  Simulasi cicilan: <Text style={styles.bold}>Rp 950.000/bulan</Text>
                </Text>
              </View>
              <View style={[styles.rowContentContainer, { flexDirection: 'row' }]}>
                <View style={styles.dropdownContainer}>
                  <View style={styles.dropdownTextContainer}>
                    <Text style={styles.dropdownText}>ANZ</Text>
                  </View>
                  <View style={styles.dropdownIconContainer}>
                    <Image
                      source={require('./assets/chevronDown.png')}
                      style={styles.dropdownIcon}
                    />
                  </View>
                </View>
                <View style={styles.dropdownTime}>
                  <View style={styles.dropdownTextContainer}>
                    <Text style={styles.dropdownText}>24</Text>
                  </View>
                  <View style={styles.dropdownIconContainer}>
                    <Image
                      source={require('./assets/chevronDown.png')}
                      style={[styles.dropdownIcon, { marginRight: 32 }]}
                    />
                  </View>
                </View>
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
              <StokList />
              <View style={styles.buttonStokHabis}>
                <Text style={styles.textButtonStokHabis}>STOK HABIS</Text>
              </View>
            </View>
            <View style={styles.rowSectionContainerNoBorder}>
              <ProductDescription
                productDescription="Smart TV SAMSUNG UHD MU6300 televisi 4K UHD Samsung yang sudah mendapat sertifikasi 4K RGB (4K RGB Certified). Dengan adanya sertifikasi RGB ini, kualitas warna yang dapat ditampilkan TV Samsung MU6300 akan terlihat lebih hidup, cerah, dan seperti aslinya, dikarenakan ragam warna yang lebih banyak."
                productSpecification="Produk Spesifikasi Yang Mumpuni"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
    const rightColumn = null;
    if (loading === false) {
      return <Layout leftColumn={leftColumn} rightColumn={rightColumn} />;
    } else {
      return <ActivityIndicator color={config.color.blue} />;
    }
  }
}

export default { PageProductDetailComponent };
