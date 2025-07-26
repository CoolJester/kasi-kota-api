var menuItems = [
    {
        name: 'base',
        price: null,
        imageUrl: null,
        items: [
            'Bun', 'Chips', 'Archaar', 'Sauces'
        ]
    },
    {
        name: 'Number 1',
        price: 15,
        imageUrl: '',
        items: [
            'polony'
        ]
    },
        {
        name: 'Number 2',
        price: 25,
        imageUrl: '',
        items: [
            'polony', 'sausage'
        ]
    },
        {
        name: 'Number 3',
        price: 35,
        imageUrl: '',
        items: [
            'polony', 'special', 'cheese', 'sausage' 
        ]
    },
        {
        name: 'Number 4',
        price: 45,
        imageUrl: '',
        items: [
            'polony', 'special', 'cheese', 'russian', 'sausage'
        ]
    },
        {
        name: 'Number 5',
        price: 55,
        imageUrl: '',
        items: [
            'burger', 'patty', 'special', 'cheese', 'russian', 'sausage' 
        ]
    },
]

exports.getMenu = (req, res) => {
  console.log('Get Menu Called');
  res.json({data: menuItems, links: {next: '', self: '', next: ''}, meta: null});
};
