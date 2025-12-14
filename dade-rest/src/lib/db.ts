import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'restaurant.db');
const db = new Database(dbPath);

// Initialize database tables
db.exec(`
  DROP TABLE IF EXISTS menu_items;
  DROP TABLE IF EXISTS categories;
  
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    name_en TEXT,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    name_en TEXT,
    description TEXT,
    price REAL NOT NULL,
    image TEXT,
    is_available INTEGER DEFAULT 1,
    is_featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );
`);

const insertCategory = db.prepare('INSERT INTO categories (name, name_en, image) VALUES (?, ?, ?)');
const insertItem = db.prepare('INSERT INTO menu_items (category_id, name, name_en, description, price, image, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?)');

// Categories
insertCategory.run('مقبلات', 'Appetizers', '🥗');
insertCategory.run('سندويش', 'Sandwiches', '🥪');
insertCategory.run('شاورما', 'Shawarma', '🌯');
insertCategory.run('بيتزا', 'Pizza', '🍕');
insertCategory.run('مشويات', 'Grills', '🍖');
insertCategory.run('وجبات غريب', 'Special Meals', '🍽️');
insertCategory.run('برگر', 'Burgers', '🍔');
insertCategory.run('باستا', 'Pasta', '🍝');
insertCategory.run('مشروبات غازية', 'Beverages', '🥤');
insertCategory.run('دايت', 'Diet', '🥬');

// مقبلات - Appetizers (1)
insertItem.run(1, 'حمص باللحمة', 'Hummus with meat', 'Hummus with meat', 4000, '/images/78853ec1-4869-4ce6-9e64-dda61ca14cfe_large.jpg', 1);
insertItem.run(1, 'سلطة شرقية', 'Oriental Salad', '', 4000, '/images/a4b083de-a9c6-4fa1-9c3b-7e322a981463_large.jpg', 0);
insertItem.run(1, 'سلطة سيزر', 'Caesar Salad', '', 6000, '/images/575a8b68-79f4-4694-a14f-c830fbd7cec1_large.jpg', 1);
insertItem.run(1, 'سلطة جرجير', 'Arugula Salad', '', 4000, '/images/eb71e438-529b-44e9-9124-3cffa3ad50ea_large.jpg', 0);
insertItem.run(1, 'تبولة', 'Tabbouleh', '', 5000, '/images/1668c28e-60bf-4c88-949e-34e0c693b1a9_large.jpg', 0);
insertItem.run(1, 'سلطة فتوش', 'Fattoush', '', 4000, '/images/506162f4-7231-4e7f-8f5b-4da4a8e3b1f8_large.jpg', 0);
insertItem.run(1, 'مقبلات', 'Appetizers', '', 3000, '/images/1be57356-065b-41dc-9aea-df778842422e_large.jpg', 0);
insertItem.run(1, 'كريسبى', 'Crispy', '', 5000, '/images/17278f3d-4ee1-4f7d-9a49-644faa462927_large.jpg', 0);
insertItem.run(1, 'سكالوب', 'Scallop', '', 5000, '/images/aba662fe-691c-44ab-a881-cad6b1509850_large.jpg', 0);
insertItem.run(1, 'فرانسيسكو', 'Francisco', '', 5000, '/images/7b41533c-4852-49a6-9151-3dfbfc13b107_large.jpg', 0);
insertItem.run(1, 'فلافل', 'Falafel', '', 2500, '/images/5df93e48-74a7-4df7-9672-0acfbf35144d_large.jpg', 1);
insertItem.run(1, 'سوبريم', 'Supreme', '', 5000, '/images/cd214bd8-8828-412e-85a4-0ed9c18cc199_large.jpg', 0);
insertItem.run(1, 'فاهيتا', 'Fajita', '', 5000, '/images/a06f6207-1b91-4226-b36b-d78a8c4b6c99_large.jpg', 0);
insertItem.run(1, 'مكسيكي', 'Mexican', '', 5000, '/images/6648d1d6-0e0e-46f2-9f06-d4eef59526b9_large.jpg', 0);

