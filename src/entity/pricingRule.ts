import { Product } from './product';
import { PricingCondition } from '../enum/pricingConditiom.enum';

export class PricingRule {
  private _product: Product;
  private _pricingCondition: PricingCondition;
  private _multiplier: number;
  private _qualifyingQuantity: number;


  public get ProductCode(): string {
    return this._product.ProductCode;
  }

  constructor(product: Product) {
    this._product = product;
    this._multiplier = 1;
  }

  public setRuleForFreeQuanities(totalItemToBeCharged: number, totalFreeItem: number): void {
    this._pricingCondition = PricingCondition.EqualTo;
    this._qualifyingQuantity = totalItemToBeCharged + totalFreeItem;
    this._multiplier = totalItemToBeCharged / this._qualifyingQuantity;
  }

  public setRuleForDiscountedPrice(discountedPrice: number, qualifyingQuantity: number) {
    if (discountedPrice >= this._product.ProductPrice) {
      throw 'Invalid ammount. The discounted price should be less than the original price.';
      
    }
    this._multiplier = discountedPrice;
    this._qualifyingQuantity = qualifyingQuantity;
    this._pricingCondition = PricingCondition.GreaterThan;
  }

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

  private getPriceForFreeQuantities(totalCheckoutQuantity: number): number {

    let totalChargableQuantities = parseInt((totalCheckoutQuantity / this._qualifyingQuantity).toString()) * this._qualifyingQuantity * this._multiplier;

    totalChargableQuantities += totalCheckoutQuantity % this._qualifyingQuantity;

    return totalChargableQuantities * this._product.ProductPrice;
  }

  private getPriceForDiscountedPrice(totalCheckoutQuantity: number): number {
    if (totalCheckoutQuantity < this._qualifyingQuantity) {
      return totalCheckoutQuantity * this._product.ProductPrice;
    }
    return totalCheckoutQuantity * this._multiplier;
  }
}