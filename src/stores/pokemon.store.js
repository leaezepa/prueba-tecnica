import { defineStore } from 'pinia'
import axios from 'axios';

export const usePokeStore = defineStore({
    id:'poke-store',
    state: () => ({
      pokemon:[],
      pokemonList:[],
      stats:{},
      notFound:false,
    }),
    actions:{
      async getAllPokemon(){
        let ALL_POKE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=2000';
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
      searchPokemon(array, left, right, objetive){
        let search = this.changeTextToLowerCase(objetive)
        if (right >= left) {
          var mid = Math.round(left + (right - left) / 2);
          if (this.changeTextToLowerCase(array[mid]?.name).includes(search)) {
            var splitPoke = array[mid]?.url.split('/')
            var idPoke = splitPoke[6]-1;
            this.pokemon = { results: [this.pokemonList[idPoke]] };
            return true;
          }
          if (this.changeTextToLowerCase(array[mid]?.name) > search) {
            return this.searchPokemon(array, left, mid - 1, search);
          }
          return this.searchPokemon(array, mid + 1, right, search);
        }
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
