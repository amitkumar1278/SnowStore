import { Product } from './product';
import { PricingRule } from './pricingRule';

export class Checkout{

  private _pricingRules: PricingRule[];
  private _productCart: string[];

  constructor(pricingRules: PricingRule[]) {
    this._pricingRules = pricingRules; // set list of pricing rule having detail product object as well applied rules on the product.
    this._productCart = [];  // initialize empty cart
  }

  public scan(productCode: string): Checkout {
    if (this._pricingRules.find((x) => x.ProductCode === productCode) === undefined) {
      throw 'Product not listed. Please try with valid product code';
    }

    this._productCart.push(productCode.toUpperCase());  // add items to product cart

    return this;
  }

  /**
  * create a map having count for each distinct product in productCart
  */
  private createMapForScanedItem(productMap: Map<string, number> ): void{
    this._productCart.forEach((product) => {
      const existingProductQuanity = productMap.get(product);
      if (existingProductQuanity === undefined) {
        productMap.set(product, 1);
      }
      else {
        productMap.set(product, existingProductQuanity + 1);
      }
    });
  }

  /**
  * get total charge amount of productCart
  */
  public total(): number {
    let totalPrice = 0;
    const productMap: Map<string, number> = new Map();
    this.createMapForScanedItem(productMap);  // create a map having count for each distinct product in productCart

    for (const productCode of productMap.keys()) {
      const pricingRuleForProduct = this._pricingRules.find((x) => x.ProductCode === productCode);  // get the applied rules on the product
      const productQuantity = productMap.get(productCode);  // get total number of quantity for selected product in productCart

      totalPrice += pricingRuleForProduct.findTotalPrice(productQuantity); // get the total price of each product.
    }
    
    console.log(`Items: ${this._productCart.join(', ')}`);
    console.log(`Total: ${totalPrice}`);
    return totalPrice;  
  }
}
