function openDet(pokeid) {
    document.getElementById('pokedetailpai').style.width = "100rem";

    const pokemon = document.getElementById("pokemon"+pokeid);
    pokemon.removeAttribute("hidden");
    pokemon.style.display = "grid"

}
    
function closeDet(pokeid){
    document.getElementById('pokedetailpai').style.width = "0";

    const pokemon = document.getElementById("pokemon"+pokeid);
    pokemon.setAttribute("hidden", '');
    pokemon.style.display = "none"
}
        