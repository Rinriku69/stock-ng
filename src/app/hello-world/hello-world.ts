import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: 'app-hello-world',
  // standalone: true,
  imports: [],
  templateUrl: './hello-world.html',
  styleUrl: './hello-world.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelloWorld {

 
}
