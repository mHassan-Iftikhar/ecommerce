import { RootLayout } from "../../layouts";
import { 
  Banner, 
  BrandSupport, 
  ProductsSection, 
  CategoriesSection, 
  ServiceFeatures 
} from "./components";

const HomeScreen = () => {
  return (
    <RootLayout>
      <Banner />
      <BrandSupport />
      <ProductsSection />
      <CategoriesSection />
      <ServiceFeatures title="Our Services" />
    </RootLayout>
  );
};

export default HomeScreen;