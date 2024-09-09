import { useEffect, useState } from 'react';
import { Entry, readEntries } from './data.ts';
import { Link, useNavigate } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';

export function ViewEntries() {
  const [entries, setEntries] = useState<Entry[]>();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchEntries() {
      try {
        const fetchedEntries = await readEntries();
        setEntries(fetchedEntries);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEntries();
  }, []);

  function handleOnClick(id: number) {
    navigate(`/entries/${id}`);
  }

  return (
    <div className="container" data-view="entries">
      <div className="row">
        <div className="column-full d-flex justify-between align-center">
          <h1>Entries</h1>
          <h3>
            <Link id="formLink" className="white-text form-link" to={'/'}>
              NEW
            </Link>
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="column-full">
          <ul className="entry-ul" id="entryUl"></ul>
          {entries &&
            entries.map((entry: Entry) => {
              return (
                <li key={entry.entryId}>
                  <div>
                    <img src={entry.photoUrl} />
                  </div>
                  <div className="split-row">
                    <h1>{entry.title}</h1>
                    <FaPencilAlt onClick={() => handleOnClick(entry.entryId)} />
                  </div>
                  <p>{entry.notes}</p>
                </li>
              );
            })}
        </div>
      </div>
    </div>
  );
}
