##Snow Stores is a Physical store which sells (only) 3 products:
-----------------------------------------------------------------------------------------


Code			    Name					        Price
================================================
VOUCHER			  SNOW VOUCHER			    7.00

TSHIRT			  SNOW T-Shirt			    21.00

MUG				    SNOW Coffee MUG			   9.50

Various departments have insisted on the following discounts:

* The marketing department believes in 2-for-1 promotions(buy two of the same product, get one free), and would like for there to be a 2-for-1 special on VOUCHER ITEMS.

* The CFO insists that the best way to increase sales is with discounts on bulk purchases (buying x or more of a product , the price of that product is reduced), and demands that if you buy 3 or more TSHIRT items, the price per unit should be 19.00.

SNOW Stores checkout process allows for items to be scanned in any order, and should return the total amount to be paid. The interface for the checkout process look like this:

const co = new Checkout(pricingRules);

co.scan("VOUCHER").scan("VOUCHER").scan("TSHIRT");

const price = co.total();


* Examples:
---------------------------------------------------------------------------------------------------------------
Items:	VOUCHER, TSHIRT, MUG
Total: 37.50


Items:	TSHIRT, TSHIRT, TSHIRT, VOUCHER, TSHIRT, 
Total: 83.00


Items:	VOUCHER, TSHIRT, VOUCHER, VOUCHER, MUG, TSHIRT, TSHIRT
Total: 80.5

---------------------------------------------------------------------------------------------------------------
Using modern JavaScript (ES6 or if you prefer, Typescript), you should implement a checkout process that fulfils the requirements. In order to provide a solution, you should take into account the following aspects:

* Deliver decent (production ready) code.
* Provide a solution that could be easy to grow and easy to add new functionality.
* Have notes attached, explaining the solution and why certain things are included and others are left out.


