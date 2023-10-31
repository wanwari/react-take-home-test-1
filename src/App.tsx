import { ReactElement } from "react";
import { ContactsView } from "./views/ContactsView/ContactsView";

const App = (): ReactElement => (
  <div className="App container">
    <h1 className="text-center">Brew Ninja Test App</h1>
    <ContactsView />
  </div>
);

export default App;
