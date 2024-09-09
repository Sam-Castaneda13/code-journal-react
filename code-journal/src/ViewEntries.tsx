import { useEffect, useState } from 'react';
import { Entry, readEntries } from './data.ts';

export function ViewEntries() {
  const [entries, setEntries] = useState<Entry[]>();
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

  return (
    <div className="container" data-view="entries">
      <div className="row">
        <div className="column-full d-flex justify-between align-center">
          <h1>Entries</h1>
          <h3>
            <a id="formLink" className="white-text form-link" href="#">
              NEW
            </a>
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="column-full">
          <ul className="entry-ul" id="entryUl"></ul>
          {entries &&
            entries.map((entry: Entry) => {
              return (
                <li>
                  <div>
                    <img src={entry.photoUrl} />
                  </div>
                  <h1>{entry.title}</h1>
                  <p>{entry.notes}</p>
                </li>
              );
            })}
        </div>
      </div>
    </div>
  );
}
