import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forumPost, User } from '../app';
import { ForumService } from '../forum.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  usuario: User = {
    id: 0,
    name: '',
    address: '',
    phone: ''
  };
  usuarios: User[] = [];

  isReadonly: boolean = true;

  usuarioService = inject(UsuarioService);


  userForm = new FormGroup({
    identificador: new FormControl('', []),
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    this.userForm.controls.identificador.disable();
    this.usuarioService.getAllUsers().subscribe(data => {
      this.usuarios = data;
    }
    );
  }

  userSubmit(): void {
    if (this.userForm.valid) {
      this.usuario.name = this.userForm.value.nombre!;
      this.usuario.address = this.userForm.value.direccion!;
      this.usuario.phone = this.userForm.value.telefono!;


      console.log('usuarioid 2:', this.userForm.controls.identificador.getRawValue());
      console.log('usuarioid 2:', !this.userForm.controls.identificador.getRawValue());

      if (!this.userForm.controls.identificador.getRawValue()) {
        this.usuarioService.addUser(this.usuario).subscribe(
          newUser => {
            this.usuarios.unshift(newUser);
            this.userForm.reset();
          }
        );
      } else {
        this.usuario.id = Number(this.userForm.controls.identificador.getRawValue());
        this.usuarioService.updateUser(this.usuario).subscribe(
          updateUser => {

            this.usuarioService.getAllUsers().subscribe(data => {
              this.usuarios = data;
            }
            );
            this.userForm.reset();
          }
        );

      }
    }
  }

  updateUser(usuarioUpdate: User): void {
    this.userForm.setValue({
      identificador: usuarioUpdate.id.toString(),
      nombre: usuarioUpdate.name,
      direccion: usuarioUpdate.address,
      telefono: usuarioUpdate.phone
    });

  }

  deleteUser(usuarioDelete: User): void {
    if (confirm("Are you sure to delete " + usuarioDelete.name)){
      this.usuarioService.deleteUser(usuarioDelete.id).subscribe(data => {
        this.usuarioService.getAllUsers().subscribe(data => {
          this.usuarios = data;
        });
      });
    } else {
      console.log('Usuario no booradp');
    }
  }

}
