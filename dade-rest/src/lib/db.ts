import { createClient } from '@libsql/client';

// Menu data embedded directly - works on serverless
const menuData = {
  categories: [
    { id: 1, name: 'مقبلات', name_en: 'Appetizers', image: '🥗' },
    { id: 2, name: 'سندويش', name_en: 'Sandwiches', image: '🥪' },
    { id: 3, name: 'شاورما', name_en: 'Shawarma', image: '🌯' },
    { id: 4, name: 'بيتزا', name_en: 'Pizza', image: '🍕' },
    { id: 5, name: 'مشويات', name_en: 'Grills', image: '🍖' },
    { id: 6, name: 'وجبات غريب', name_en: 'Special Meals', image: '🍽️' },
    { id: 7, name: 'برگر', name_en: 'Burgers', image: '🍔' },
    { id: 8, name: 'باستا', name_en: 'Pasta', image: '🍝' },
    { id: 9, name: 'مشروبات غازية', name_en: 'Beverages', image: '🥤' },
    { id: 10, name: 'دايت', name_en: 'Diet', image: '🥬' },
  ],
  items: [
    // مقبلات - Appetizers (1)
    { id: 1, category_id: 1, name: 'حمص باللحمة', name_en: 'Hummus with meat', description: 'Hummus with meat', price: 4000, image: '/images/78853ec1-4869-4ce6-9e64-dda61ca14cfe_large.jpg', is_available: 1, is_featured: 1 },
    { id: 2, category_id: 1, name: 'سلطة شرقية', name_en: 'Oriental Salad', description: '', price: 4000, image: '/images/a4b083de-a9c6-4fa1-9c3b-7e322a981463_large.jpg', is_available: 1, is_featured: 0 },
    { id: 3, category_id: 1, name: 'سلطة سيزر', name_en: 'Caesar Salad', description: '', price: 6000, image: '/images/575a8b68-79f4-4694-a14f-c830fbd7cec1_large.jpg', is_available: 1, is_featured: 1 },
    { id: 4, category_id: 1, name: 'سلطة جرجير', name_en: 'Arugula Salad', description: '', price: 4000, image: '/images/eb71e438-529b-44e9-9124-3cffa3ad50ea_large.jpg', is_available: 1, is_featured: 0 },
    { id: 5, category_id: 1, name: 'تبولة', name_en: 'Tabbouleh', description: '', price: 5000, image: '/images/1668c28e-60bf-4c88-949e-34e0c693b1a9_large.jpg', is_available: 1, is_featured: 0 },
    { id: 6, category_id: 1, name: 'سلطة فتوش', name_en: 'Fattoush', description: '', price: 4000, image: '/images/506162f4-7231-4e7f-8f5b-4da4a8e3b1f8_large.jpg', is_available: 1, is_featured: 0 },
    { id: 7, category_id: 1, name: 'مقبلات', name_en: 'Appetizers', description: '', price: 3000, image: '/images/1be57356-065b-41dc-9aea-df778842422e_large.jpg', is_available: 1, is_featured: 0 },
    { id: 8, category_id: 1, name: 'كريسبى', name_en: 'Crispy', description: '', price: 5000, image: '/images/17278f3d-4ee1-4f7d-9a49-644faa462927_large.jpg', is_available: 1, is_featured: 0 },
    { id: 9, category_id: 1, name: 'سكالوب', name_en: 'Scallop', description: '', price: 5000, image: '/images/aba662fe-691c-44ab-a881-cad6b1509850_large.jpg', is_available: 1, is_featured: 0 },
    { id: 10, category_id: 1, name: 'فرانسيسكو', name_en: 'Francisco', description: '', price: 5000, image: '/images/7b41533c-4852-49a6-9151-3dfbfc13b107_large.jpg', is_available: 1, is_featured: 0 },
    { id: 11, category_id: 1, name: 'فلافل', name_en: 'Falafel', description: '', price: 2500, image: '/images/5df93e48-74a7-4df7-9672-0acfbf35144d_large.jpg', is_available: 1, is_featured: 1 },
    { id: 12, category_id: 1, name: 'سوبريم', name_en: 'Supreme', description: '', price: 5000, image: '/images/cd214bd8-8828-412e-85a4-0ed9c18cc199_large.jpg', is_available: 1, is_featured: 0 },
    { id: 13, category_id: 1, name: 'فاهيتا', name_en: 'Fajita', description: '', price: 5000, image: '/images/a06f6207-1b91-4226-b36b-d78a8c4b6c99_large.jpg', is_available: 1, is_featured: 0 },
    { id: 14, category_id: 1, name: 'مكسيكي', name_en: 'Mexican', description: '', price: 5000, image: '/images/6648d1d6-0e0e-46f2-9f06-d4eef59526b9_large.jpg', is_available: 1, is_featured: 0 },
    // سندويش - Sandwiches (2)
    { id: 15, category_id: 2, name: 'لفه كباب', name_en: 'Kebab Wrap', description: '', price: 4000, image: '/images/385bb1b5-969c-43cc-9b29-cee08c6160d2_large.jpg', is_available: 1, is_featured: 1 },
    { id: 16, category_id: 2, name: 'دونر دجاج', name_en: 'Chicken Doner', description: '', price: 3000, image: '/images/6f379680-0c32-4de4-8f30-7f736d7a86c6_large.jpg', is_available: 1, is_featured: 0 },
    { id: 17, category_id: 2, name: 'صاج دجاج', name_en: 'Chicken Saj', description: '', price: 3000, image: '/images/2c9af5dd-5208-4e12-9f50-c2739d1f26db_large.jpg', is_available: 1, is_featured: 0 },
    { id: 18, category_id: 2, name: 'صاج لحم', name_en: 'Meat Saj', description: '', price: 4000, image: '/images/172bcfcd-a7a7-4af1-bd1d-12ce8b343018_large.jpg', is_available: 1, is_featured: 1 },
    { id: 19, category_id: 2, name: 'وجبة عربية فلافل', name_en: 'Arabic Falafel Meal', description: '', price: 5000, image: '/images/30619c6d-96bf-4586-bdbe-673e5431630b_large.jpg', is_available: 1, is_featured: 0 },
    { id: 20, category_id: 2, name: 'بوكس دجاج', name_en: 'Chicken Box', description: '', price: 4000, image: '/images/fd1fad19-eee1-4da4-bc09-450501987b74_large.jpg', is_available: 1, is_featured: 0 },
    { id: 21, category_id: 2, name: 'بوكس لحم', name_en: 'Meat Box', description: '', price: 5000, image: '/images/7ce097d9-4fb5-4f92-bd60-03f6d2a9e85e_large.jpg', is_available: 1, is_featured: 0 },
    // شاورما - Shawarma (3)
    { id: 22, category_id: 3, name: 'ماعون دجاج', name_en: 'Chicken Platter', description: '', price: 7000, image: '/images/85efc96b-3f2a-4c6c-ae4c-2fffd16d2980_large.jpg', is_available: 1, is_featured: 1 },
    { id: 23, category_id: 3, name: 'ماعون لحم', name_en: 'Meat Platter', description: '', price: 10000, image: '/images/0ec494a2-faf0-4339-9b93-8390690eca29_large.jpg', is_available: 1, is_featured: 1 },
    { id: 24, category_id: 3, name: 'اسكندر لحم', name_en: 'Iskender Meat', description: '', price: 10000, image: '/images/91cdc8b7-f427-4541-90af-99e3b2178a04_large.jpg', is_available: 1, is_featured: 1 },
    { id: 25, category_id: 3, name: 'شاورما عربية دجاج', name_en: 'Arabic Chicken Shawarma', description: '', price: 7000, image: '/images/3c61a7e1-b472-4b1c-b383-85f7db14a6e4_large.jpg', is_available: 1, is_featured: 0 },
    { id: 26, category_id: 3, name: 'شاورما عربية لحم', name_en: 'Arabic Meat Shawarma', description: '', price: 9000, image: '/images/e78c296a-6309-4337-8a7a-fa8c85e8966f_large.jpg', is_available: 1, is_featured: 0 },
    { id: 27, category_id: 3, name: 'دونه ر لحم', name_en: 'Meat Doner', description: '', price: 4000, image: '/images/1c01250e-183b-46c1-a5ed-9011844b5ef1_large.jpg', is_available: 1, is_featured: 0 },
    // بيتزا - Pizza (4)
    { id: 28, category_id: 4, name: 'بيتزا لحم', name_en: 'Meat Pizza', description: '', price: 9000, image: '/images/508807bc-1e70-44b8-95f5-ebc5d5401052_large.jpg', is_available: 1, is_featured: 1 },
    { id: 29, category_id: 4, name: 'بيتزا دجاج', name_en: 'Chicken Pizza', description: '', price: 8000, image: '/images/2c2b2c19-a2f7-4bf0-aeaf-c9f0e77379b2_large.jpg', is_available: 1, is_featured: 0 },
    { id: 30, category_id: 4, name: 'بيتزا بيبيروني', name_en: 'Pepperoni Pizza', description: '', price: 8000, image: '/images/a90f49fa-7f2a-4670-9e50-450859c96bca_large.jpg', is_available: 1, is_featured: 1 },
    { id: 31, category_id: 4, name: 'بيتزا مارغريتا', name_en: 'Margherita Pizza', description: '', price: 7000, image: '/images/9d18067b-2b71-473d-bfe7-287d4ab05057_large.jpg', is_available: 1, is_featured: 0 },
    { id: 32, category_id: 4, name: 'بيتزا مشكل', name_en: 'Mixed Pizza', description: '', price: 8000, image: '/images/2656753e-05d3-4ce9-a44e-e59cd6c5bd33_large.jpg', is_available: 1, is_featured: 0 },
    { id: 33, category_id: 4, name: 'بيتزا سمك', name_en: 'Seafood Pizza', description: '', price: 8000, image: '/images/a3296a39-32e4-483b-abc1-04e00c92d6d3_large.jpg', is_available: 1, is_featured: 0 },
    { id: 34, category_id: 4, name: 'بيتزا رول', name_en: 'Pizza Roll', description: '', price: 9000, image: '/images/c78363b4-6058-4416-9a8a-08eadb41725d_large.jpg', is_available: 1, is_featured: 0 },
    { id: 35, category_id: 4, name: 'بيتزا امريكي', name_en: 'American Pizza', description: '', price: 10000, image: '/images/536f143f-f121-42d9-b6e5-153cbc9bb16d_large.jpg', is_available: 1, is_featured: 0 },
    { id: 36, category_id: 4, name: 'لحمعجين', name_en: 'Lahmajun', description: '', price: 5000, image: '/images/14764b81-46b4-45e9-b0c6-40c2d06538fb_large.jpg', is_available: 1, is_featured: 0 },
    { id: 37, category_id: 4, name: 'بوبيت پيزا', name_en: 'Popit Pizza', description: '', price: 8000, image: '/images/7ede2bd3-ce82-498c-9233-f19ecfe24855_large.jpg', is_available: 1, is_featured: 0 },
    { id: 38, category_id: 4, name: 'پيزا خضروات', name_en: 'Vegetable Pizza', description: '', price: 8000, image: '/images/1d036284-1bff-4b24-add0-8b72bbe00288_large.jpg', is_available: 1, is_featured: 0 },
    // مشويات - Grills (5)
    { id: 39, category_id: 5, name: 'كباب', name_en: 'Kebab', description: '', price: 11000, image: '/images/559a6db3-1ece-4154-ba2f-df96603eb6a6_large.jpg', is_available: 1, is_featured: 1 },
    { id: 40, category_id: 5, name: 'تكة لحم', name_en: 'Meat Tikka', description: '', price: 13000, image: '/images/e15fcf1e-90c1-42bb-8f1d-fbc4c201be4f_large.jpg', is_available: 1, is_featured: 1 },
    { id: 41, category_id: 5, name: 'تكة دجاج', name_en: 'Chicken Tikka', description: '', price: 10000, image: '/images/75dced0e-c3f2-40cb-a084-81e920086311_large.jpg', is_available: 1, is_featured: 0 },
    { id: 42, category_id: 5, name: 'اجنحة', name_en: 'Wings', description: '', price: 9000, image: '/images/23a86004-5d72-4807-aa75-2d5db7a68622_large.jpg', is_available: 1, is_featured: 0 },
    { id: 43, category_id: 5, name: 'كباب بالجبن', name_en: 'Cheese Kebab', description: '', price: 12000, image: '/images/230b477b-ae8a-47c4-b747-44134beb070c_large.jpg', is_available: 1, is_featured: 0 },
    { id: 44, category_id: 5, name: 'كباب باذنجان', name_en: 'Eggplant Kebab', description: '', price: 10000, image: '/images/3d470fda-cb0f-4bb9-aec1-40715d2706f1_large.jpg', is_available: 1, is_featured: 0 },
    { id: 45, category_id: 5, name: 'كباب دجاج', name_en: 'Chicken Kebab', description: '', price: 10000, image: '/images/61c47da7-1089-4620-ab31-7ab9136ae917_large.jpg', is_available: 1, is_featured: 0 },
    { id: 46, category_id: 5, name: 'كباب تركي', name_en: 'Turkish Kebab', description: '', price: 12000, image: '/images/edbc5fc0-4c11-42cb-92c9-9559fe1781c4_large.jpg', is_available: 1, is_featured: 0 },
    { id: 47, category_id: 5, name: 'مشكل', name_en: 'Mixed Grill', description: '', price: 12000, image: '/images/67b318c5-380e-47eb-b7ec-3280c5257600_large.jpg', is_available: 1, is_featured: 1 },
    { id: 48, category_id: 5, name: 'دجاج مسحب', name_en: 'Pulled Chicken', description: '', price: 11000, image: '/images/76dd66b7-1e26-4925-b250-572bbe343bda_large.jpg', is_available: 1, is_featured: 0 },
    { id: 49, category_id: 5, name: 'كيلو مشويا مشكل', name_en: 'Mixed Grill 1KG', description: '', price: 35000, image: '/images/8febdd64-509f-4a3d-9f84-fc09dba1698e_large.jpg', is_available: 1, is_featured: 0 },
    // وجبات غريب - Special Meals (6)
    { id: 50, category_id: 6, name: 'مكسيكي', name_en: 'Mexican', description: '', price: 10000, image: '/images/81534c22-e4f3-4a06-baa4-2f2d6780cdae_large.jpg', is_available: 1, is_featured: 1 },
    { id: 51, category_id: 6, name: 'ماعون فلافل', name_en: 'Falafel Platter', description: '', price: 5000, image: '/images/9a4cc69a-8fc5-401d-8125-716946e5a8b2_large.jpg', is_available: 1, is_featured: 0 },
    { id: 52, category_id: 6, name: 'كسادياس', name_en: 'Quesadillas', description: '', price: 8000, image: '/images/ba557e0e-5140-470d-9e87-3a654ee662f8_large.jpg', is_available: 1, is_featured: 0 },
    { id: 53, category_id: 6, name: 'كبة لحم', name_en: 'Meat Kibbeh', description: '', price: 7000, image: '/images/60331cce-3c4a-4acd-b1f7-0e9690211e49_large.jpg', is_available: 1, is_featured: 0 },
    { id: 54, category_id: 6, name: 'برك جبنة', name_en: 'Cheese Borek', description: '', price: 6000, image: '/images/f333038f-6170-4ec9-960c-9d0a029dada9_large.jpg', is_available: 1, is_featured: 0 },
    { id: 55, category_id: 6, name: 'وجز بطاطا', name_en: 'Potato Wedges', description: '', price: 5000, image: '/images/9551b41c-3a0f-48a3-a03f-11382f14a781_large.jpg', is_available: 1, is_featured: 0 },
    { id: 56, category_id: 6, name: 'فينگر', name_en: 'Fingers', description: '', price: 3000, image: '/images/edfcdf99-436b-4b23-adb1-a9fece45ecef_large.jpg', is_available: 1, is_featured: 0 },
    { id: 57, category_id: 6, name: 'فرانسيسكو', name_en: 'Francisco', description: '', price: 9000, image: '/images/7343cd6c-7ce8-4fcc-90c7-09b186e3c560_large.jpg', is_available: 1, is_featured: 0 },
    { id: 58, category_id: 6, name: 'كريسبى', name_en: 'Crispy', description: '', price: 9000, image: '/images/4ff6beda-3b5b-4277-a352-c32aceda660a_large.jpg', is_available: 1, is_featured: 1 },
    { id: 59, category_id: 6, name: 'اسكالوب ميلانيز', name_en: 'Scalop Milanese', description: '', price: 10000, image: '/images/d91631b1-f758-4b3a-b57a-0f4d279fe3d4_large.jpg', is_available: 1, is_featured: 0 },
    { id: 60, category_id: 6, name: 'اسكالوب', name_en: 'Scalop', description: '', price: 9000, image: '/images/ae1dbd0d-c864-4d2f-b97e-156caec6b627_large.jpg', is_available: 1, is_featured: 0 },
    { id: 61, category_id: 6, name: 'ستيك لحم', name_en: 'Beef Steak', description: '', price: 10000, image: '/images/6d820f0c-dfc4-47f1-b270-fb6b9abdacc3_large.jpg', is_available: 1, is_featured: 1 },
    { id: 62, category_id: 6, name: 'سوبريم', name_en: 'Supreme', description: '', price: 9000, image: '/images/32a8d022-e5e3-447f-81ba-cb32e70d09b3_large.jpg', is_available: 1, is_featured: 0 },
    { id: 63, category_id: 6, name: 'تشكن فرايز', name_en: 'Chicken Fries', description: '', price: 8000, image: '/images/6e7e9e19-d81f-4419-b0ac-15ddd2583a44_large.jpg', is_available: 1, is_featured: 0 },
    { id: 64, category_id: 6, name: 'كوردون بلو', name_en: 'Cordon Bleu', description: '', price: 9000, image: '/images/4ff83431-9e5a-4a0f-afcf-c2ce266ce44d_large.jpg', is_available: 1, is_featured: 0 },
    { id: 65, category_id: 6, name: 'دجاج كاري', name_en: 'Chicken Curry', description: '', price: 9000, image: '/images/655bf5a5-2fb9-4382-9205-f358eed54735_large.jpg', is_available: 1, is_featured: 0 },
    { id: 66, category_id: 6, name: 'چيس فرايز', name_en: 'Cheese Fries', description: '', price: 5000, image: '/images/fc1ac58a-9e58-4efb-8822-ed98c44328ea_large.jpg', is_available: 1, is_featured: 0 },
    { id: 67, category_id: 6, name: 'دايت بوكس', name_en: 'Diet Box', description: '', price: 5000, image: '/images/abaae504-d3d6-404f-8252-d75c1d8d922c_large.jpg', is_available: 1, is_featured: 0 },
    { id: 68, category_id: 6, name: 'قلي سيل لحم', name_en: 'Meat Grill Seal', description: '', price: 9000, image: '/images/2a74f202-7f91-4aca-8907-75f86684ef94_large.jpg', is_available: 1, is_featured: 0 },
    { id: 69, category_id: 6, name: 'قلي سيل دجاج', name_en: 'Chicken Grill Seal', description: '', price: 8000, image: '/images/34727648-cbfb-4044-a181-57c08a78d96b_large.jpg', is_available: 1, is_featured: 0 },
    { id: 70, category_id: 6, name: 'لحم بالفطر', name_en: 'Meat with Mushroom', description: '', price: 10000, image: '/images/dd879137-45fc-4200-8f75-9dd531c36db0_large.jpg', is_available: 1, is_featured: 0 },
    { id: 71, category_id: 6, name: 'فاهيتا لحم', name_en: 'Meat Fajita', description: '', price: 10000, image: '/images/aab9d560-acee-40b8-991e-579e2dde6677_large.jpg', is_available: 1, is_featured: 0 },
    { id: 72, category_id: 6, name: 'فاهيتا دجاج', name_en: 'Chicken Fajita', description: '', price: 9000, image: '/images/b0baf9f6-6d06-4a3f-8a0b-3fddb16c3ade_large.jpg', is_available: 1, is_featured: 0 },
    { id: 73, category_id: 6, name: 'شيش طاو', name_en: 'Shish Tawook', description: '', price: 9000, image: '/images/186f449f-f239-4f01-bba4-b5cb3ca35ff1_large.jpg', is_available: 1, is_featured: 0 },
    { id: 74, category_id: 6, name: 'ريزو', name_en: 'Rizo', description: 'رز و كريسبي', price: 6000, image: '/images/18f4f15d-e5c5-48c9-8170-d66814ab3b64_large.jpg', is_available: 1, is_featured: 0 },
    { id: 75, category_id: 6, name: 'بوبيت لحم', name_en: 'Meat Popit', description: '', price: 10000, image: '/images/0b95368c-d91e-47d0-a9e7-22535aef70ae_large.jpg', is_available: 1, is_featured: 0 },
    { id: 76, category_id: 6, name: 'بوبيت دجاج', name_en: 'Chicken Popit', description: '', price: 9000, image: '/images/d94e575b-08cf-485c-a9cd-4c1d14c7f574_large.jpg', is_available: 1, is_featured: 0 },
    { id: 77, category_id: 6, name: 'كنتاكي', name_en: 'Kentucky', description: '', price: 7000, image: '/images/9d89e506-2a6e-484e-aec6-5421d4ba130d_large.jpg', is_available: 1, is_featured: 0 },
    // برگر - Burgers (7)
    { id: 78, category_id: 7, name: 'همبرگر دادى', name_en: 'Dady Burger', description: '', price: 8000, image: '/images/4b600e31-1498-47e8-89dd-810acb6b11d2_large.jpg', is_available: 1, is_featured: 1 },
    { id: 79, category_id: 7, name: 'همبرگر لحم دبل', name_en: 'Double Meat Burger', description: '', price: 7000, image: '/images/5061a20f-0e56-4f44-a481-01e9ffb09ad3_large.jpg', is_available: 1, is_featured: 1 },
    { id: 80, category_id: 7, name: 'همبرگر دجاج دبل', name_en: 'Double Chicken Burger', description: '', price: 6000, image: '/images/dd2ae69d-b590-4917-888a-bbf88c4d3fad_large.jpg', is_available: 1, is_featured: 0 },
    { id: 81, category_id: 7, name: 'همبرگر لحم', name_en: 'Meat Burger', description: '', price: 5000, image: '/images/b67ccded-0fa7-4740-a047-b11886e70944_large.jpg', is_available: 1, is_featured: 0 },
    { id: 82, category_id: 7, name: 'همبرگر دجاج كريسبي', name_en: 'Crispy Chicken Burger', description: '', price: 5000, image: '/images/6cccd528-13d9-4660-960b-4627a5fed188_large.jpg', is_available: 1, is_featured: 0 },
    // باستا - Pasta (8)
    { id: 83, category_id: 8, name: 'فوتوشيني', name_en: 'Fettuccine', description: '', price: 9000, image: '/images/67a73499-5039-4ab9-b4af-4ffb1280d048_large.jpg', is_available: 1, is_featured: 1 },
    { id: 84, category_id: 8, name: 'باستا', name_en: 'Pasta', description: '', price: 9000, image: '/images/bd606cd3-81c9-40bc-bd4f-f3ded6401d93_large.jpg', is_available: 1, is_featured: 0 },
    { id: 85, category_id: 8, name: 'نودلز', name_en: 'Noodles', description: '', price: 6000, image: '/images/094a4f96-2edb-4388-829d-cc160cd4f4c0_large.jpg', is_available: 1, is_featured: 0 },
    { id: 86, category_id: 8, name: 'معكرون بشاميل كبير', name_en: 'Large Bechamel Pasta', description: '', price: 7000, image: '/images/5ecf90f6-320e-4869-b600-351afbacfdb0_large.jpg', is_available: 1, is_featured: 1 },
    { id: 87, category_id: 8, name: 'معكرون بشاميل صغير', name_en: 'Small Bechamel Pasta', description: '', price: 5000, image: '/images/78a8cf1b-d055-4031-86ba-5f7c0349813a_large.jpg', is_available: 1, is_featured: 0 },
    // مشروبات غازية - Beverages (9)
    { id: 88, category_id: 9, name: 'بيبسي جيهاز', name_en: 'Pepsi Machine', description: '', price: 1500, image: '/images/b2c2aedd-8502-4be5-9343-91849b99aa04_large.jpg', is_available: 1, is_featured: 0 },
    { id: 89, category_id: 9, name: 'مشروبات غازية', name_en: 'Soft Drinks', description: '', price: 750, image: '/images/15f24548-6080-4e3a-a60b-a85383a3b017_large.jpg', is_available: 1, is_featured: 0 },
    { id: 90, category_id: 9, name: 'لبن', name_en: 'Yogurt Drink', description: '', price: 750, image: '/images/ad70dd39-9b42-4bc6-900d-bbea0dc4ee06_large.jpg', is_available: 1, is_featured: 0 },
    { id: 91, category_id: 9, name: 'لبن مكينه', name_en: 'Machine Yogurt', description: '', price: 2000, image: '/images/c6e0e92b-af25-43db-8f6f-44565074bea1_large.jpg', is_available: 1, is_featured: 0 },
    // دايت - Diet (10)
    { id: 92, category_id: 10, name: 'سمك دايت', name_en: 'Diet Fish', description: '', price: 7000, image: '/images/05940a68-d822-41c0-9f21-289b66ac6107_large.jpg', is_available: 1, is_featured: 1 },
    { id: 93, category_id: 10, name: 'بوكس دايت', name_en: 'Diet Box', description: '', price: 5000, image: '/images/1497507b-9383-4323-9434-01b7ccb065ba_large.jpg', is_available: 1, is_featured: 0 },
    { id: 94, category_id: 10, name: 'دايت', name_en: 'Diet', description: '', price: 6000, image: '/images/cac268c4-9912-4dcd-b63d-9d9e2ca5f0ee_large.jpg', is_available: 1, is_featured: 0 },
  ]
};

// Helper functions to query the embedded data
export function getCategories() {
  return menuData.categories;
}

export function getMenuItems(options?: { categoryId?: number; featured?: boolean; search?: string }) {
  let items = menuData.items.filter(item => item.is_available === 1);
  
  if (options?.categoryId) {
    items = items.filter(item => item.category_id === options.categoryId);
  }
  
  if (options?.featured) {
    items = items.filter(item => item.is_featured === 1);
  }
  
  if (options?.search) {
    const searchLower = options.search.toLowerCase();
    items = items.filter(item => 
      item.name.toLowerCase().includes(searchLower) || 
      item.name_en.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    );
  }
  
  return items.map(item => {
    const category = menuData.categories.find(c => c.id === item.category_id);
    return {
      ...item,
      category_name: category?.name || '',
      category_name_en: category?.name_en || ''
    };
  });
}

export function getMenuItem(id: number) {
  const item = menuData.items.find(i => i.id === id);
  if (!item) return null;
  
  const category = menuData.categories.find(c => c.id === item.category_id);
  return {
    ...item,
    category_name: category?.name || '',
    category_name_en: category?.name_en || ''
  };
}

export default { getCategories, getMenuItems, getMenuItem };
