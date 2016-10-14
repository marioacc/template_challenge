var express = require('express');
var router = express.Router();
var cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:80/',
  optionsSuccessStatus: 200
};
/* GET home page. */
router.get('/', cors(corsOptions),function(req, res, next) {
  var data={
    section1:{
      title:'Rhubarb: The Vegetable That Acts Like a Fruit',
      content:'May is all about vegetables on bobbySay.com and onesf the most popular app,  vegetables m rhubarb. Thats right, I said vegetable. Did you know that rhubarb m  actually a vegetable, not a fruit? woie rhubarb is typically treated like a fruit and most often shows up in desserts in thiscountry,too a. when usechn glazes and chutneys pairs really well with pork, lamb and chicken. But, since !could live on pastries (and cf.do) I love using rhubarb Ina variety of deSSerIS.'
    },
    section2:{
      title:'Spice-Crusted Salmon:A Holiday Dinner Thats As Impressive As It Is Quick',
      content:'Holiday season is well underway, and you know what mat means: people are BUD. With that in rm., I developed a festive recipe thats quick enough to serve on a weeknight (with some make-aheads), and beautiful and impressive enough to serve as the centerpiece for a holiday meal We love to serve a whole side of . fish -- It makes for a gorgeous presentation an  feeds a crw. T. one has a spice rub that does double duty, as seasoning for the salmon and as coating for spiced nuts that get stirred into'
    },
    section3:{
      title:'A New Favorite Take on an Old, Mediterranean Grain',
      img:'img/img-eggplant-manchego-salad-cover.png',
      content:'Packed with complex carbohydrates and fiber, delicious and any whole grains play an Important part In the MeMterranean dot. Look beyond rice and pasta, because ts wo. gettng know farro, amaranth, sfree.h and wheat berries..'
    }
  };
  res.send(JSON.stringify(data));
});

module.exports = router;
