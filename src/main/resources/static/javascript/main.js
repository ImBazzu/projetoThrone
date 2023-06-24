
function selecionarCabecalho() {
	var titulo = document.querySelector("title").textContent;

	document.querySelectorAll(".cabecalho_navegacao nav a").forEach((item) => {
		if (item.dataset.titulo == titulo) {
			item.classList.add("ativado");
			console.log("inserido")
		}
	})
}

selecionarCabecalho();