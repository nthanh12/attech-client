import ProductList from "../components/Product/ProductList";
import SidebarProduct from "../components/Product/SidebarProduct";

const Product = () => {
  return (
    <>
      <div>
        <SidebarProduct />
        <ProductList />
      </div>
    </>
  );
};

export default Product;
