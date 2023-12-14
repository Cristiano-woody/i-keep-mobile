import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {map, Observable, of, switchMap, tap} from "rxjs";
import {IAppState, deleteNoteAction, loadNotesAction, setNotesAction, successSetNotesAction, updateNoteAction,} from "./app.state";
import {NoteService} from "../services/note/note.service";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class AppEffectsService {

  constructor(
    private actions$: Actions,
    private noteService: NoteService,
    private store: Store<{ app: IAppState }>
  ) {
  }

  public loadNoteEffect = createEffect(() => this.actions$.pipe(
      ofType(loadNotesAction),
      switchMap(() =>
        this.noteService.findAll()
      ),
      tap((notes) =>
        this.store.dispatch(setNotesAction({ notes: notes }))
      ),
      map( () => successSetNotesAction())
    ))

    public deleteNoteEffect = createEffect(() => this.actions$.pipe(
      ofType(deleteNoteAction),
      switchMap(({noteId}) => 
        this.noteService.delete(noteId)
      ),
      map(() => successSetNotesAction())
    ));

    public updateNoteEffect = createEffect(() => this.actions$.pipe(
      ofType(updateNoteAction),
      switchMap(({noteId, title, description}) => 
        this.noteService.update({noteId, title, description})
      ),
      map(() => successSetNotesAction())
    ));
}
