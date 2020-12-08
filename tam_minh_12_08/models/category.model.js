const list = [
  { CatID: 1, CatName: 'Laptop' },
  { CatID: 2, CatName: 'Phone' },
  { CatID: 3, CatName: 'Quần áo' },
  { CatID: 4, CatName: 'Giày dép' },
  { CatID: 5, CatName: 'Trang sức' },
  { CatID: 6, CatName: 'Khác' },
];

module.exports = {
  all() {
    return list;
  },

  add(category) {
    list.push(category);
  }
};
