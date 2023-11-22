@Component({
  selector: 'app-users',
  template: `
    <div *ngFor="let user of users; trackBy: trackUser">
        {{ user.name | capitalizeFirstWord }}
    </div>
  `
})
export class AppUsers {

  @Input()
  users: { name: string; }[];

  constructor() {}

  // trackBy function for *ngFor directive
  trackUser(index: number, user: { name: string, id: number }): string | undefined {
    // Returns a composite unique identifier for each user, combining the user's ID and name
    // This helps Angular to optimize rendering when the list changes
    return user ? `${user.id}-${user.name}` : undefined;
  }
}

// capitalize-first.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

// Define a pipe for capitalizing the first letter of each word
@Pipe({ name: 'capitalizeFirstWord' })
export class CapitalizeFirstWordPipe implements PipeTransform {
  transform(name: string): string {
    return name.split(' ').map(n => n.substring(0, 1).toUpperCase() + n.substring(1).toLowerCase()).join(' ');
  }
}

