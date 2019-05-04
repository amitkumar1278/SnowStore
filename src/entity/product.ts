export class Product {
  private _productCode: string;
  private _productName: string;
  private _productPrice: number;

  public get ProductCode() : string {
    return this._productCode;
  }

  public get ProductPrice(): number {
    return this._productPrice;
  }
  
  public get ProductName(): string {
    return this._productName;
  }

  constructor(productCode: string, productName: string, productPrice: number) {
    this._productCode = productCode;
    this._productName = productName;
    this._productPrice = productPrice;
  }
}
