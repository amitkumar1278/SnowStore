**Considered items for the solution are:**
<table>
    <tr><th>Code</th><th>Name</th><th>Price</th></tr>
    <tr><td>VOUCHER</td><td>SNOW VOUCHER</td><td>7.00 &euro;</td></tr>
    <tr><td>TSHIRT</td><td> SNOW T-Shirt</td><td>21.00 &euro;</td></tr>
    <tr><td>MUG</td><td>SNOW Coffee MUG</td><td>9.50 &euro;</td></tr>
</table>

for more detail of problem please check **ProblemStatement.md**

## Packages

* **SnowStore/src/enum/**
  1. **pricingConditiom.enum.ts** contains enum which is helpfull to calculate product offers

* **SnowStore/src/entity/**     
  1. Contain below classes which is helpful for implementation and testing.

## Test Cases:
* **checkout.spec.ts**    

  1. Contains test cases to evaluate total price of shopping cart. Cart contains sample item asked in problem statement.
  2. To calculate total price of cart first we created object of pricing rules for each product and before all execution applied selected rules on selected product as per problem statement.
  3. Wrote test cases for all 3 scenario mentioed in the problem.

* **pricingRule.spec.ts**
  1. As part of SnowStore currently we created two pricing rules mentioned in problem.
  2. We tested both rules with different set of data to verify both rules implementation is scalable, dynamic and production ready to handle different scenario or not. It worked fine.
  3. Two rules which we tested are **For Free quanitities** like Buy 2 get 1 free and  **For Discounted Price** like Buy 3 or more at 19.
  4. Also we tested for no discount items like **MUG**


## Application implementation:

* **product.ts**
    1. Containing field like **_productCode, _productName and _productPrice** on which entire application flow depend.
    2. Contain constructor having parameter of all defined variable.
    3. Contains getter method to get the product state.
    4. Currently we do not require setter methods because we are not any operation like updating products.
    
* **pricingRule.ts**
    1. This class is **mapped with Product and PricingCondition** to create and execute the rules.
    2. Contain field like **_multiplier** and **_qualifyingQuantity** which is very important and useful to apply and execute the offers. **_multiplier is set to "1" if no rule is applied on product.**
    3. Contain methods to set rule on product dynamically.
    4. Contain methods to **calculate total price** of product available in product.
    5. Class is very flexible to introduce new rules and calculate there prices.
    
* **checkout.ts**	
    1. Contain method to **scan product and add to _productCart**.
    2. Create productMap having count of distinct item available in the _productCart.
    3. Finally evaluate total price of cart.
    
    

