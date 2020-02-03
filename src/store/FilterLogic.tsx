import { IProductData, IFilter, IFilterCriterion } from "../data/Interfaces";

function basicFilter(
  products: IProductData[],
  filterKeys: string[],
  filterCriterion: IFilterCriterion
): IProductData[] {
  return products.filter(item => {
    return filterKeys.every(key => {
      if (key === "feature") {
        return filterCriterion[key].every(subkey => item[key].includes(subkey));
      }
      if (filterCriterion[key].length === 0) {
        return true;
      }
      return filterCriterion[key].some(subkey => item[key].includes(subkey));
    });
  });
}

function searchFilter(
  product: IProductData[],
  filter: IFilter
): IProductData[] {
  return product.filter(item =>
    item.title.toLowerCase().includes(filter.search.toString().toLowerCase())
  );
}

function priceFilter(product: IProductData[], filter: IFilter): IProductData[] {
  return product.filter(
    item => item.price >= filter.price1 && item.price <= filter.price2
  );
}

function sortFilter(products: IProductData[], filter: IFilter): IProductData[] {
  switch (filter.sort) {
    case "alphabetical":
      return products.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    case "pricelo":
      return products.sort((a, b) => a.price - b.price);
    case "pricehi":
      return products.sort((a, b) => b.price - a.price);
    default:
      return [];
  }
}

//set filter options for current store listing
function setFilterOptions(products: IProductData[]) {
  const options: IFilterCriterion = {
    feature: [],
    brand: [],
    color: []
  };
  for (let product of products) {
    for (let key in options) {
      if (typeof product[key] !== "string") {
        for (let i of product[key]) {
          if (!options[key].includes(i)) {
            options[key].push(i);
          }
        }
      } else if (!options[key].includes(product[key])) {
        options[key].push(product[key]);
      }
    }
  }
  return options;
}

export { basicFilter, searchFilter, priceFilter, sortFilter, setFilterOptions };
