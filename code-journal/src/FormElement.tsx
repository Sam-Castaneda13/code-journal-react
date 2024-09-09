import { FormEvent, useEffect, useRef, useState } from 'react';

type Props = {
  imgSrc: string;
  onEntrySubmission: (e: FormEvent<HTMLFormElement>) => void;
};

export function FormElement({ imgSrc, onEntrySubmission }: Props) {
  const [newImg, setNewImg] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  function handleEntrySubmission(e: FormEvent<HTMLFormElement>) {
    onEntrySubmission(e);
    e.currentTarget.reset();
    setNewImg('');
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
                value={newImg}
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
