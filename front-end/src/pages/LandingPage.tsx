import { useEffect, useState } from "react";
import { getProducts } from "../apis/Product";
import ProductGrid from "../components/ProductGrid";
import ImageGallery from "../components/ImageGallery";
import { ImageGalleryProps, product } from "../types/types";
import { useSetRecoilState } from "recoil";
import { Products } from "../atoms/product";
import "../styles/LandingPage.css";
import LandingContent from "../components/LandingContent";
import { getBestSelling } from "../apis/BestSelling";
import InfoBar from "../components/InfoBar";
import '../styles/LandingPage.css'
import {LoginButton, LogoutButton} from "../components/Login";
import Profile from "../components/UserInfo";

function LandingPage() {
  // const products: product[] = [
  //   {
  //     product_id: 1,
  //     name: "Classic Pearl Milk Tea",
  //     image:
  //       "https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646826556470-353X8TY9JSOF2J9CVMEE/1.+MilkTea_ClassicPearl_Black.jpg",
  //     description: "Delicious and classic milk tea with pearls.",
  //     price: 4.99,
  //   },
  //   {
  //     product_id: 2,
  //     name: "Mango Green Milk Tea",
  //     image:
  //       "https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646826556844-7DWVLZUS8RYY4TOG4EGF/2.+MilkTea_MangoGreen.jpg",
  //     description: "Refreshing mango flavor with green milk tea.",
  //     price: 5.49,
  //   },
  //   {
  //     product_id: 3,
  //     name: "QQ Happy Family Milk Tea",
  //     image:
  //       "https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646826557156-6JEP6HB9W1AAMZHDCO8J/3.+MilkTea_QQHappyFamily.jpg",
  //     description: "A delightful blend of multiple toppings for a fun drink.",
  //     price: 5.99,
  //   },
  //   {
  //     product_id: 4,
  //     name: "Thai Pearl Milk Tea",
  //     image:
  //       "https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646826557548-F11NKGMMU53UKSDUYA6V/4.+MilkTea_ThaiPearl.jpg",
  //     description: "A taste of Thailand with our unique Thai pearl milk tea.",
  //     price: 5.29,
  //   },
  //   {
  //     product_id: 5,
  //     name: "Honey Milk Tea (Green)",
  //     image:
  //       "https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646826557778-94IYMHNPDHE4DWLCJJ3M/5.+ZMilkTea_HoneyMilkTea_Green.jpg",
  //     description: "Sweet and soothing honey milk tea with a green tea base.",
  //     price: 4.79,
  //   },
  //   {
  //     product_id: 6,
  //     name: "Matcha Red Bean Milk Tea",
  //     image:
  //       "https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1646826558246-CV3451A16SRHYMV4JNUZ/6.+MilkTea_MatchaRedBean.jpg",
  //     description: "A delightful blend of rich matcha and sweet red beans.",
  //     price: 5.89,
  //   },
  // ];
  const customStyle = {
    backgroundImage:
      "linear-gradient(rgba(50, 50, 50, 0.25), rgba(50, 50, 50, 0.25))",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const landingPageImages: ImageGalleryProps = {
    images: [
      "https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1697443158374-PEJA4EET4VF8JGAS35HL/230914_Q4PopcornCreamaSeries_web.jpg",
      "https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1697512684209-7BC17NZXSD4B5QMZHIPO/230811_EarlGreyTeaSeries_web.jpg?format=2500w",
    ],
    style: customStyle,
  };

  const [bestSelling, setBestSelling] = useState<product[]>([]);
  const [filteredBestSelling, setFilteredBestSelling] = useState<product[]>(
    []
  ); /**These states are probably used for atoms, but I will look into getting rid of them */
  getBestSelling(setBestSelling, setFilteredBestSelling);
  return (
    <main>
      {/* <div className="container text-center"> */}
      {/* <div className="row">
    <div className="col">
      
    </div>
  </div>
  <div className="row">
    <div className="col"> */}
      <div className="image-gallery-container">
        <ImageGallery images={landingPageImages.images} />
        {/* <h1 className="fw-light">ShareTea</h1> */}
        {/* <p className="example-text">Your text goes here</p> */}
        {/* <div className="image-text col-md-6 text-center font-size-lg">
          Sharetea serves delicious bubble tea globally. Established in 1992 in
          Taiwan, we strive to create high quality tea drinks with our fresh
          ingredients and bring the best to you!
        </div>
        <a href="#" className="btn btn-primary my-2 image-gallery-button">
          Order Now
        </a> */}
      </div>
      <h1 className="text-center">Trending Products</h1>
      <ProductGrid products={bestSelling} />
      <InfoBar />

<<<<<<< HEAD
      <InfoBar />
      {/* <LandingContent /> */}
=======

      {/* <div>
      <ImageGallery images={landingPageImages.images}/> 
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">ShareTea</h1>
              <p className="lead text-body-secondary position-absolute text-center">
                Sharetea serves delicious bubble tea globally. Established in
                1992 in Taiwan, we strive to create high quality tea drinks with
                our fresh ingredients and bring the best to you!
              </p>
              <p>
                <a href="#" className="btn btn-primary my-2">
                  Order Now
                </a>
              </p>
            </div>
          </div>
        </section>
      </div> */}
      <h1></h1>
>>>>>>> edgar
    </main>
  );
}

export default LandingPage;