// سندويش - Sandwiches (2)
insertItem.run(2, 'لفه كباب', 'Kebab Wrap', '', 4000, '/images/385bb1b5-969c-43cc-9b29-cee08c6160d2_large.jpg', 1);
insertItem.run(2, 'دونر دجاج', 'Chicken Doner', '', 3000, '/images/6f379680-0c32-4de4-8f30-7f736d7a86c6_large.jpg', 0);
insertItem.run(2, 'صاج دجاج', 'Chicken Saj', '', 3000, '/images/2c9af5dd-5208-4e12-9f50-c2739d1f26db_large.jpg', 0);
insertItem.run(2, 'صاج لحم', 'Meat Saj', '', 4000, '/images/172bcfcd-a7a7-4af1-bd1d-12ce8b343018_large.jpg', 1);
insertItem.run(2, 'وجبة عربية فلافل', 'Arabic Falafel Meal', '', 5000, '/images/30619c6d-96bf-4586-bdbe-673e5431630b_large.jpg', 0);
insertItem.run(2, 'بوكس دجاج', 'Chicken Box', '', 4000, '/images/fd1fad19-eee1-4da4-bc09-450501987b74_large.jpg', 0);
insertItem.run(2, 'بوكس لحم', 'Meat Box', '', 5000, '/images/7ce097d9-4fb5-4f92-bd60-03f6d2a9e85e_large.jpg', 0);

// شاورما - Shawarma (3)
insertItem.run(3, 'ماعون دجاج', 'Chicken Platter', '', 7000, '/images/85efc96b-3f2a-4c6c-ae4c-2fffd16d2980_large.jpg', 1);
insertItem.run(3, 'ماعون لحم', 'Meat Platter', '', 10000, '/images/0ec494a2-faf0-4339-9b93-8390690eca29_large.jpg', 1);
insertItem.run(3, 'اسكندر لحم', 'Iskender Meat', '', 10000, '/images/91cdc8b7-f427-4541-90af-99e3b2178a04_large.jpg', 1);
insertItem.run(3, 'شاورما عربية دجاج', 'Arabic Chicken Shawarma', '', 7000, '/images/3c61a7e1-b472-4b1c-b383-85f7db14a6e4_large.jpg', 0);
insertItem.run(3, 'شاورما عربية لحم', 'Arabic Meat Shawarma', '', 9000, '/images/e78c296a-6309-4337-8a7a-fa8c85e8966f_large.jpg', 0);
insertItem.run(3, 'دونه ر لحم', 'Meat Doner', '', 4000, '/images/1c01250e-183b-46c1-a5ed-9011844b5ef1_large.jpg', 0);

// بيتزا - Pizza (4)
insertItem.run(4, 'بيتزا لحم', 'Meat Pizza', '', 9000, '/images/508807bc-1e70-44b8-95f5-ebc5d5401052_large.jpg', 1);
insertItem.run(4, 'بيتزا دجاج', 'Chicken Pizza', '', 8000, '/images/2c2b2c19-a2f7-4bf0-aeaf-c9f0e77379b2_large.jpg', 0);
insertItem.run(4, 'بيتزا بيبيروني', 'Pepperoni Pizza', '', 8000, '/images/a90f49fa-7f2a-4670-9e50-450859c96bca_large.jpg', 1);
insertItem.run(4, 'بيتزا مارغريتا', 'Margherita Pizza', '', 7000, '/images/9d18067b-2b71-473d-bfe7-287d4ab05057_large.jpg', 0);
insertItem.run(4, 'بيتزا مشكل', 'Mixed Pizza', '', 8000, '/images/2656753e-05d3-4ce9-a44e-e59cd6c5bd33_large.jpg', 0);
insertItem.run(4, 'بيتزا سمك', 'Seafood Pizza', '', 8000, '/images/a3296a39-32e4-483b-abc1-04e00c92d6d3_large.jpg', 0);
insertItem.run(4, 'بيتزا رول', 'Pizza Roll', '', 9000, '/images/c78363b4-6058-4416-9a8a-08eadb41725d_large.jpg', 0);
insertItem.run(4, 'بيتزا امريكي', 'American Pizza', '', 10000, '/images/536f143f-f121-42d9-b6e5-153cbc9bb16d_large.jpg', 0);
insertItem.run(4, 'لحمعجين', 'Lahmajun', '', 5000, '/images/14764b81-46b4-45e9-b0c6-40c2d06538fb_large.jpg', 0);
insertItem.run(4, 'بوبيت پيزا', 'Popit Pizza', '', 8000, '/images/7ede2bd3-ce82-498c-9233-f19ecfe24855_large.jpg', 0);
insertItem.run(4, 'پيزا خضروات', 'Vegetable Pizza', '', 8000, '/images/1d036284-1bff-4b24-add0-8b72bbe00288_large.jpg', 0);

