import "./App.css";
import 'rc-slider/assets/index.css';
// import "./assets/css/plugins/animate.css"
// import "./assets/css/plugins/swiper-bundle.min.css"
import "./assets/css/plugins/jquery-ui.min.css";
import "./assets/css/plugins/countdownTimer.css";
import "./assets/css/plugins/slick.min.css";
import "./assets/css/plugins/bootstrap.css";
import "./assets/css/plugins/nouislider.css";
import "./assets/css/backgrounds/bg-4.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "./assets/css/vendor/ecicons.min.css";
import "./NewStyle.css";

import ShopFullWidthCol6 from "./Pages/Shop/ShopFullWidthCol6";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./Pages/Cart/Cart";
import ProtectedRoutes from "./ProtectedRoutes";
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<Navigate to="/matrix-page?catalogue_id=31&user_id=1182&company_code=TElWRURFTU8=" />} />
          <Route path="/matrix-page" element={<ProtectedRoutes Component={ShopFullWidthCol6} />} />
          <Route path="/cart" Component={Cart} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
