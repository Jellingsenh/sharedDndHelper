import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

// page imports here
import GameModeMenu from './pages/GameModeMenu';
import SinglePlayerMenu from './pages/SinglePlayerMenu';
import MultiPlayerMenu from './pages/MultiPlayerMenu';
import GamePlayMenu from './pages/GamePlayMenu';
import DungeonMasterOptions from './pages/DungeonMasterOptions';

import PaperBackground from './resources/images/parchedpaper.jpg';
/* Have to finish router links almost there to be able to build the skeleton menus... */
function App() {
  return (
    <Router>
      <div align="center"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: "100vh",
          backgroundImage: `url(${PaperBackground})`
        }}
      >
        <Routes>
          <Route exact path="/" element={<GameModeMenu />}></Route>
          <Route exact path="/SinglePlayerMenu" element={<SinglePlayerMenu />}></Route>
          <Route exact path="/MultiPlayerMenu" element={<MultiPlayerMenu />}></Route>
          <Route exact path="/GamePlayMenu" element={<GamePlayMenu />}></Route>
          <Route exact path="/DungeonMasterOptions" element={<DungeonMasterOptions />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
