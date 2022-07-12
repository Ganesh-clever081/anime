import './App.css';
import Anime from './Containers/Anime';
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"

function App() {
  return (
   <DndProvider backend={HTML5Backend}>
   <Anime />
   </DndProvider>
  );
}

export default App;
