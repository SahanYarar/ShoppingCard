const products = [
  {
    id: 1,
    name: "Eti Canga",
    brand: "Eti",
    desc: "Dağınık sevenlerin dağınık çikolatası, Eti Canga",
    price: 20,
    image:
      "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744787634/07033745-8f97e5-1650x1650_w6ccim.jpg",
    location: "Turkey"
  },
  {
    id: 2,
    name: "Eti Fıstıkişi",
    brand: "Eti",
    desc: "Nefis Eti sütlü çikolatasının içindeki yoğun antep fıstığı ve çıtır rulo gofret parçacıklı kremasıyla tadına doyamayacağınız bir lezzet",
    price: 25,
    image: 
      "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744787759/8866217164850_1742977998851_aswaam.jpg",
    location: "Turkey"
  },
  {
    id: 3,
    name: "Ülker Karamio",
    brand: "Ülker",
    desc: "Karamelin çukulata ile mükemmel buluşması",
    price: 19.95,
    image:
      "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744787883/07037078-5e8a45-1650x1650_jdaxls.jpg",
    location: "International"
  },
  {
    id: 4,
    name: "Ülker Çikolatalı Gofret",
    brand: "Ülker",
    desc: "Crispy wafer filled with smooth chocolate cream",
    price: 12.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744796243/Ulker_Chocolate_Gofret_akao5w.jpg",
    category: "Chocolate",
    location: "Turkey"
  },
  {
    id: 5,
    name: "Ülker Albeni",
    brand: "Ülker",
    desc: "Soft chocolate cake with vanilla cream filling",
    price: 15.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744757868/61_0UJ5cfgL._AC_UF894_1000_QL80__oauix4.jpg",
    category: "Chocolate",
    location: "Turkey"
  },
  {
    id: 6,
    name: "Eti Karam",
    brand: "Eti",
    desc: "Classic milk chocolate bar",
    price: 14.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744757988/eti-karam-gourmet-bitter-chocolate-wafer_cguf5t.jpg",
    category: "Chocolate",
    location: "Turkey"
  },
  {
    id: 7,
    name: "Eti Çikolatalı Browni",
    brand: "Eti",
    desc: "Rich chocolate brownie",
    price: 16.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744758011/eti-browni-chocolate-cake-with-chocolate-cake_964_psb_q2tbsj.png",
    category: "Chocolate",
    location: "Turkey"
  },
  {
    id: 8,
    name: "Milka Oreo",
    brand: "Milka",
    desc: "Milk chocolate with Oreo pieces",
    price: 19.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744802177/lolli-and-pops-international-milka-oreo-chocolate-bar-29733539545288_ftzrkz.png",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 9,
    name: "Milka Bitter",
    brand: "Milka",
    desc: "Dark chocolate bar",
    price: 18.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744802264/lolli-and-pops-international-milka-bittersweet-dark-chocolate-bar-30045597237448_hkjz0i.png",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 10,
    name: "Nestle KitKat",
    brand: "Nestle",
    desc: "Crispy wafer fingers covered in milk chocolate",
    price: 15.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744758287/92532_XXX_v1_xddkdt.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 11,
    name: "Nestle Crunch",
    brand: "Nestle",
    desc: "Milk chocolate with crispy rice",
    price: 13.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744758340/ItemImage-970433-2469312_1200x1200_ayhd4w.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 12,
    name: "Toblerone",
    brand: "Mondelez",
    desc: "Swiss milk chocolate with honey and almond nougat",
    price: 24.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744758683/1200px-Toblerone_3362_lyldp3.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 13,
    name: "Ferrero Rocher",
    brand: "Ferrero",
    desc: "Hazelnut chocolates in a golden wrapper",
    price: 29.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744758855/81RB-9E6YDL_zuknpj.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 14,
    name: "Eti Pop Kek",
    brand: "Eti",
    desc: "Moist chocolate cake with chocolate chips",
    price: 18.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744759038/d5f59f7d-a6d0-4064-b01c-8b075290d42d-1000x1000-MjI5bQjkx6WFXLPdDr8AfPr5A4qMxj3Xko1sTUhc_ymtmes.jpg",
    category: "Chocolate",
    location: "Turkey"
  },
  {
    id: 15,
    name: "Eti Çikolata Gold",
    brand: "Eti",
    desc: "White chocolate",
    price: 8.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744760567/1500x1500_thumb_st004592_x3b5dw.jpg",
    category: "Chocolate",
    location: "Turkey"
  },
  {
    id: 16,
    name: "Lindt Excellence 70%",
    brand: "Lindt",
    desc: "Premium dark chocolate with 70% cocoa",
    price: 24.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744759276/Blank-Variation-01-Square-1_1-9_aa8gye.png",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 17,
    name: "Lindt Lindor",
    brand: "Lindt",
    desc: "Smooth melting milk chocolate truffles",
    price: 29.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744759545/81GbhPljAqL_gesgqg.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 18,
    name: "Godiva Dark Çikolata",
    brand: "Godiva",
    desc: "Luxury Belgian dark chocolate",
    price: 34.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744759579/72-dark-chocolate-tablet-90g-godiva-chocolates-uk-417629_1000x_ualegp.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 19,
    name: "Godiva Milk Çikolata",
    brand: "Godiva",
    desc: "Premium Belgian milk chocolate",
    price: 32.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744759625/1CH1170-1_i46ejy.png",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 20,
    name: "Hershey's Kisses",
    brand: "Hershey's",
    desc: "Classic milk chocolate kisses",
    price: 19.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744759664/0_34000_12488_6_701_12488_002_Item_Front_mdlclk.webp",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 21,
    name: "Hershey's Cookies 'n' Creme",
    brand: "Hershey's",
    desc: "White chocolate with cookie pieces",
    price: 17.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744759695/034000002399_3_xvqt3h.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 22,
    name: "Cadbury Dairy Milk",
    brand: "Cadbury",
    desc: "Creamy British milk chocolate",
    price: 16.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744802233/c9ae962c-54e7-443e-817e-713f029bc093.a628a63fa7937dfd003d96d170c34130_xwlppp.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 23,
    name: "Cadbury Crunchie",
    brand: "Cadbury",
    desc: "Milk chocolate with honeycomb center",
    price: 15.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744759769/Candyfunhouse_cadbury_crunchie_44g-Side-jpg-1_qdzv0w.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 24,
    name: "Eti Antep Fıstıklı Çikolata",
    brand: "Eti",
    desc: "Chocolate with pistachio",
    price: 14.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744759893/eti-square-chocolate-with-pistachio-865988_dn37yk.jpg",
    category: "Chocolate",
    location: "Turkey"
  },
  {
    id: 25,
    name: "Eti Sütlü Çikolata",
    brand: "Eti",
    desc: "Rich chocolate flavored milk",
    price: 9.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744759893/eti-square-chocolate-with-pistachio-865988_dn37yk.jpg",
    category: "Chocolate",
    location: "Turkey"
  },
  {
    id: 26,
    name: "Ritter Sport Marzipan",
    brand: "Ritter Sport",
    desc: "German chocolate with marzipan filling",
    price: 19.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744759926/Candyfunhouse_ritter_marzipan_100g-Side-jpg-1_jwibm7.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 27,
    name: "Ritter Sport Hazelnut",
    brand: "Ritter Sport",
    desc: "German chocolate with whole hazelnuts",
    price: 18.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744759961/61jOZ2UrVGL_z87gra.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 28,
    name: "Ghirardelli Intense Dark",
    brand: "Ghirardelli",
    desc: "Premium American dark chocolate",
    price: 22.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744785888/GCC_Intense_Dark_Chocolate_flavors_72_lmctwe.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 29,
    name: "Ghirardelli Sea Salt",
    brand: "Ghirardelli",
    desc: "Dark chocolate with sea salt caramel",
    price: 21.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744785941/51ID1UnIUSL_mks9bz.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 30,
    name: "Valrhona Guanaja",
    brand: "Valrhona",
    desc: "French 70% dark chocolate",
    price: 27.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786061/valrhona-guanaja-70-prozent-dunkle-schokolade-chocolats-de-luxe-de-37-6679_1280x1280_u9mdc2.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 31,
    name: "Valrhona Jivara",
    brand: "Valrhona",
    desc: "French 40% milk chocolate",
    price: 25.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786105/47c0a8932acaf238_jnnvuq.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 32,
    name: "Guylian Seashells",
    brand: "Guylian",
    desc: "Belgian seashell shaped pralines",
    price: 29.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786140/GUYLIAN-Productshots-2-LOWRES-CROPPED_ohf4pu.webp",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 33,
    name: "Guylian Truffles",
    brand: "Guylian",
    desc: "Belgian hazelnut praline truffles",
    price: 31.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786180/productimg_yxa3mc.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 34,
    name: "Patchi Dark Çikolata",
    brand: "Patchi",
    desc: "Lebanese premium dark chocolate",
    price: 33.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786216/673b3ede6cb67_dn8yyl.webp",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 35,
    name: "Patchi Milk Çikolata",
    brand: "Patchi",
    desc: "Lebanese premium milk chocolate",
    price: 32.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786250/673b096b61410_hrcnes.webp",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 36,
    name: "Royce' Nama Çikolata",
    brand: "Royce'",
    desc: "Japanese fresh cream chocolate",
    price: 34.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786297/RYC005_hckxp5.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 37,
    name: "Royce' Çikolata Bar",
    brand: "Royce'",
    desc: "Japanese milk chocolate bar",
    price: 28.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786329/WebsiteTemplateproductpage-BarWhitebox_46e84892-4cb8-4a8e-a207-02b329f55f32-Updated_ukinox.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 38,
    name: "Tony's Chocolonely Milk",
    brand: "Tony's",
    desc: "Dutch fair trade milk chocolate",
    price: 23.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786376/442491-tonys-chocolonely-milk-chocolate-update-1_zbdhmj.webp",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 39,
    name: "Tony's Dark Almond",
    brand: "Tony's",
    desc: "Dutch fair trade dark chocolate with almonds",
    price: 24.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786470/Tonys-Dark-Almond-Salt-Bar_kuiwwa.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 40,
    name: "Milka Alpine Milk",
    brand: "Milka",
    desc: "German Alpine milk chocolate",
    price: 16.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786644/milka_alpine_milk_b183ce4b-8143-4c7a-9c06-aa731ba76205_ncxvtn.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 41,
    name: "Milka Daim",
    brand: "Milka",
    desc: "German milk chocolate with crunchy caramel",
    price: 17.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786776/51e_5WER4LL_tql5ru.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 42,
    name: "Cadbury Flake",
    brand: "Cadbury",
    desc: "British crumbly milk chocolate",
    price: 15.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786842/Candyfunhouse_cadbury_flake_32g-Side-jpg-1_szgiyk.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 43,
    name: "Cadbury Twirl",
    brand: "Cadbury",
    desc: "British milk chocolate with flaky layers",
    price: 16.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786885/cadbury-twirl-chocolate-bar-24ct-british-candy-i-wholesale-candy-canada_500x_png_tv1uxr.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 44,
    name: "Hershey's Special Dark",
    brand: "Hershey's",
    desc: "American dark chocolate bar",
    price: 18.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786940/034000002450_3_blmsx7.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 45,
    name: "Hershey's Almond",
    brand: "Hershey's",
    desc: "American milk chocolate with almonds",
    price: 19.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744786999/00056600000308-hersheys-with-almonds-43g-front_ewajp9.jpg",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 46,
    name: "Lindt Swiss Classic",
    brand: "Lindt",
    desc: "Swiss milk chocolate bar",
    price: 22.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744787045/66209996d33cf86c5e4e04c8135a9560e8a1869d95203cdf55567a2167549186_gwacrz.png",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 47,
    name: "Lindt White Çikolata",
    brand: "Lindt",
    desc: "Swiss white chocolate bar",
    price: 21.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744787066/061dcb7b57543a254249b29b274f42c02e51402afd8a76621753aa260fd21509_lrwnvp.png",
    category: "Chocolate",
    location: "International"
  },
  {
    id: 48,
    name: "Godiva White Çikolata",
    brand: "Godiva",
    desc: "Belgian white chocolate bar",
    price: 31.99,
    image: "https://res.cloudinary.com/dz6ksxjt2/image/upload/v1744787098/41ECr_q719L._AC_UF894_1000_QL80__dnkcuv.jpg",
    category: "Chocolate",
    location: "International"
  }
];

module.exports = products;
