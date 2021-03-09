import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @ViewChild("inputFisico") txtInputFisico: ElementRef;

  @Input() todo: Todo;

  chkCompletado: FormControl;
  txtInput: FormControl;

  editando: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.todo.completado = true;
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl("", Validators.required);
    this.chkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch( actions.toggle({id: this.todo.id}) );
      
    })
  }

  editar() {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(()=>{
      this.txtInputFisico.nativeElement.select();
    },1)
  }

  terminarEdicion() {
    this.editando = false;
    if (this.txtInput.invalid || this.txtInput.value === this.todo.texto) return;
    this.store.dispatch( actions.editar ({id: this.todo.id, texto: this.txtInput.value}))
  }

  borrar(){
    this.store.dispatch(actions.borrar({ id: this.todo.id}) )
  }

}
