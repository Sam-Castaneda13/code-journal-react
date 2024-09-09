import { Route, Routes } from 'react-router-dom';
import '../../../../css/layout.css';
import '../../../../css/reset.css';
import '../../../../css/styles.css';
import { Header } from './Header';
import { FormElement } from './FormElement';
import { ViewEntries } from './ViewEntries';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route
          path="new"
          element={
            <FormElement imgSrc="/placeholder-image-square.jpg" />
          }></Route>
        <Route path="view" element={<ViewEntries />}></Route>
      </Route>
    </Routes>
  );
}
