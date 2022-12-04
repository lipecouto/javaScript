
    const listapokemons = document.getElementById('pokemonList');
    const pokemondetail = document.getElementById('pokedetailpai');

    const loadmore = document.getElementById('loadmore');
   
    const spinner = document.getElementById("spinner");
    const grupoContent = document.getElementById('contentList');

    const maxrecords = 151
    const limit = 10;
    const pokemonguard = []
    
    let offset = 0;

    function openNav() {
        document.getElementById("mySidenav").style.width = "10rem";
    }
      
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
    
    function loadMorePokemon(offset, limit, loaded){
        requestapi.getPokemons(offset, limit).then((pokemons  = []) => {
            const newHtml = pokemons.map(convertPokemontoLi).join('')
            const detHtml = pokemons.map(convertPokemonDetail).join('')
           
            pokemonguard.push[pokemons]
            listapokemons.innerHTML += newHtml;
            pokemondetail.innerHTML = detHtml;
            if (loaded == 0){
                spinner.setAttribute('hidden', '')
                grupoContent.removeAttribute('hidden')
            }
        })
    }

    loadMorePokemon(offset, limit, 0);

    loadmore.addEventListener('click', () =>{
        offset += limit
        const qtdRecordNextPage = offset + limit;
        if(qtdRecordNextPage >= maxrecords){
            const newLimit = maxrecords - offset;
            loadMorePokemon(offset, newLimit, 1);

            loadmore.parentElement.removeChild(loadmore);

        }else{
            loadMorePokemon(offset, limit, 1)
        }
    })
    /* Ao criar a classe para receber o pokemon do fetch, essa função de types não precisa mais ser acionada, pois
    os types agora fazem parte da classe pokemon, substituido pela linha  ${pokemon_types.map((type) => ` <li class="type">${type}</li>`)}
    function convertPokemonTypestoLi(pokemonTypes){
        return pokemonTypes.map((typeSlot) => {
            return ` <li class="type">${typeSlot.type.name}</li>`
        })
    } 
    */

    function convertPokemontoLi(pokemon_){
      
        return `    <a href="javascript:void(0)" onclick="openDet(${pokemon_.pokeid})">  <li class="pokemon ${pokemon_.type}" id="pokemon${pokemon_.pokeid}">
                        <span class="number">#${pokemon_.pokeid}</span>
                        <span class="name">${pokemon_.name}</span>
                        <div class="detail">
                            <ol class="types">
                                ${pokemon_.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                            <img src="${pokemon_.photo}" alt="${pokemon_.name}"> 
                        </div>
                    
                    </li></a>
                `
    }

    function convertPokemonDetail(pokemon){
       
        return `<sections class="sectionDetail ${pokemon.type}" id="pokemon${pokemon.pokeid}" hidden>
                    <div class="headerDetalhes">
                        <a href="javascript:void(0)" onclick="closeDet(${pokemon.pokeid})" style="text-decoration: none; color: black; z-index: 10;"> 
                            <span class="material-symbols-outlined">arrow_back</span>
                        </a>
                        <h1>${pokemon.name}</h1>
                    </div>
                    <div class="imgdiv">
                        <div></div>
                        <img src="${pokemon.photo}" alt="${pokemon.name}"> 
                        <div></div>
                    </div>
                    <div class="detalhes">
                        <ol class="detalheol">
                            <li>Geral</li>
                            <li>Status</li>
                        </ol>
                        <div class="listaStatus">
                            <div class="info">
                                <ol class="infodetail">
                                    ${convertStatsPokemonToLi(pokemon)}
                                </ol>
                            </div>
                        </div>
                    </div>
                </sections>`
            
    }

    function convertStatsPokemonToLi(pokemon){
        const pokeSts = pokemon.status
        const pokeStsVl = pokemon.statusValue
        


        let htmlInt = ''
        let cssclass = ''

        for (const key in pokeSts){
            if(pokeStsVl[key] >= 50){
                cssclass = 'progress'
            }
            else{
                cssclass = 'progressred'
            }

            htmlInt += `<li> <span>${pokeSts[key]}</span><div>${pokeStsVl[key]}</div> <progress class="${cssclass}" value="${pokeStsVl[key]}" max="100"></progress> </li>`
                                                       
        }

        return htmlInt
    }
    // ---- abaixo há uma chamada para o carregamento da pagina para quando não tem o botão de loadmore -----
    //requestapi.getPokemons().then((pokemonList = [] /*na chamada define uma lista vazia*/) => {
        //console.log(pokemonList.map(convertPokemontoLi).join(''))
    //    listapokemons.innerHTML += pokemonList.map(convertPokemontoLi).join('')
    //})

    /* o script abaixo pode ser substituido pelo script com o método MAP acima.    
        const pokemon = []; 
        for (let index = 0; index < pokemonList.length; index++) {
            const pokelist = pokemonList[i];
            pokemons.push(convertPokemontoLi(pokelist));      
        }
    */