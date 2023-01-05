const { Router } = require("express");
const { Product, Category, Brand } = require("../../db");
const router = Router();
const axios = require("axios");
const { Products } = require("./products.json");
//Poner Link de su API de firebase
// const api = 'https://pg-api-6f759-default-rtdb.firebaseio.com/Products.json';

router.post("/", async (req, res, next) => {
  try {
    const result = Object.values(Products);

    if (result) {
      result.map(async (p) => {
        let newProduct = await Product.create({
          name: p.name,
          image: p.image,
          price: p.price,
          stock: p.stock,
          description: p.description,
          compatibilityBrands: p.compatibilityBrands,
          ddr: p.ddr,
          socket: p.socket,
          factorMother: p.factorMother,
          weight: p.weight,
          dimensions: p.dimensions,
          wattsPowerSupply: p.wattsPowerSupply,
          inOffer: p.inOffer,
          PorcentageDiscount: p.PorcentageDiscount,
          category: p.category,
          brand: p.brand,
        });

        const brandDB = await Brand.findOne({
          where: { name: p.brand },
        });

        if (!brandDB) {
          await Brand.create({ name: p.brand });
        }

        p.category.map(async c=>{
          let categoryDB = await Category.findOne({where: { name: c }});
            
          if (!categoryDB) {await Category.create({name: c,});}

        })

      });

      return res.send("Database loaded :D");
    } else {
      res.status(401).send("The Api is not working");
    }
  } catch (e) {
    next(e);
  }
});
module.exports = router;