// مشويات - Grills (5)
insertItem.run(5, 'كباب', 'Kebab', '', 11000, '/images/559a6db3-1ece-4154-ba2f-df96603eb6a6_large.jpg', 1);
insertItem.run(5, 'تكة لحم', 'Meat Tikka', '', 13000, '/images/e15fcf1e-90c1-42bb-8f1d-fbc4c201be4f_large.jpg', 1);
insertItem.run(5, 'تكة دجاج', 'Chicken Tikka', '', 10000, '/images/75dced0e-c3f2-40cb-a084-81e920086311_large.jpg', 0);
insertItem.run(5, 'اجنحة', 'Wings', '', 9000, '/images/23a86004-5d72-4807-aa75-2d5db7a68622_large.jpg', 0);
insertItem.run(5, 'كباب بالجبن', 'Cheese Kebab', '', 12000, '/images/230b477b-ae8a-47c4-b747-44134beb070c_large.jpg', 0);
insertItem.run(5, 'كباب باذنجان', 'Eggplant Kebab', '', 10000, '/images/3d470fda-cb0f-4bb9-aec1-40715d2706f1_large.jpg', 0);
insertItem.run(5, 'كباب دجاج', 'Chicken Kebab', '', 10000, '/images/61c47da7-1089-4620-ab31-7ab9136ae917_large.jpg', 0);
insertItem.run(5, 'كباب تركي', 'Turkish Kebab', '', 12000, '/images/edbc5fc0-4c11-42cb-92c9-9559fe1781c4_large.jpg', 0);
insertItem.run(5, 'مشكل', 'Mixed Grill', '', 12000, '/images/67b318c5-380e-47eb-b7ec-3280c5257600_large.jpg', 1);
insertItem.run(5, 'دجاج مسحب', 'Pulled Chicken', '', 11000, '/images/76dd66b7-1e26-4925-b250-572bbe343bda_large.jpg', 0);
insertItem.run(5, 'كيلو مشويا مشكل', 'Mixed Grill 1KG', '', 35000, '/images/8febdd64-509f-4a3d-9f84-fc09dba1698e_large.jpg', 0);

