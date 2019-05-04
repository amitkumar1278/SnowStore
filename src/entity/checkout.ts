import { Product } from './product';
import { PricingRule } from './pricingRule';

export class Checkout{

  private _pricingRules: PricingRule[];
  private _productCart: string[];

  constructor(pricingRules: PricingRule[]) {
    this._pricingRules = pricingRules;
    this._productCart = [];
  }

  public scan(productCode: string): Checkout {
    if (this._pricingRules.find((x) => x.ProductCode === productCode) === undefined) {
      throw 'Product not listed. Please try with valid product code';
    }

    this._productCart.push(productCode.toUpperCase());

    return this;
  }

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

  public total(): number {
    let totalPrice = 0;
    const productMap: Map<string, number> = new Map();
    this.createMapForScanedItem(productMap);

    for (const productCode of productMap.keys()) {
      const pricingRuleForProduct = this._pricingRules.find((x) => x.ProductCode === productCode);
      const productQuantity = productMap.get(productCode);

      totalPrice += pricingRuleForProduct.findTotalPrice(productQuantity);
    }
    
    console.log(`Items: ${this._productCart.join(', ')}`);
    console.log(`Total: ${totalPrice}`);
    return totalPrice;
  }
}
