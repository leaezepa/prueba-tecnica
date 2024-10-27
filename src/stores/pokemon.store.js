import { defineStore } from 'pinia'
import axios from 'axios';

export const usePokeStore = defineStore({
    id:'poke-store',
    state: () => ({
      pokemon:[],
      pokemonList:[],
      favorites:[],
      stats:{},
      notFound:false,
    }),
    actions:{
      async getAllPokemon(){
        let ALL_POKE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
        await axios.get(ALL_POKE_URL).then(response => {
            this.pokemon = response.data;
            this.pokemonList = response.data?.results;
          })
          .catch(error => {
            console.log(error)
          })
      },
      async getPokemonStats(name){
        let STATS_POKE_URL = `https://pokeapi.co/api/v2/pokemon/${name}`;
        await axios.get(STATS_POKE_URL).then(response => {
          this.stats = response.data;
        }).catch(error => {
          console.log(error);
        });
      },
      addPokeToFavorites(poke){
        let isInArray = this.favorites.find((e) => e?.name === poke?.name);
        let pokeObj = {name: poke?.name, url: poke?.url ?? `https://pokeapi.co/api/v2/pokemon/${poke?.id}`}
        if(isInArray){
          this.favorites = this.favorites.filter(e => e?.name !== poke?.name);
        }else{
          this.favorites.push(pokeObj);
          this.favorites.sort((a, b) => {
            // POR CADA ENTRADA DE FAVORITES VEMOS SUS URL, HACEMOS UN SPLIT PARA SEPARAR TODOS LOS VALORES QUE ESTEN ENTRE /
            // LUEGO FILTRAMOS LOS VALORES DE STRING VACIOS Y RETORNAMOS EL ULTIMO VALOR CON POP
            const idA = parseInt(a.url.split('/').filter(Boolean).pop());
            const idB = parseInt(b.url.split('/').filter(Boolean).pop());
            return idA - idB;
          });
        }
      },
      searchPokemon(array, left, right, objetive){
        // cambiamos el objetivo que se está buscando a minuscula para que la api lo tome bien
        let search = this.changeTextToLowerCase(objetive)
        // si el valor de right es mayor o igual al de left
        if (right >= left) {
          // buscamos el valor justo en el medio de ambos
          var mid = Math.round(left + (right - left) / 2);
          // si el nombre del valor en minuscula incluye el valor buscado
          if (this.changeTextToLowerCase(array[mid]?.name).includes(search)) {
            // se hace un split de la url de ese pokemon
            var splitPoke = array[mid]?.url.split('/')
            // el split siempre tiene en el 6to elemento el ID del pokemon, se le resta 1 para que coincida con el valor del index dentro del array
            var idPoke = splitPoke[6]-1;
            //se crea una nueva lista de resultados con el ID del pokemon buscado en la lista de pokemones guardados
            this.pokemon = { results: [this.pokemonList[idPoke]] };
            return true;
          }
          if (this.changeTextToLowerCase(array[mid]?.name) > search) {
            // VOLVEMOS A BUSCAR EN EL ARRAY DE LA MITAD MENOS 1. A LA IZQUIERDA
            return this.searchPokemon(array, left, mid - 1, search);
          }
          // vOLVEMOS A BUSCAR EN LA MITAD MAS 1 DEL LADO DERECHO DEL ARRAY
          return this.searchPokemon(array, mid + 1, right, search);
        }
        // si todo esto falla, seteamos el valor de notFound a true para mostrar el componente de elemento no encontrado
        this.notFound = true;
        return false;
      },
      changeTextToLowerCase(text) {
        return text.toLowerCase();
      },
      resetPokemonList(){
        this.pokemon = { results: this.pokemonList }
        this.notFound = false;
      }
    }
  }
)
