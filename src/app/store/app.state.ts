import { createAction, createReducer, on, props } from '@ngrx/store';
import { note } from '../entities/note';

export interface IAppState {
  notes: note[]
}

export const appInitialState: IAppState = {
  notes: [],
};


export const loadNotesAction = createAction("[App] load notes")
export const setNotesAction = createAction("[App] set notes", props<{notes: note[]}>())
export const successSetNotesAction = createAction("[App] [notes] success set notes")
export const deleteNoteAction = createAction("[APP] delete note", props<{noteId: string}>())
export const updateNoteAction = createAction("[APP] update note", props<{noteId: string, title: string, description: string}>())
export const saveNoteAction = createAction("[APP] save note", props<{ id: string, title: string, description: string}>())

export const appReducer = createReducer(
  appInitialState,
  on(setNotesAction, (state, { notes }) => ({ ...state, notes: notes})),
  on(deleteNoteAction, (state, { noteId }) => ({ ...state, notes: state.notes.filter(note => note.id !== noteId)})),
  on(updateNoteAction, (state, { noteId, title, description }) => ({
    ...state,
    notes: state.notes.map(note => {
      if (note.id === noteId) {
        return { ...note, title, description };
      }
      return note;
    }),
  })),
  on(saveNoteAction, (state, { title, description, id }) => ({
    ...state,
    notes: [...state.notes, { id, title, description }]
  })),
);
