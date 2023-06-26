import {Component, OnInit} from '@angular/core';
import {Hero} from "../../service/hero/hero";
import {HeroService} from "../../service/hero/hero.service";
import {debounce, debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  topHeroes?: Hero[];
  searchedHeroes?: Observable<Hero[]>;
  searchTerm = new Subject<string>();

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(
      heroes => {
        this.topHeroes = heroes.slice(0, 4);
      }
    )

    this.searchedHeroes = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (!term.trim()) {
          return of([]);
        } else {
          return this.heroService.searchHero(term);
        }
      }),
    );
  }

  search(term: string) {
    this.searchTerm.next(term);
  }
}
