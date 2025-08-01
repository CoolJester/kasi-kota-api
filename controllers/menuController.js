const colors = require('colors');
const Menu = require("../models/menu");
// createBase.createBase(menuItems); // This is to create the menu if it doesn't exist

exports.getMenu = (req, res) => {
  console.log('Get Menu Called');

  Menu.find()
    .then(response => {
        console.log(`Success getMenu: items received ${response.length}`.green);
        res.status(200).json({data: response, links: {next: '', self: '', next: ''}, meta: null});
    })
    .catch(error => {
        console.log(`Error getMenu: ${error}`.red);
        res.status(500).json({error: "Internal Server Error", message: error.message, timestamp: Date.now});
    });
};