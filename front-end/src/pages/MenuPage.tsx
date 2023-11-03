import MenuContent from "../components/MenuContent";
import MenuNav from "../components/MenuNav";
import MenuSidebar from "../components/MenuSidebar";
import ProductGrid from "../components/ProductGrid";

function MenuPage() {
  return (
    <div className="col">
      <MenuNav />
      <div className="row">
        <div className="col-md-2">
          <MenuSidebar />
        </div>
        <div className="col">
          <MenuContent />
        </div>  
      </div>
    </div>
  );
}

export default MenuPage;
