import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { User } from '../../interfaces/users';
import { UsersService } from '../../services/users.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-users-signal-page',
  templateUrl: './users-signal-page.component.html',
  styleUrls: ['./users-signal-page.component.css'],
})
export class UsersSignalPageComponent implements OnInit {
  public users = signal<User[]>([]);
  public totalUsers = computed(
    () => `Total de usuarios: ${this.users().length}`
  );
  public currentPage = signal<number>(1);

  private readonly userService = inject(UsersService);

  ngOnInit(): void {
    this.loadPage(this.currentPage());
  }

  loadPage(page: number): void {
    this.userService
      .loadPage(page)
      .pipe(filter((users) => users.length > 0))
      .subscribe((users) => {
        console.log({ users });
        this.currentPage.set(page);
        // this.users.set(users);
        this.users.update((curr) => [...curr, ...users]);
      });
  }
}
