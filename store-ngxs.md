# Storage con NGXS
Por Giovany Oliva C.
#### ¿Que es NGXS?

Es un State Management enfocado en Angular, 
Nos facilita manejar los estados de la información dentro de nuestra App con el uso de acciones.

Actua como unica fuente de la verdad (pues la información se guarda en un mismo lugar, el store), de esta forma ahorrando confusiones y haciendola más accesible para todos los componentes que la requieran.

Es una librería OpenSource, aqui está el enlace a su [documentación](https://www.ngxs.io/concepts/intro)

#### Instalación y Pluggins útiles
En el terminal de nuestro proyecto ejecutamos

  `npm install @ngxs/store --save`
  
En nuestro app.module importamos el modulo

import { NgxsModule } from '@ngxs/store';

luego en el segmento de imports:
```
@NgModule({
  imports: [
    NgxsModule.forRoot([nombreDelState], {
      developmentMode: !environment.production
    })
  ]
})
```
Para logger plugin (nos permite ver cuando las acciones son ejecutadas)
y devtools plugin (permite observar la administración de nuestro estado en Redux devtools con Chrome o Firefox)

`npm install @ngxs/logger-plugin@dev --save`
`npm install @ngxs/devtools-plugin --save-dev`

Ahora los imports de nuestro NgModule

```
@NgModule({
  imports: [
    NgxsModule.forRoot([nombreDelState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: environment.production})
    ,NgxsLoggerPluginModule.forRoot({disabled: environment.production})
  ]
})
```

#### Flujo de NGXS

Una breve descripción de las 4 claves de NGXS

* Store: contenedor global del estado, quien despacha las acciones y el selector.
* Action: se podría explicar como un comando que desencadena algo.
* State: donde se manejan los cambios a la información, toman el estado actual y entregan uno nuevo.
* Select: funciones que nos permiten acceder a nuestro estado o parte de este.

Antes de continuar debemos entender el flujo que se llevará dentro de nuestra App

* En nuestro componente dispararemos la Action la cual puede o no contener metadata (payload)
* Esta acción modifica/interactua con la información en nuestro Store
* Y con un select obtenemos esta información en el componente donde la necesitemos



#### Ejemplo de implementación
Nuestro programa se basa en mostrar los heroes disponibles en la api de marvel, para esto contamos con un heroes.service.ts que se encarga de la obtención de la data entre otras funciones importantes .

Habiendo explicado esto compartiré la estructura de mi carpeta store
* ---store
* -hero.model.ts
* -hero.actions.ts
* -hero.state.ts

En el archivo hero.model.ts tenemos el modelo de nuestro state el cual es un array de nombre 'heroes' que guarda objetos tipo <Heroe>
```
import { Heroe } from "../classes/heroe";

export class HeroeStateModel {
    heroes: Heroe[];
}
```

En el archivo hero.actions.ts es donde definimos nuestra acción
```
export class HeroeData {
    static readonly type = '[Heroes] GetData'

    constructor(public readonly payload: {searchString?: string, page?: number}){

    }
   
}
```

Se recomienda darles nombres representativos a nuestras acciones, declarar el contexto de esta, en este caso es una Accion Heroes que nos trae la data.

El payload es lo que nos ayudará a realizar los distintos tipos de consultas a la api para así obtener la información que necesitamos, le entregamos una posible palabra de busqueda y/o una posible pagina.

Ahora el código del metodo getHeroes el cual se encuentra en heroes.service.ts, con este metodo realizamos la llamada a la api, aquí es onde usaremos el payload que ingresaremos al despachar/disparar la accion.
```
async getHeroes (nameStartsWith?: string, page?: number) :Promise <Heroe[]> {
      console.log("TEAMS"); 
      console.log(Array.from(this.teams));
      
      if (page || page === 0) {
        this.page = page;
      }
      const url = this.protocol + this.ApiUrl + `characters?ts=1&apikey=${this.yourApiKey}&hash=e66f6d4113c62a340eccea2bbe11aef7`
      + '&offset=' + (this.page * this.step)
      + (nameStartsWith ? ('&nameStartsWith=' + nameStartsWith) : '');
      const response = await lastValueFrom(this.http.get(url));
      const data = response as {data : any}
      this.heroes = [];
      this.total = Math.ceil(data.data.total / this.step);
      data.data.results.forEach( (result : any) => {
        let team = '';
        for (const [key, value] of this.teams){
          if( key === result.id+ 'characters'){
            team = value
          }
        }
        this.heroes.push(new Heroe(
          result.id,
          result.name,
          result.description,
          result.modified,
          result.thumbnail.path,
          result.thumbnail.extension,
          result.resourceURI,
          team || this.getTeamColor(result.id),
        ))
      })
      return this.heroes;
    }
```

Procediendo por ultimo con hero.state.ts
Primeramente declaramos nuestro State que es del tipo HeroeStateModel, nuestro state tiene el nombre de 'heroes' y guarda un array del mismo nombre ('heroes')

Ya luego procedemos a ejecutar nuestra acción la cual dependiendo del payload ingresado en la acción(ya lo veremos más a detalle) realizará la consulta a nuestro metodo en heroes.service.ts y la almacenará en el Array

cabe destacar que el payload lo extraemos de la action, y que desde el ctx obtenemos el metodo setState con el cual asignamos el contenido de la respuesta en el state heroes.
```
import { Action, State, StateContext } from "@ngxs/store";
import { HeroeStateModel } from "./hero.model";
import { HeroeData } from "./hero.actions";
import { HeroesService } from "../heroes.service";
import { Heroe } from "../classes/heroe";
import { Injectable } from '@angular/core';


@Injectable()
@State<HeroeStateModel>({
    name: 'heroes',
    defaults: {
        heroes :  new Array<Heroe>
    }
})

export class HeroeState {

    constructor(private HeroeService: HeroesService){}

    @Action(HeroeData)
    async get( ctx:  StateContext<HeroeStateModel>, action: HeroeData){
        let Array: Array<Heroe>
        if (action.payload.page === 0){
            this.HeroeService.resetPager();
            Array = await this.HeroeService.getHeroes(action.payload.searchString);
        }else{
            Array = await this.HeroeService.getHeroes(action.payload.searchString, action.payload.page);
        }
        ctx.setState({
            heroes:[
                
                ...Array

            ]
        })
       console.log(Array)

    }
      
}
```

#### Disparando la acción desde nuestro componente
En este caso nos interesa obtener la información en el componente listado-de-heroes
en el cual tenemos 
```
public searchString: string;
heroeArray$: Observable<Heroe[]>;
```
searchString se ingresa desde un input en el html y permite realizar una consulta por nombre de heroe 
heroeArray$ es un observable el cual nos servirá para recibir la data del store y mostrarla en el component html

Procedamos pues con los disparos de la acción, primeramente en ngOnInit() es donde realizamos un disparo con un payload que no tiene searchString y page tiene valor 0, con tal de recibir los primeros heroes de la api.
entonces desde la store con dispatch disparamos una nueva accion HeroeData y le entregamos el payload.

Aquí es importante notar como obtener la información de todas las acciones que dipararemos
utilizando la store y luego select obtenemos el state.heroes.heroes(state de nombre heroes que contiene el array heroes), al estar almacenado en un Observable se irá actualizando cada vez que la información sea modificada por los disparos de las acciones.
```
  async ngOnInit(): Promise<void> {
      
      const payload = {searchString: '', page: 0}
      await lastValueFrom(this.store.dispatch(new HeroeData(payload)));
      this.heroeArray$ = this.store.select(state => state.heroes.heroes)
   
    }
    
    /* segmento que se ejecuta desde hero.state
    if (action.payload.page === 0){
            this.HeroeService.resetPager();
            Array = await this.HeroeService.getHeroes(action.payload.searchString);
            */
```
Luego tenemos el metodo submitSearch(), este metodo se ejecuta cuando el usuario ingresa una cadena desde el input, entonces al payload le asignamos el valor de searchString que viene desde el formulario, y tambien entregamos el valor de page para que pueda cargar la siguiente información dependiendo del tamaño de la respuesta
es importante mencionar que la pagina viene desde el heroes.service
```
async submitSearch(): Promise<void> {
      this.heroesService.resetPager();
      const payload = {searchString: this.searchString, page: this.heroesService.page}
      await lastValueFrom(this.store.dispatch(new HeroeData(payload)));
    }
```
Por ultimo prevPage() y nextPage()
aqui al payload le entregamos tanto el searchString como la capacidad de retroceder o avanzar en paginas (en prevPage this.page -1 y en nextPage this.page +1), el searchString lo entregamos en caso de que al buscar una cadena salga una respuesta amplia que necesite recorrer paginas.
```
    async prevPage(): Promise<void> {
        const payload = {searchString: this.searchString, page: this.heroesService.page - 1}
        await lastValueFrom(this.store.dispatch(new HeroeData(payload)));
      }

    async nextPage(): Promise<void> {
      const payload = {searchString: this.searchString, page: this.heroesService.page + 1}
      await lastValueFrom(this.store.dispatch(new HeroeData(payload)));
    }
```
De esta forma podemos usar NGXS para almacenar nuestra data en una store.

Si quiere testear el resultado de la app aqui está el enlace al [repositorio](https://github.com/GiovaOliva/Heroes/tree/develop) donde se encuentra la aplicación, actualmente disponible en la rama develop.


#### Enlaces de utilidad
* [Documentación de NGXS](https://www.ngxs.io/)
* [Introducción a NGXS por Domini Code](https://www.youtube.com/watch?v=uZUL4jEAsDM&t=1174s&ab_channel=DominiCode)
* [Proyecto de Posts que implementa NGXS por Tomas Ruiz Diaz](https://www.youtube.com/watch?v=9DZLUfmzJjA&t=4576s&ab_channel=TomasRuizDiaz)
* [NGXS Tutorial por Creative Developer](https://www.youtube.com/watch?v=OAXlSbC-fJo&list=PL-zhdk-KbnqBGnCz7F9iyfQKyHDEd2QIh&ab_channel=CreativeDeveloper)


