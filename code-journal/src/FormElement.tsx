import { FormEvent, useEffect, useRef, useState } from 'react';
import { addEntry, Entry, readEntry } from './data.ts';
import { useNavigate, useParams } from 'react-router-dom';
const imgSrc = '/placeholder-image-square.jpg';

export function FormElement() {
  const [newImg, setNewImg] = useState<string>();
  const [newTitle, setNewTitle] = useState<string>();
  const [newNote, setNewNote] = useState<string>();
  const [entryEdit, setEntryEdit] = useState<Entry>();
  const { id } = useParams();
  const imgRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();
  function handleEntrySubmission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const { formTitle, formURL, formNotes } = Object.fromEntries(d);
    const stringFormTitle = String(formTitle);
    const stringFormUrl = String(formURL);
    const stringFormNotes = String(formNotes);
    console.log(formTitle);
    addEntry({
      title: stringFormTitle,
      notes: stringFormNotes,
      photoUrl: stringFormUrl,
    });
    navigate('/entries');
  }
  useEffect(() => {
    const changeImage = async function (): Promise<void> {
      try {
        const fgh = await new Promise((resolve, reject) => {
          if (!(imgRef.current instanceof HTMLImageElement))
            throw new Error('imgRef not assigned to img');
          imgRef.current.onload = () => resolve('img url was valid');
          imgRef.current.onerror = () => reject(new Error('url not valid'));
        });
        console.log(fgh);
      } catch (error) {
        console.log('img not found!', error);
      }
    };
    changeImage();
  }, [newImg]);

  useEffect(() => {
    const getEntry = async function () {
      const editEntry = await readEntry(Number(id));
      setEntryEdit(editEntry);
    };
    getEntry();
  }, []);

  return (
    <main>
      <div className="container" data-view="entry-form">
        <div className="row">
          <div className="column-full d-flex justify-between">
            <h1 id="formH1">New Entry</h1>
          </div>
        </div>
        <form id="entryForm" onSubmit={handleEntrySubmission}>
          <div className="row margin-bottom-1">
            <div className="column-half">
              <img
                className="input-b-radius form-image"
                id="formImage"
                src={newImg || imgSrc}
                alt="image of entry image"
                ref={imgRef}
              />
            </div>
            <div className="column-half">
              <label className="margin-bottom-1 d-block" htmlFor="title">
                Title
              </label>
              <input
                required
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                type="text"
                id="formTitle"
                name="formTitle"
                value={newTitle || (entryEdit?.title ?? '')}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <label className="margin-bottom-1 d-block" htmlFor="photoUrk">
                Photo URL
              </label>
              <input
                required
                className="input-b-color text-padding input-b-radius purple-outline input-height margin-bottom-2 d-block width-100"
                type="text"
                id="formURL"
                name="formURL"
                value={newImg || (entryEdit?.photoUrl ?? '')}
                onChange={(e) => setNewImg(e.target.value)}
              />
            </div>
          </div>
          <div className="row margin-bottom-1">
            <div className="column-full">
              <label className="margin-bottom-1 d-block" htmlFor="formNotes">
                Notes
              </label>
              <textarea
                required
                className="input-b-color text-padding input-b-radius purple-outline d-block width-100"
                name="formNotes"
                id="formNotes"
                value={newNote || (entryEdit?.notes ?? '')}
                onChange={(e) => setNewNote(e.target.value)}
                cols={30}
                rows={10}></textarea>
            </div>
          </div>
          <div className="row">
            <div className="column-full d-flex justify-between">
              <button
                className="invisible delete-entry-button"
                type="button"
                id="deleteEntry">
                Delete Entry
              </button>
              <button className="input-b-radius text-padding purple-background white-text">
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
