import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  addEntry,
  Entry,
  readEntry,
  removeEntry,
  updateEntry,
} from './data.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
const imgSrc = '/placeholder-image-square.jpg';

export function FormElement() {
  const [newTitle, setNewTitle] = useState<string>();
  const [newImg, setNewImg] = useState<string>();
  const [newNote, setNewNote] = useState<string>();
  const [entryEdit, setEntryEdit] = useState<Entry>();
  const [deleteConfirmDisplayed, setDeleteConfirmDisplayed] = useState(false);
  const { id } = useParams();
  const imgRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();
  function handleEntrySubmission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!entryEdit) {
      addEntry({
        title: newTitle ?? '',
        notes: newNote ?? '',
        photoUrl: newImg ?? '',
      });
    } else {
      updateEntry({
        title: newTitle ?? '',
        notes: newNote ?? '',
        photoUrl: newImg ?? '',
        entryId: entryEdit.entryId,
      });
    }
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
      setNewTitle(editEntry?.title);
      setNewImg(editEntry?.photoUrl);
      setNewNote(editEntry?.notes);
    };
    getEntry();
  }, [id]);

  return (
    <>
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
                  src={newImg || (entryEdit?.photoUrl ?? imgSrc)}
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
                  className={`${entryEdit || 'invisible'} delete-entry-button`}
                  type="button"
                  id="deleteEntry"
                  onClick={() => setDeleteConfirmDisplayed(true)}>
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
      {createPortal(
        <div
          id="modalContainer"
          className={`modal-container d-flex justify-center align-center ${
            deleteConfirmDisplayed || 'hidden'
          }`}>
          <div className="modal row">
            <div className="column-full d-flex justify-center">
              <p>Are you sure you want to delete this entry?</p>
            </div>
            <div className="column-full d-flex justify-between">
              <button
                className="modal-button"
                id="cancelButton"
                onClick={() => setDeleteConfirmDisplayed(false)}>
                Cancel
              </button>
              <button
                className="modal-button red-background white-text"
                id="confirmButton"
                onClick={() => {
                  if (entryEdit?.entryId) {
                    removeEntry(entryEdit.entryId);
                    navigate('/entries');
                  }
                }}>
                Confirm
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
