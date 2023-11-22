@Component({
  selector: 'app-users',
  template: `
    <input type="text" [(ngModel)]="query" (ngModelChange)="querySubject.next($event)">
    <div *ngFor="let user of users">
        {{ user.email }}
    </div>
  `
})
export class AppUsers implements OnInit {

  query = '';
  querySubject = new Subject<string>();

  users: { email: string; }[] = [];

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    concat(
      of(this.query), // Start with the current query value
      this.querySubject.asObservable() // Then listen for changes in query input
    ).pipe(
      concatMap(q => 
        timer(0, 60000).pipe( // Emit immediately, then every 60 seconds
          switchMap(() => this.userService.findUsers(q)) // Switch to the user search observable
        )
      )
    ).subscribe({
      next: (res) => this.users = res // Update users array with the response
    });
  }
}
