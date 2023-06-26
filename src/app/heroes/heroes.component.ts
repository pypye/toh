import {Component, OnInit} from '@angular/core';
import {Hero} from "../../service/hero/hero";
import {HeroService} from "../../service/hero/hero.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes?: Hero[];
  selectedHero?: Hero;

  constructor(private heroService: HeroService, private route: Router) {
  }

  ngOnInit(): void {
    this.getHeroes()
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    })
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  addHero(name: string) {
    this.heroService.addHero(name).subscribe(hero => {
      this.heroes?.push(hero);
    });
  }

  deleteHero(hero: Hero) {
    this.heroService.deleteHero(hero).subscribe(() => {
      this.heroes = this.heroes?.filter(h => h.id !== hero.id);
    });
  }

  viewDetail(hero: Hero) {
    this.route.navigate(['/detail', hero.id])
  }
}
