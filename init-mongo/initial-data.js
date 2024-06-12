db = db.getSiblingDB('nodeapp');

db.createCollection('users');
db.createUser({ user: "root", pwd: "nodegmp", roles: [{ role: "readWrite", db: "nodeapp" }] });

db.users.insertMany([
    {
        id: "0fe36d16-49bc-4aab-a227-f84df899a6cb",
        email: "admin@example.com",
        password: "$2b$10$Zg2pLDPs9acZVCk4wEAZUuc2FOidvJiIevsc018lR/GOlSusRX7a6", // hashed password: admin123
        role: "admin"
    },
    {
        id: "1e85ba48-38d8-4bf0-bf8c-0b1d5cc27560",
        email: "customer@example.com",
        password: "$2b$10$gsfN2bVo17fVwTXAXnBVZuqHBLKE9T1yjp7Mhlnhca9EfKIkgJnLi", // hashed password: customer123
        role: "user"
    }
]);

db.createCollection('products');

db.products.insertMany([
    {
        id: "51422fcd-0366-4186-ad5b-c23059b6f64f",
        title: "Book",
        description: "A very interesting book",
        price: 100
    },
    {
        id: "915b2f40-9fd9-47f2-9b51-628f3dc69aac",
        title: "Game",
        description: "A very interesting game",
        price: 200
    }
]);

print('Initialization complete.');