// وجبات غريب - Special Meals (6)
insertItem.run(6, 'مكسيكي', 'Mexican', '', 10000, '/images/81534c22-e4f3-4a06-baa4-2f2d6780cdae_large.jpg', 1);
insertItem.run(6, 'ماعون فلافل', 'Falafel Platter', '', 5000, '/images/9a4cc69a-8fc5-401d-8125-716946e5a8b2_large.jpg', 0);
insertItem.run(6, 'كسادياس', 'Quesadillas', '', 8000, '/images/ba557e0e-5140-470d-9e87-3a654ee662f8_large.jpg', 0);
insertItem.run(6, 'كبة لحم', 'Meat Kibbeh', '', 7000, '/images/60331cce-3c4a-4acd-b1f7-0e9690211e49_large.jpg', 0);
insertItem.run(6, 'برك جبنة', 'Cheese Borek', '', 6000, '/images/f333038f-6170-4ec9-960c-9d0a029dada9_large.jpg', 0);
insertItem.run(6, 'وجز بطاطا', 'Potato Wedges', '', 5000, '/images/9551b41c-3a0f-48a3-a03f-11382f14a781_large.jpg', 0);
insertItem.run(6, 'فينگر', 'Fingers', '', 3000, '/images/edfcdf99-436b-4b23-adb1-a9fece45ecef_large.jpg', 0);
insertItem.run(6, 'فرانسيسكو', 'Francisco', '', 9000, '/images/7343cd6c-7ce8-4fcc-90c7-09b186e3c560_large.jpg', 0);
insertItem.run(6, 'كريسبى', 'Crispy', '', 9000, '/images/4ff6beda-3b5b-4277-a352-c32aceda660a_large.jpg', 1);
insertItem.run(6, 'اسكالوب ميلانيز', 'Scalop Milanese', '', 10000, '/images/d91631b1-f758-4b3a-b57a-0f4d279fe3d4_large.jpg', 0);
insertItem.run(6, 'اسكالوب', 'Scalop', '', 9000, '/images/ae1dbd0d-c864-4d2f-b97e-156caec6b627_large.jpg', 0);
insertItem.run(6, 'ستيك لحم', 'Beef Steak', '', 10000, '/images/6d820f0c-dfc4-47f1-b270-fb6b9abdacc3_large.jpg', 1);
insertItem.run(6, 'سوبريم', 'Supreme', '', 9000, '/images/32a8d022-e5e3-447f-81ba-cb32e70d09b3_large.jpg', 0);
insertItem.run(6, 'تشكن فرايز', 'Chicken Fries', '', 8000, '/images/6e7e9e19-d81f-4419-b0ac-15ddd2583a44_large.jpg', 0);
insertItem.run(6, 'كوردون بلو', 'Cordon Bleu', '', 9000, '/images/4ff83431-9e5a-4a0f-afcf-c2ce266ce44d_large.jpg', 0);
insertItem.run(6, 'دجاج كاري', 'Chicken Curry', '', 9000, '/images/655bf5a5-2fb9-4382-9205-f358eed54735_large.jpg', 0);
insertItem.run(6, 'چيس فرايز', 'Cheese Fries', '', 5000, '/images/fc1ac58a-9e58-4efb-8822-ed98c44328ea_large.jpg', 0);
insertItem.run(6, 'دايت بوكس', 'Diet Box', '', 5000, '/images/abaae504-d3d6-404f-8252-d75c1d8d922c_large.jpg', 0);
insertItem.run(6, 'قلي سيل لحم', 'Meat Grill Seal', '', 9000, '/images/2a74f202-7f91-4aca-8907-75f86684ef94_large.jpg', 0);
insertItem.run(6, 'قلي سيل دجاج', 'Chicken Grill Seal', '', 8000, '/images/34727648-cbfb-4044-a181-57c08a78d96b_large.jpg', 0);
insertItem.run(6, 'لحم بالفطر', 'Meat with Mushroom', '', 10000, '/images/dd879137-45fc-4200-8f75-9dd531c36db0_large.jpg', 0);
insertItem.run(6, 'فاهيتا لحم', 'Meat Fajita', '', 10000, '/images/aab9d560-acee-40b8-991e-579e2dde6677_large.jpg', 0);
insertItem.run(6, 'فاهيتا دجاج', 'Chicken Fajita', '', 9000, '/images/b0baf9f6-6d06-4a3f-8a0b-3fddb16c3ade_large.jpg', 0);
insertItem.run(6, 'شيش طاو', 'Shish Tawook', '', 9000, '/images/186f449f-f239-4f01-bba4-b5cb3ca35ff1_large.jpg', 0);
insertItem.run(6, 'ريزو', 'Rizo', 'رز و كريسبي', 6000, '/images/18f4f15d-e5c5-48c9-8170-d66814ab3b64_large.jpg', 0);
insertItem.run(6, 'بوبيت لحم', 'Meat Popit', '', 10000, '/images/0b95368c-d91e-47d0-a9e7-22535aef70ae_large.jpg', 0);
insertItem.run(6, 'بوبيت دجاج', 'Chicken Popit', '', 9000, '/images/d94e575b-08cf-485c-a9cd-4c1d14c7f574_large.jpg', 0);
insertItem.run(6, 'كنتاكي', 'Kentucky', '', 7000, '/images/9d89e506-2a6e-484e-aec6-5421d4ba130d_large.jpg', 0);

