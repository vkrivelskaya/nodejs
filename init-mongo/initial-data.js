db = db.getSiblingDB('nodeapp');

db.createCollection('users');
db.createUser({ user: "root", pwd: "nodegmp", roles: [{ role: "readWrite", db: "nodeapp" }] })

db.users.insertMany([
    { id: "0fe36d16-49bc-4aab-a227-f84df899a6cb" },
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