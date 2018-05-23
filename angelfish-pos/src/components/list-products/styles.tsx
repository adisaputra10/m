import { StyleSheet, Dimensions } from 'react-native';
import config from '../../config';

const heightDevice = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    height: heightDevice - 56
  },
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchResultText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  searchResultPriceDiscountText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    paddingRight: 5,
    color: config.color.textGrey
  },
  searchResultPriceContainer: {
    flexDirection: 'row',
    paddingTop: 15
  },
  searchResultDiscountText: {
    fontSize: 16,
    color: 'red'
  },
  searchResultEmptyStockText: {
    fontSize: 16,
    color: 'red',
    paddingTop: 16
  },
  productItemContainer: {
    backgroundColor: config.color.white,
    flex: 1
  },
  productItemBox: {
    backgroundColor: config.color.white,
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingTop: 8,
    justifyContent: 'space-between'
  },
  productItemImage: {
    width: '100%',
    height: 170
  },
  productItemPriceContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  productItemName: {
    fontSize: 16,
    textAlign: 'left',
    color: config.color.text,
    paddingBottom: 8
  },
  buttonBeliContainer: {
    height: 40,
    borderRadius: 3,
    backgroundColor: config.color.yellow,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBeliText: {
    color: config.color.text,
    fontWeight: 'bold'
  },
  loadStructure: {
    width: '100%',
    height: '80%'
  },
  totalProductsText: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.38)'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterIcon: {
    marginRight: 8
  },
  filterText: {
    fontSize: 14,
    color: config.color.text
  },
  filterTextSort: {
    fontSize: 14,
    color: config.color.text,
    paddingRight: 12
  },
  filterSortContainer: {
    paddingRight: 8
  },
  filterContainerSection: {
    flexDirection: 'row'
  },
  productBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: config.color.border,
    paddingVertical: 8
  },
  filterDropdownContainer: {
    position: 'absolute',
    zIndex: 2,
    marginTop: 30,
    marginLeft: 258 * 1.65,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  centilanContainer: {
    flex: 1,
    zIndex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    shadowColor: 'rgba(0, 0, 0, 0.2)'
  },
  optionsContainer: {
    width: 258,
    backgroundColor: 'rgb(255, 255, 255)',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    borderRadius: 20
  },
  sortContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: config.color.border
  },
  sectionSortContainer: {
    flex: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textSort: {
    fontSize: 16,
    paddingVertical: 11,
    flexDirection: 'row'
  },
  noBorderBottom: {
    borderBottomWidth: 0
  },
  checkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16
  },
  check: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default styles;
