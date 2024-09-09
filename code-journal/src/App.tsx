import { Data, writeData, data } from './data';
import { Route, Routes } from 'react-router-dom';
import '/css/layout.css';
import '/css/reset.css';
import '/css/styles.css';
import { Header } from './Header';
import { FormElement } from './FormElement';
import { ViewEntries } from './ViewEntries';
import { FormEvent, useState } from 'react';

interface Entry {
  entryId: number;
  title: string;
  photoUrl: string;
  notes: string;
}

export default function App() {
  const [entry, setEntry] = useState();

  const something = 1;
  function handleEntrySubmission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const { formTitle, formURL, formNotes } = Object.fromEntries(d);
    data.entries.push({
      entryId: something,
      title: formTitle,
      photoURL: formURL,
      notes: formNotes,
    });
    writeData();
    console.log(formTitle, formURL, formNotes);
  }
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route
          path="new"
          element={
            <FormElement
              imgSrc="/placeholder-image-square.jpg"
              onEntrySubmission={handleEntrySubmission}
            />
          }></Route>
        <Route path="view" element={<ViewEntries />}></Route>
      </Route>
    </Routes>
  );
}
