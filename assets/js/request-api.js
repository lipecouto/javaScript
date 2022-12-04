//cria uma lista vazia para receber o retorno das requisições abaixo.
const requestapi = {}


// função para criar o novo pokemon e preencher os dados relacionados ao pokemon
function convertPokeApiDetailToPokemon(pokeDetail){

    const pokem = new Pokemon()
    pokem.name = pokeDetail.name
    pokem.pokeid = pokeDetail.id

    const _types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
   
    const [ _type ] = _types
    pokem.types = _types
    pokem.type = _type
    pokem.species = _type
    
    pokem.photo = pokeDetail.sprites.other.dream_world.front_default


    const _status =  pokeDetail.stats.map((key) => key.stat.name)

    pokem.status = _status
    
    const _statusValue =  pokeDetail.stats.map((key) => key.base_stat)
    pokem.statusValue = _statusValue

    pokem.weight = pokeDetail.weight

    pokem.abilities = pokeDetail.abilities.map((abilidade) =>{
        return abilidade.ability.name;
    })
   
    //console.log(pokeDetail.stats.base_stat.stat)
    //const [ _attack ] = _stats
    //pokem.attack = _attack
    

    /*O bloco abaixo foi inserido para o caso de haver a chamada da API em uma outra URL com dados complementares do pokemon
    fetch(pokeDetail.species.url)
    .then((res) => res.json())
    .then((jsonBody) => jsonBody.egg_groups)
    .then((dados) => dados.map((name) => name.name))
    .then((end) => {return pokem.species = end})*/

    console.log(pokem)


    //const [_speciepokemon ] = speciepokemon
    //pokem.specie = _speciepokemon
    //pokem.species.then(name => name)
    
    return pokem;
}

// Não é reomendado a utilização de callback dentro de callback (Haduken)
// O melhor modelo é usar then segundo de outro then exemplo
//      .then(function (response){ return response.json()}.then(function (responsebody){ return responsebody});
//
//arrow funciont é uma sintax reduzida para uma função
//Promese.all() é um método que executa varios fetchs e contatena os resultados
requestapi.getPokemonsDetail = async (pokemon) =>{
    return await fetch(pokemon.url)
                .then((response) => response.json()) 
                .then(convertPokeApiDetailToPokemon)
                .catch((err) => console.log(err))
}


requestapi.getPokemons =  async (offset = 0, limit = 0)  =>{
    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return  await fetch(url) //Fetch usa o método GET por padrão
    // converte  a resposta do fetch da utl em um json
    .then((response) =>  response.json())
    // converte o json em resultados que veio do json
    .then((jsonBody) => jsonBody.results)   
    //mapeia a a lista de pokemons do jsonbody em uma nova lista de requisições para buscar cada detalhe dos pokemons dinamicamente (porque nesse caso há uma subconsulta da API para pokemons)
    //chamando a função getPokemonsDetail criada para essa ação
    .then((pokemons) => pokemons.map(requestapi.getPokemonsDetail))
    //a função retorna uma promesse que é chamanada de detailRequest e chama o método Promese.all para aguardar a execução de cada requisição da função getPokemonsDetail
    .then((detailRequests) => Promise.all(detailRequests))
    // Lista os detalhes do pokemons que foi retornado da promese.all exibindo cada detalhe dos pokemons passados na chamada da função getPokemonsDetail
    .then((pokemonDetails) => pokemonDetails) 
    .catch((err) => console.error(err))
    
}