// برگر - Burgers (7)
insertItem.run(7, 'همبرگر دادى', 'Dady Burger', '', 8000, '/images/4b600e31-1498-47e8-89dd-810acb6b11d2_large.jpg', 1);
insertItem.run(7, 'همبرگر لحم دبل', 'Double Meat Burger', '', 7000, '/images/5061a20f-0e56-4f44-a481-01e9ffb09ad3_large.jpg', 1);
insertItem.run(7, 'همبرگر دجاج دبل', 'Double Chicken Burger', '', 6000, '/images/dd2ae69d-b590-4917-888a-bbf88c4d3fad_large.jpg', 0);
insertItem.run(7, 'همبرگر لحم', 'Meat Burger', '', 5000, '/images/b67ccded-0fa7-4740-a047-b11886e70944_large.jpg', 0);
insertItem.run(7, 'همبرگر دجاج كريسبي', 'Crispy Chicken Burger', '', 5000, '/images/6cccd528-13d9-4660-960b-4627a5fed188_large.jpg', 0);

// باستا - Pasta (8)
insertItem.run(8, 'فوتوشيني', 'Fettuccine', '', 9000, '/images/67a73499-5039-4ab9-b4af-4ffb1280d048_large.jpg', 1);
insertItem.run(8, 'باستا', 'Pasta', '', 9000, '/images/bd606cd3-81c9-40bc-bd4f-f3ded6401d93_large.jpg', 0);
insertItem.run(8, 'نودلز', 'Noodles', '', 6000, '/images/094a4f96-2edb-4388-829d-cc160cd4f4c0_large.jpg', 0);
insertItem.run(8, 'معكرون بشاميل كبير', 'Large Bechamel Pasta', '', 7000, '/images/5ecf90f6-320e-4869-b600-351afbacfdb0_large.jpg', 1);
insertItem.run(8, 'معكرون بشاميل صغير', 'Small Bechamel Pasta', '', 5000, '/images/78a8cf1b-d055-4031-86ba-5f7c0349813a_large.jpg', 0);

// مشروبات غازية - Beverages (9)
insertItem.run(9, 'بيبسي جيهاز', 'Pepsi Machine', '', 1500, '/images/b2c2aedd-8502-4be5-9343-91849b99aa04_large.jpg', 0);
insertItem.run(9, 'مشروبات غازية', 'Soft Drinks', '', 750, '/images/15f24548-6080-4e3a-a60b-a85383a3b017_large.jpg', 0);
insertItem.run(9, 'لبن', 'Yogurt Drink', '', 750, '/images/ad70dd39-9b42-4bc6-900d-bbea0dc4ee06_large.jpg', 0);
insertItem.run(9, 'لبن مكينه', 'Machine Yogurt', '', 2000, '/images/c6e0e92b-af25-43db-8f6f-44565074bea1_large.jpg', 0);

// دايت - Diet (10)
insertItem.run(10, 'سمك دايت', 'Diet Fish', '', 7000, '/images/05940a68-d822-41c0-9f21-289b66ac6107_large.jpg', 1);
insertItem.run(10, 'بوكس دايت', 'Diet Box', '', 5000, '/images/1497507b-9383-4323-9434-01b7ccb065ba_large.jpg', 0);
insertItem.run(10, 'دايت', 'Diet', '', 6000, '/images/cac268c4-9912-4dcd-b63d-9d9e2ca5f0ee_large.jpg', 0);

export default db;
