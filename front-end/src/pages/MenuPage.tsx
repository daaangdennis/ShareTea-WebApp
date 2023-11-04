import MenuContent from "../components/MenuContent";
import MenuNav from "../components/MenuNav";
import MenuSidebar from "../components/MenuSidebar";
import ProductGrid from "../components/ProductGrid";

function MenuPage() {
  return (
    <div className="col">
      <MenuNav />
      <div className="row">
        <div className="col-lg-2 p-0">
          <MenuSidebar />
        </div>
        <div className="col p-0">
          <MenuContent />
        </div>  
      </div>
    </div>
  );
}

export default MenuPage;
