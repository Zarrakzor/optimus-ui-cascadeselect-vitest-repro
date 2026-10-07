import { Component } from '@angular/core';
import { CascadeDemo } from './cascade-demo/cascade-demo';

@Component({
  selector: 'app-root',
  imports: [CascadeDemo],
  template: `
    <h1>Hello, cascade-test</h1>
    <app-cascade-demo />
  `,
})
export class App {}
