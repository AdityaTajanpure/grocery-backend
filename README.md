[Offcourse didn't finished it all in time]

Grocery Shop Developement Process:
First the view in mind:
Grocery Shop with a home page first, user can check products without loggin in see their prices and all, also customer reviews.
Login would have two options one from backend simple email authentication and second one would be google authentication
by email, I mean sending email through nodemailer with one time login token Add that wave animation on login screen with clean grocery app image to the right
After Login:
User can add products to his/her cart, maintain this list by using redux so I can access it anywhere. Loading products from backend. On Home Screen,
First list would be trending items, items with most buys shuffled everytime.
Keep trending products in redux state alltime
Show related products from same category
After that some item categories and all that
Have navbar with categories dropdown for redirections
Have a offer marquee over top for offers
Take users input and best result for health like gym goers and old people or family - getting curated lists
Refer and get 25% off through email
Refund UI and and send email in 1 hr that it's done
Food liscences and FSSAI demo and Nutritional Values
Combo products, frequently brought together
Show combos in offer tab on homepage
Subscribe & save on products for future purchases.
Wishlist & Add to cart
Fresh section
Check if product is avail
Product stocks
As for the backend
Create these collections
products:
basic product details, price, name, nutritional values, etc...
reviews
users:
basic user details, name, profile pic, isVerified, etc...
...cart: [ product_id , createdAt, updatedAt, quantity, ]
...orders: [ order_id, product_id, createdAt, updatedAt, quantity, payment_id, payment_method, ]
orders:
all users orders:
[
order_details,
createdAt,
updatedAt,
quantity,
payment_id,
payment_method,
]
