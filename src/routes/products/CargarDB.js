const { Router } = require('express');
const { Product, Category, Brand } = require('../../db');
const router = Router();
const axios = require('axios');
const {Products} = require('./products.json');
//Poner Link de su API de firebase
// const api = 'https://pg-api-6f759-default-rtdb.firebaseio.com/Products.json';


router.post('/', async (req, res, next) => {
  try {     
    const arr = Object.values(Products)
    arr.map(p => console.log(p))
    return res.send(200)
    arr.map( async p=>{const newProduct = await Products.create({
        name : p.name,
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
          brand: p.brand
    })

    const brandDB = await Brand.findOne({
        where: {name: p.brand}
    })

    if(!brandDB){
        await Brand.create({name: p.brand})
    }

    p.category?.map(async c=>{
        const categoryDB= await Category.findOne({
            where: {name: c}
        })

        if(!categoryDB){
            await Category.create({
                name: c
            })
        }

    })
})
// const AllProduct = await axios.get(
    //   'https://pg-api-6f759-default-rtdb.firebaseio.com/Products.json'
    // );
    // const result = AllProduct.data ? AllProduct.data : [];
    // console.log(result, 'asd');
    // if (result) {
    //   for (let i = 0; i < result.length; i++) {
    //     let newProduct = await Product.create({
    //       name: result[i].name,
    //       image: result[i].image,
    //       price: result[i].price,
    //       stock: result[i].stock,
    //       description: result[i].description,
    //       compatibilityBrands: result[i].compatibilityBrands,
    //       ddr: result[i].ddr,
    //       socket: result[i].socket,
    //       factorMother: result[i].factorMother,
    //       weight: result[i].weight,
    //       dimensions: result[i].dimensions,
    //       wattsPowerSupply: result[i].wattsPowerSupply,
    //       inOffer: result[i].inOffer,
    //       PorcentageDiscount: result[i].PorcentageDiscount,
    //       category: result[i].category,
    //       brand: result[i].brand
    //     });

    //     const brandDB = await Brand.findOne({
    //       where: { name: result[i].brand },
    //     });
    //     if (!brandDB) {
    //       await Brand.create({ name: result[i].brand });
    //     }

    //     for (let j = 0; j < result[i].category.length; j++) {
    //       let categoryDB = await Category.findOne({
    //         where: { name: result[i].category[j] },
    //       });
    //       if (!categoryDB) {
    //         await Category.create({
    //           name: result[i].category[j],
    //         });
    //       }
    //     }
    //   }
      res.send('Database loaded :D'); 
  } catch (e) {
    next(e);
  }
});
module.exports = router;
