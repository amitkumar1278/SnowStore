import { Product } from './product';
import { PricingCondition } from '../enum/pricingConditiom.enum';

export class PricingRule {
  private _product: Product;
  private _pricingCondition: PricingCondition;  // Contain enum which is useful to create rules and evaluate price
  private _multiplier: number;  // useful to create formula for offer, you can see holding different value as per rules.
  private _qualifyingQuantity: number;  // Holding the number on which offer has to be apply


  public get ProductCode(): string {
    return this._product.ProductCode;
  }

  constructor(product: Product) {
    this._product = product;  // using constructor we can assoicate a product with pricing rule object
    this._multiplier = 1;  // set mulyiplier to 1 for product having no offer
  }

  
  
  /**
  * useful to create rule like "Buy m items and get n items" e.g. Buy 2 get 1.
  * totalItemToBeCharged will hold the chargable item for e.g. 2
  * totalFreeItem will hold the item which is free on purchase of totalItemToBeCharged, for e.g. 1
  * suppose totalItemToBeCharged is 2 and totalFreeItem is 1 so offer will be like but 2 and get 1
  */
  public setRuleForFreeQuanities(totalItemToBeCharged: number, totalFreeItem: number): void {
    this._pricingCondition = PricingCondition.EqualTo; // condition on what this rule be applied
    this._qualifyingQuantity = totalItemToBeCharged + totalFreeItem;  // total number of item on which offer/rule will be applied
    this._multiplier = totalItemToBeCharged / this._qualifyingQuantity;  // this is useful to evaluate the price for e.g. 2/3
  }

  
  
  /**
  * useful to create rule like "Buy m or more number of items and get on discounted price" e.g. Buy 3 or more and get tshirt on 19, actual price of tshit is 21.
  * discountedPrice will hold discounted price
  * qualifyingQuantity will hold total number of items after which price will reduce to discountedPrice
  */
  public setRuleForDiscountedPrice(discountedPrice: number, qualifyingQuantity: number) {
    
    // It will throw exception if discounted price is greater than actual product price
    if (discountedPrice >= this._product.ProductPrice) {
      throw 'Invalid ammount. The discounted price should be less than the original price.';
    }
    
    this._multiplier = discountedPrice;  // for such rule multiplier will be 
    this._qualifyingQuantity = qualifyingQuantity; // bumber after which price of item will reduce
    this._pricingCondition = PricingCondition.GreaterThan; // what condition to follow to apply this rule.
  }

  /**
  *Useful to evaluate totalPrice as per _pricingCondition 
  *
  */
  public findTotalPrice(quantity: number): number {
    switch (this._pricingCondition) {
      case PricingCondition.EqualTo:
        return this.getPriceForFreeQuantities(quantity);
      case PricingCondition.GreaterThan:
        return this.getPriceForDiscountedPrice(quantity);
      default:
        return this._multiplier * this._product.ProductPrice * quantity;
    }
  }

  /** Lets demonstrate below calculation for product "VOUCHER	SNOW VOUCHER	7.00 €"
  * consider cureent rule/offer to evaluate for below method is "buy 2 and get 1"
  *
  * _product.ProductPrice = 7.00
  * consider totalCheckoutQuantity = 5
  * _qualifyingQuantity = totalItemToBeCharged + totalFreeItem; => 2 + 1 => 3
  * _multiplier = totalItemToBeCharged / this._qualifyingQuantity; => 2 / 3 => 0.6666666666666666 
  */
  private getPriceForFreeQuantities(totalCheckoutQuantity: number): number {

    let totalChargableQuantities = parseInt((totalCheckoutQuantity / this._qualifyingQuantity).toString()) * this._qualifyingQuantity * this._multiplier;
    // totalChargableQuantities = parseInt((5 / 3).toString()) * 3 * 0.6666666666666666; => 1 * 3 => 2
    
    totalChargableQuantities += totalCheckoutQuantity % this._qualifyingQuantity;
    // 2 += 5 % 3;  => 2 += 2 => 4
    
    return totalChargableQuantities * this._product.ProductPrice;
    // 4 * 7.00 => 28
  }

  
  /** Lets demonstrate below calculation for product "TSHIRT	SNOW T-Shirt	21.00 €"
  * consider cureent rule/offer to evaluate for below method is "buy 3 or more and price reduced to 19"
  *
  * _product.ProductPrice = 21.00 €
  * discountedPrice = 19.00
  * consider totalCheckoutQuantity = 5
  * this._multiplier = discountedPrice;   => 19.00
  * this._qualifyingQuantity = qualifyingQuantity;  => 3
  */
  private getPriceForDiscountedPrice(totalCheckoutQuantity: number): number {
    // 5 < 3 => false
    if (totalCheckoutQuantity < this._qualifyingQuantity) {
      return totalCheckoutQuantity * this._product.ProductPrice;
    }
    
    // 5 * 19 => 95
    return totalCheckoutQuantity * this._multiplier;
  }
}
