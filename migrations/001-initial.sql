-- UP
CREATE TABLE Products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER ,
    image TEXT,
    category TEXT
);

INSERT INTO Products (name, price, image, category) VALUES("Brocolli - 1 Kg", 120, "/images/products/broccoli.jpg", "vegetables");
INSERT INTO Products (name, price, image, category) VALUES("Cauliflower - 1 Kg", 60, "/images/products/cauliflower.jpg", "vegetables");
INSERT INTO Products (name, price, image, category) VALUES("Cucumber - 1 Kg", 48, "/images/products/cucumber.jpg", "vegetables");
INSERT INTO Products (name, price, image, category) VALUES("Beetroot - 1 Kg", 32, "/images/products/beetroot.jpg", "vegetables");
INSERT INTO Products (name, price, image, category) VALUES("Carrot - 1 Kg", 56, "/images/products/carrots.jpg", "vegetables");
INSERT INTO Products (name, price, image, category) VALUES("Tomato - 1 Kg", 16, "/images/products/tomato.jpg", "vegetables");
INSERT INTO Products (name, price, image, category) VALUES("Beans - 1 Kg", 82, "/images/products/beans.jpg", "vegetables");
INSERT INTO Products (name, price, image, category) VALUES("Brinjal - 1 Kg", 35, "/images/products/brinjal.jpg", "vegetables");
INSERT INTO Products (name, price, image, category) VALUES("Capsicum", 60, "/images/products/capsicum.jpg", "vegetables");
INSERT INTO Products (name, price, image, category) VALUES("Mushroom - 1 Kg", 75, "/images/products/button-mushroom.jpg", "vegetables");
INSERT INTO Products (name, price, image, category) VALUES("Potato - 1 Kg", 22, "/images/products/potato.jpg", "vegetables");
INSERT INTO Products (name, price, image, category) VALUES("Pumpkin - 1 Kg", 48, "/images/products/pumpkin.jpg", "vegetables");
INSERT INTO Products (name, price, image, category) VALUES("Corn - 1 Kg", 75, "/images/products/corn.jpg", "vegetables");
INSERT INTO Products (name, price, image, category) VALUES("Onion - 1 Kg", 16, "/images/products/onion.jpg", "vegetables");
INSERT INTO Products (name, price, image, category) VALUES("Apple - 1 Kg", 72, "/images/products/apple.jpg", "fruits");
INSERT INTO Products (name, price, image, category) VALUES("Banana - 1 Kg", 45, "/images/products/banana.jpg", "fruits");
INSERT INTO Products (name, price, image, category) VALUES("Grapes - 1 Kg", 60, "/images/products/grapes.jpg", "fruits");
INSERT INTO Products (name, price, image, category) VALUES("Mango - 1 Kg", 75, "/images/products/mango.jpg", "fruits");
INSERT INTO Products (name, price, image, category) VALUES("Musk Melon - 1 Kg", 36, "/images/products/musk-melon.jpg", "fruits");
INSERT INTO Products (name, price, image, category) VALUES("Orange - 1 Kg", 75, "/images/products/orange.jpg", "fruits");
INSERT INTO Products (name, price, image, category) VALUES("Pears - 1 Kg", 69, "/images/products/pears.jpg", "fruits");
INSERT INTO Products (name, price, image, category) VALUES("Pomegranate - 1 Kg", 95, "/images/products/pomegranate.jpg", "fruits");
INSERT INTO Products (name, price, image, category) VALUES("Raspberry - 1/4 Kg", 160, "/images/products/raspberry.jpg", "fruits");
INSERT INTO Products (name, price, image, category) VALUES("Strawberry - 1/4 Kg", 180, "/images/products/strawberry.jpg", "fruits");
INSERT INTO Products (name, price, image, category) VALUES("Water Melon - 1 Kg", 28, "/images/products/water-melon.jpg", "fruits");
INSERT INTO Products (name, price, image, category) VALUES("Almonds - 1/4 Kg", 200, "/images/products/almonds.jpg", "nuts");
INSERT INTO Products (name, price, image, category) VALUES("Pista - 1/4 Kg", 190, "/images/products/pista.jpg", "nuts");
INSERT INTO Products (name, price, image, category) VALUES("Nuts Mixture - 1 Kg", 950, "/images/products/nuts-mixture.jpg", "nuts");
INSERT INTO Products (name, price, image, category) VALUES("Cashews - 1 Kg", 650, "/images/products/cashews.jpg", "nuts");
INSERT INTO Products (name, price, image, category) VALUES("Walnuts - 1/4 Kg", 170, "/images/products/walnuts.jpg", "nuts");

-- Down
DROP TABLE Products;