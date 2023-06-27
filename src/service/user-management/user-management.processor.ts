import {map, Observable} from "rxjs";

export interface User {
  name: string;
  gender: string;
  email: string;
  location: string;
  dob: string;
  phone: string
  registered: string;
}

export function processData<T>(): (data$: Observable<T>) => Observable<User> {
  return data$ => data$.pipe(
    map((res: any) => res.results),
    map((data: any) => {
      return data.map((item: any) => {
        return {
          name: `${item.name.title} ${item.name.first} ${item.name.last}`,
          dob: item.dob.date,
          email: item.email,
          gender: item.gender,
          location: `${item.location.street.number} ${item.location.street.name}, ${item.location.city}, ${item.location.state}, ${item.location.country}`,
          phone: item.phone,
          registered: item.registered.date
        }
      })
    })
  )

}
