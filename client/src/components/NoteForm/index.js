import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_NOTE } from "../../utils/mutations";
import { QUERY_ME, QUERY_SINGLE_GROUP, QUERY_NOTE } from "../../utils/queries";

const NoteForm = (props) => {
  // console.log("groupID props", props);
  const [formState, setFormState] = useState({
    noteText: "",
    category: "",
  });

  const [characterCount, setCharacterCount] = useState(0);

  const [addNote, { error }] = useMutation(ADD_NOTE, {
    update(cache, { data: { addNote } }) {
      try {
        const {group} = cache.readQuery({ query: QUERY_NOTE, variables: { id: props.groupId } });
        cache.writeQuery({
          query: QUERY_NOTE,
          data: { group, notes: [...group.notes, addNote] },
          variables: { id: props.groupId },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache{}
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, notes: [...me.notes, addNotes] } },
      // });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
      // console.log('formState:', formState);
      
    try {
      const { data } = await addNote({
        variables: { groupId: props.groupId, noteAuthor: props.username, ...formState },
      });
    //  window.location.reload();
    setFormState({
      noteText: "",
      category: "",
    })
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
 setFormState({ ...formState, [name]: value });
  
  };

  return (
    <div className="noteform p-4 my-0">
      {/* <h3>Add a Note</h3>

      <p
        className={`m-0 ${
          characterCount === 280 || error ? "text-danger" : ""
        }`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p> */}
      <form onSubmit={handleFormSubmit}>
        <div className="my-2">
          <select

            className="form-select"
            name="category"
            value={formState.category}
            onChange={handleChange}
          >
            <option value="other">Choose a category</option>
            <option value="narrative">Narrative</option>
            <option value="gameplay">Gameplay</option>
            <option value="characters">Characters</option>
            <option value="art">Art</option>
            <option value="music">Music</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="my-2">
          <textarea
            name="noteText"
            placeholder="Write a note..."
            value={formState.noteText}

            className="w-100 form-control"
            onChange={handleChange}

          ></textarea>
        </div>


          <button className="button bg-primary text-dark" type="submit">
            Post Note
          </button>

        {error && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            Something went wrong...
          </div>
        )}
      </form>
    </div>
  );
};

export default NoteForm;
