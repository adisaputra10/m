export enum ActionTypes {
  SERVER_ERROR = 'SERVER_ERROR',
  SERVER_RETRY = 'SERVER_RETRY',
  ACTION_LOGIN = 'ACTION_LOGIN',
  PRODUCTS_DATA_LIST = 'PRODUCTS_DATA_LIST',
  PRODUCTS_SEARCH = 'PRODUCTS_SEARCH',
  GLOBAL_CONNECTION = 'GLOBAL_CONNECTION',
  PRODUCTS_RESET = 'PRODUCTS_RESET',
  PRODUCTS_FILTER = 'PRODUCTS_FILTER',
  SET_FILTER_CATEGORY = 'SET_FILTER_CATEGORY',
  CATEGORIES_LOADING = 'CATEGORIES_LOADING',
  CATEGORIES_LIST = 'CATEGORIES_LIST',
  SET_FILTER_BRAND = 'SET_FILTER_BRAND',
  PRODUCT_FILTER_CHILD_CATEGORY = 'PRODUCT_FILTER_CHILD_CATEGORY',
  PRODUCT_FILTER_CHILD_BRAND = 'PRODUCT_FILTER_CHILD_BRAND',
  IS_LOADING = 'IS_LOADING',
  PRODUCTS_FILTER_PRICES_VALUE = 'PRODUCTS_FILTER_PRICES_VALUE',
  SHOW_SEARCH_RESULTS_LIST = 'SHOW_SEARCH_RESULTS_LIST',
  SHOW_CATEGORY_PARENT = 'SHOW_CATEGORY_PARENT',
  PRODUCTS_DATA_LIST_RECOMMENDATION = 'PRODUCTS_DATA_LIST_RECOMMENDATION'
}

export default ActionTypes;
