import { useEffect, useState } from "react";
import { getProducts } from "../apis/Product";
import ProductGrid from "../components/ProductGrid";
import ImageGallery from "../components/ImageGallery";
import {
  ImageGalleryProps,
  listProductToppings,
  product,
} from "../types/types";
import { useSetRecoilState } from "recoil";
import { Products } from "../atoms/product";
import "../styles/LandingPage.css";
import LandingContent from "../components/LandingContent";
import { getBestSelling } from "../apis/BestSelling";
import InfoBar from "../components/InfoBar";
import { LoginButton, LogoutButton } from "../components/Login";
import Profile from "../components/UserInfo";
import { useAuth0 } from "@auth0/auth0-react";
import { cart } from "../atoms/cart";
import { get } from "http";

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
  //   }
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
      "https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1698811520185-NMO1ZQ8G9BY3G9RS0DQB/sharetea_webbanner_2.png?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1697443158374-PEJA4EET4VF8JGAS35HL/230914_Q4PopcornCreamaSeries_web.jpg",
      "https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/1697512684209-7BC17NZXSD4B5QMZHIPO/230811_EarlGreyTeaSeries_web.jpg?format=2500w",
    ],
    style: customStyle,
  };
  const [bestSelling, setBestSelling] = useState<listProductToppings>(
    {} as listProductToppings
  );
  const [filteredBestSelling, setFilteredBestSelling] =
    useState<listProductToppings>({} as listProductToppings);
  /**These states are probably used for atoms, but I will look into getting rid of them */
  useEffect(() => {
    getBestSelling(setBestSelling, setFilteredBestSelling);
  }, []);
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

      <h1 className="landingpage-text my-md-4 my-5">Trending Products</h1>
      <ProductGrid products={bestSelling.products} />
      <InfoBar
        header="Sharetea x Cookie Run Collaboration is Here!"
        information="Limited time only launching on 11/3/23, the collaboration will feature many sugary surprises for all the bubble tea lovers in 87 USA Sharetea locations as below.
        Visit our stores and explore our exciting collaboration with Cookie Run Kingdom! We have interactive design cups perfect for your bubble tea orders. 
        There will also be limited-edition pins and key chain featuring our beloved Cooke Run Kingdom characters - Ginger Brave, Pure Vanilla, Caramel Arrow, and Milky Way."
        imageUrl="https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/04150f08-7937-4478-b8b7-b77d4e2b48f6/Square_01.jpg?format=2500w"
      />
      <InfoBar
        header="Matcha Red Bean Milk Tea - Our Winter Favorite"
        information="The sweetness, nuttiness, and creaminess of this flavor, along with the option to serve it hot, perfectly match the desired winter tastes. Matcha red bean milk 
        tea will warm you up even in the most freezing weather, and its dense texture will delight you - as it did with many of our customers. It's a symbol of our taste preferences 
        during the colder seasons. To fully comprehend why we, and others like you, love it so much, you simply need to try it."
        imageUrl="https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/14140f00-6e01-47c8-b2c2-b05028b05fbe/image4.png?format=2500w"
      />

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
    </main>
  );
}

export default LandingPage;
