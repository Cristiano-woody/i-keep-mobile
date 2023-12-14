import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { note } from 'src/app/entities/note';
import { NoteService } from 'src/app/services/note/note.service';
import {IAppState, deleteNoteAction, loadNotesAction, saveNoteAction, updateNoteAction} from 'src/app/store/app.state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  notes$ = this.store.select('app').pipe(
    map(e => e.notes)
  )

  popUpCreateNoteIsOpen = false

  constructor(private store: Store<{app: IAppState}>, private noteService: NoteService) {}

  updateNote({noteId, description, title}:{noteId: string, description: string, title: string}) {
    this.store.dispatch(updateNoteAction({noteId: noteId, description: description, title: title}))
  }

  ngOnInit() {
    this.store.dispatch(loadNotesAction())
  }

  deleteNote(noteId: string) {
    this.store.dispatch(deleteNoteAction({noteId:noteId}))
  }

  togglePopUpCreateNote() {
    this.popUpCreateNoteIsOpen = !this.popUpCreateNoteIsOpen
  }

  saveNote(data: {title: string, description: string}) {
    this.noteService.save(data).subscribe((newNote: note) => {
      this.store.dispatch(saveNoteAction(newNote))
      this.togglePopUpCreateNote()
    }, (err) => {
      console.log(err)
    })
  }

  logOut() {
    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('userId')
    window.location.reload()
  }
}
