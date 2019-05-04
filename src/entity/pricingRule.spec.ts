import { PricingRule } from './pricingRule';
import { Product } from './product';

describe('PricingRule:-', function () {

  describe('For Free quanitities', () => {
    const product = new Product('VOUCHER', 'SNOW Voucher', 7);

    let pricingRule: PricingRule;

    describe('Buy 2 get 1 free', () => {
      beforeAll(() => {
        pricingRule = new PricingRule(product);
        pricingRule.setRuleForFreeQuanities(2, 1);
      });

      it('should return 7 when the total quanity is 1', () => {
        let totalPrice = pricingRule.findTotalPrice(1);
        expect(totalPrice).toBe(7);
      });

      it('should return 14 when the total quanity is 2', () => {
        let totalPrice = pricingRule.findTotalPrice(2);
        expect(totalPrice).toBe(14);
      });

      it('should return 14 when the total quanity is 3', () => {
        let totalPrice = pricingRule.findTotalPrice(3);
        expect(totalPrice).toBe(14);
      });

      it('should return 21 when the total quanity is 4', () => {
        let totalPrice = pricingRule.findTotalPrice(4);
        expect(totalPrice).toBe(21);
      });

      it('should return 28 when the total quanity is 5', () => {
        let totalPrice = pricingRule.findTotalPrice(5);
        expect(totalPrice).toBe(28);
      });
    });

    describe('Buy 2 get 2 free', () => {
      beforeAll(() => {
        pricingRule = new PricingRule(product);
        pricingRule.setRuleForFreeQuanities(2, 2);
      });

      it('should return 7 when the total quanity is 1', () => {
        let totalPrice = pricingRule.findTotalPrice(1);
        expect(totalPrice).toBe(7);
      });

      it('should return 14 when the total quanity is 2', () => {
        let totalPrice = pricingRule.findTotalPrice(2);
        expect(totalPrice).toBe(14);
      });

      it('should return 21 when the total quanity is 3', () => {
        let totalPrice = pricingRule.findTotalPrice(3);
        expect(totalPrice).toBe(21);
      });

      it('should return 21 when the total quanity is 4', () => {
        let totalPrice = pricingRule.findTotalPrice(4);
        expect(totalPrice).toBe(14);
      });

      it('should return 21 when the total quanity is 5', () => {
        let totalPrice = pricingRule.findTotalPrice(5);
        expect(totalPrice).toBe(21);
      });
    });

    describe('Buy 2 get 3 free', () => {
      beforeAll(() => {
        pricingRule = new PricingRule(product);
        pricingRule.setRuleForFreeQuanities(2, 3);
      });

      it('should return 7 when the total quanity is 1', () => {
        let totalPrice = pricingRule.findTotalPrice(1);
        expect(totalPrice).toBe(7);
      });

      it('should return 14 when the total quanity is 2', () => {
        let totalPrice = pricingRule.findTotalPrice(2);
        expect(totalPrice).toBe(14);
      });

      it('should return 21 when the total quanity is 3', () => {
        let totalPrice = pricingRule.findTotalPrice(3);
        expect(totalPrice).toBe(21);
      });

      it('should return 28 when the total quanity is 4', () => {
        let totalPrice = pricingRule.findTotalPrice(4);
        expect(totalPrice).toBe(28);
      });

      it('should return 14 when the total quanity is 5', () => {
        let totalPrice = pricingRule.findTotalPrice(5);
        expect(totalPrice).toBe(14);
      });
    });
  });

  describe('For Discounted Price', () => {
    const product = new Product('TSHIRT', 'SNOW T-Shirt', 21);

    let pricingRule: PricingRule;

    describe('Buy 3 or more at 19', () => {
      beforeAll(() => {
        pricingRule = new PricingRule(product);
        pricingRule.setRuleForDiscountedPrice(19, 3);
      });

      it('should return 21 when the total quanity is 1', () => {
        let totalPrice = pricingRule.findTotalPrice(1);
        expect(totalPrice).toBe(21);
      });

      it('should return 42 when the total quanity is 2', () => {
        let totalPrice = pricingRule.findTotalPrice(2);
        expect(totalPrice).toBe(42);
      });

      it('should return 57 when the total quanity is 3', () => {
        let totalPrice = pricingRule.findTotalPrice(3);
        expect(totalPrice).toBe(57);
      });

      it('should return 76 when the total quanity is 4', () => {
        let totalPrice = pricingRule.findTotalPrice(4);
        expect(totalPrice).toBe(76);
      });

      it('should return 95 when the total quanity is 5', () => {
        let totalPrice = pricingRule.findTotalPrice(5);
        expect(totalPrice).toBe(95);
      });
    });

    describe('Buy 20 or more at 10', () => {
      beforeAll(() => {
        pricingRule = new PricingRule(product);
        pricingRule.setRuleForDiscountedPrice(10, 20);
      });

      it('should return 210 when the total quanity is 10', () => {
        let totalPrice = pricingRule.findTotalPrice(10);
        expect(totalPrice).toBe(210);
      });

      it('should return 399 when the total quanity is 19', () => {
        let totalPrice = pricingRule.findTotalPrice(19);
        expect(totalPrice).toBe(399);
      });

      it('should return 200 when the total quanity is 20', () => {
        let totalPrice = pricingRule.findTotalPrice(20);
        expect(totalPrice).toBe(200);
      });
    });

    describe('Buy 2 or more at 22', () => {
      it('should throw error when the discounted price is greater than actual price', () => {
        pricingRule = new PricingRule(product);
        expect(() => pricingRule.setRuleForDiscountedPrice(22, 2)).toThrow('Invalid ammount. The discounted price should be less than the original price.');
      });
    });
  });

  describe('For no discount items', () => {
    it('should return 19 when the total quanity is 2', () => {
      const product = new Product('MUG', 'SNOW Coffee Mug', 9.5);
      let pricingRule = new PricingRule(product);
      // No rule defined
      let totalPrice = pricingRule.findTotalPrice(2);
      expect(totalPrice).toBe(19);
    });
  });
});