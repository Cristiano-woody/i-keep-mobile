import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-note-popup',
  templateUrl: './note-popup.component.html',
  styleUrls: ['./note-popup.component.scss'],
})
export class NotePopupComponent  implements OnInit {

  popUpForm!: FormGroup
  
  @Input()
  contentTextArea = ""
  @Input()
  contentTitleInput = ""
  @Input()
  buttonExcluirIsVIsible = true

  @Output() updateNoteOut = new EventEmitter<{title: string, description: string}>();
  @Output() deleteNoteOut = new EventEmitter<null>();
  @Output() closePopupOut = new EventEmitter<null>();


  ngOnInit(): void {
    this.popUpForm = new FormGroup({
      title: new FormControl(this.contentTitleInput),
      description: new FormControl(this.contentTextArea),
    })
  }

  update(): void {
    this.updateNoteOut.emit(this.popUpForm.value);
  }

  delete(): void {
    this.deleteNoteOut.emit(null);
  }

  close(): void {
    this.closePopupOut.emit(null);
  }
}
