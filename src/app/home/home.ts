import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forumPost } from '../app';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  profileForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, ]),
    comentario: new FormControl('', [Validators.required]),
  });

  handleSubmit() {
    if (this.profileForm.valid) {
      alert(this.profileForm.value['titulo']!);
    }
  }

  forum:forumPost = {
    userId:0,
    id:0,
    title:'',
    body:''
  };
  forums:forumPost[] = [];



}
