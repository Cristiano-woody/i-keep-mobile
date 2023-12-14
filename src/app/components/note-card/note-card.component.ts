import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent  implements OnInit {
  @Input()
  noteTitle: string = ''
  @Input()
  noteDescription: string = ''
  @Input()
  noteId: string = ''

  @Output() deleteNoteOut = new EventEmitter<string>();
  @Output() updateNoteOut = new EventEmitter<{noteId: string, title: string, description: string}>();

  popupIsOpen: boolean = false

  ngOnInit() {}

  togglePopup() {
    this.popupIsOpen = !this.popupIsOpen
  }

  deleteNote() {
    this.deleteNoteOut.emit(this.noteId);
    this.togglePopup()
  }

  updateNote({title, description}: {title: string, description:string}) {
    this.updateNoteOut.emit({noteId: this.noteId, description: description, title: title})
    this.togglePopup()
  }
}
