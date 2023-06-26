import {Injectable} from '@angular/core';
import {Hero} from "./hero";
import {HEROES} from "./mock-heroes";
import {Observable, of} from "rxjs";
import {MessageService} from "../message/message.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) {
  }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  searchHero(term: string): Observable<Hero[]> {
    const hero = HEROES.filter(h => h.name.toLowerCase().includes(term))!;
    if(hero.length > 0) {
      this.messageService.add(`HeroService: fetched hero name=${term}`);
    } else {
      this.messageService.add(`HeroService: no hero name=${term}`);
    }
    return of(hero);
  }

  addHero(name: string): Observable<Hero> {
    const hero = {id: HEROES.length ? HEROES[HEROES.length - 1].id + 1 : 1, name: name};
    HEROES.push(hero);
    this.messageService.add(`HeroService: add hero name=${name}`);
    return of(hero);
  }

  updateHero(hero: Hero): Observable<any> {
    const index = HEROES.findIndex(h => h.id === hero.id);
    HEROES[index] = hero;
    this.messageService.add(`HeroService: update hero id=${hero.id}`);
    return of(null);
  }

  deleteHero(hero: Hero): Observable<any> {
    const index = HEROES.findIndex(h => h.id === hero.id);
    HEROES.splice(index, 1);
    this.messageService.add(`HeroService: delete hero id=${hero.id}`);
    return of(null);
  }
}
