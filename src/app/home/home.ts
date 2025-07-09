import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forumPost } from '../app';
import { ForumService } from '../forum.service';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  forum: forumPost = {
    userId: 0,
    id: 0,
    title: '',
    body: ''
  };
  forums: forumPost[] = [];

  forumService = inject(ForumService);


  profileForm = new FormGroup({
    titulo: new FormControl('', [Validators.required,]),
    comentario: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.forumService.getForums().subscribe(data => {
      this.forums = data;
      console.log('Forums load:', data);
    });
  }


  handleSubmit() {
    if (this.profileForm.valid) {
      this.forum.id = 1;
      this.forum.body = this.profileForm.value['comentario']!;
      this.forum.title = this.profileForm.value['titulo']!;
      this.forum.userId = 1710;

      this.forumService.addForum(this.forum).subscribe(newForum => {
        this.forums.unshift(newForum);
        console.log('New forum added:', newForum);
      });
    }
  }









}
