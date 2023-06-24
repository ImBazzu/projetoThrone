var apenasPago = false;
function consultar() {
	var texto = document.querySelector("#txtFiltro").value;
	fetch("http://localhost:81/financeiro/getFiltroObrigacao?filtro=" + encodeURIComponent(texto) + "&pago="
		+ encodeURIComponent(apenasPago))
		.then(response => response.json())
		.then(data => {
			inserirLinha(data.listaOb, data.valorTotalFormatado);
		})
		.catch(error => {
			console.log("Error:", error);
		});
}


function inserirLinha(data, valorTotal) {

	var tabela = document.querySelector("tbody");
	tabela.querySelectorAll("tr").forEach(e => {
		e.remove();
	})

	data.forEach(objeto => {
		var novaLinha = tabela.insertRow();
		novaLinha.dataset.id = objeto.id;
		if (objeto.fp === "CB") {
			novaLinha.classList.add("cb");
		} else {
			novaLinha.classList.add("bo");
		};

		var celulaNome = novaLinha.insertCell();
		celulaNome.innerHTML = objeto.nome;
		celulaNome.dataset.cabecalho = "Nome";

		var celulaDescricao = novaLinha.insertCell();
		celulaDescricao.innerHTML = objeto.descricao;
		celulaDescricao.dataset.cabecalho = "Descrição";

		var celulaVencimento = novaLinha.insertCell();
		celulaVencimento.innerHTML = objeto.vencimento;
		celulaVencimento.dataset.cabecalho = "Vencimento";

		var celulaValor = novaLinha.insertCell();
		celulaValor.innerHTML = objeto.valor;
		celulaValor.dataset.cabecalho = "Valor"

		var celulaFp = novaLinha.insertCell();
		celulaFp.innerHTML = objeto.fp;
		celulaFp.dataset.cabecalho = "F.P";

		var celulaButton = novaLinha.insertCell();
		celulaButton.dataset.cabecalho = "#";
		var divButton = document.createElement("div");
		divButton.className = "tabButoes";

		var btnApagar = document.createElement("button");
		btnApagar.innerHTML = "Apagar";
		btnApagar.addEventListener("click", apagar);
		btnApagar.value = objeto.id;
		btnApagar.className = "tabButoes_apagar";
		divButton.appendChild(btnApagar);

		if (objeto.pago) {

			var btnPendente = document.createElement("button");
			btnPendente.innerHTML = "Mover Pendente";
			btnPendente.addEventListener("click", function() { moverOB(objeto.id, false); });
			btnPendente.value = objeto.id;
			btnPendente.className = "tabButoes_Pendente";
			divButton.appendChild(btnPendente);

		} else {
			var btnPago = document.createElement("button");
			btnPago.innerHTML = "Mover Pago";
			btnPago.addEventListener("click", function() { moverOB(objeto.id, true); });
			btnPago.value = objeto.id;
			btnPago.className = "tabButoes_Pago";
			divButton.appendChild(btnPago);
		}
		
		celulaButton.appendChild(divButton);

	}
	);

	document.querySelector("#somaValorTotal").innerHTML = valorTotal;
};

function moverOB(id, situacao) {
	fetch("http://localhost:81/financeiro/moverOb/" + id + "?situacao=" + encodeURIComponent(situacao))
		.then(response => {
			if (response.ok) {
				consultar()
				return response.json();
			} else {
				throw new Error("Erro na mudança para pendencia a obrigação");
			}
		}).catch(error => {
			console.log("Error:", error);
		});

};

function apagar(event) {
	var id = event.target.value;
	fetch("http://localhost:81/financeiro/deletar/" + id, { method: "DELETE" })
		.then(response => {
			if (response.ok) {
				consultar()
				return response.json();
			} else {
				throw new Error("Erro na exclusão");
			}
		})
		.then(consultar()
		).catch(error => {
			console.log("Error:", error);
		});


};

document.querySelector("#formFiltro").addEventListener("submit", function(event) {
	event.preventDefault();
	consultar();
});

function pintarBtnFiltro() {
	if (apenasPago) {
		document.querySelector("#btnPago").classList.add("btnSelecionar");
		document.querySelector("#btnPendente").classList.remove("btnSelecionar");
	} else {
		document.querySelector("#btnPendente").classList.add("btnSelecionar");
		document.querySelector("#btnPago").classList.remove("btnSelecionar");
	}
	consultar();
}

document.querySelector("#btnPendente").addEventListener("click", function() {
	apenasPago = false;
	pintarBtnFiltro();

});

document.querySelector("#btnPago").addEventListener("click", function() {
	apenasPago = true;
	pintarBtnFiltro();
});

document.querySelector("#btCadastrar").addEventListener("click", function() {
	document.querySelector(".formulario").style.display = "flex";

});


function fecharForm() {
	var form = document.querySelector(".formulario");
	form.querySelector("form").reset();
	form.style.display = "none";

};

document.querySelector("#btFecharForm").addEventListener("click", fecharForm);


document.querySelector("#formObrigacao").addEventListener("submit", function(event) {
	event.preventDefault();
	var form;
	form = document.querySelector("#formObrigacao")
	const dados = {
		nome: form.querySelector("[name=nome]").value,
		descricao: form.querySelector("[name=descricao]").value,
		vencimento: form.querySelector("[name=vencimento]").value,
		valor: form.querySelector("[name=valor]").value,
		fp: form.querySelector("input[name=fp]:checked").value
	};

	const dadosJson = JSON.stringify(dados);
	fetch("http://localhost:81/financeiro/cadastrar", {
		//fetch("http://192.168.0.106:81/financeiro/cadastrar", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: dadosJson
	}).then(response => response.json())
		.then(data => {
			console.log("Resposta do servidor", data);
			fecharForm();
			consultar();

		})
		.catch(error => {
			console.log("Error:", error);
		});

});

document.querySelector("[name=valor]").addEventListener("keydown", function(event) {
	if (event.key === "e" || event.key === "E") {
		event.preventDefault();
	} else {
		var valor = event.target.value;
		if (valor.includes(".") && /^\d$/.test(event.key)) {
			if (valor.substring(valor.lastIndexOf(".") + 1).length === 2) {
				event.preventDefault();
			};
		}
	}
})

window.addEventListener('load', function() {
	pintarBtnFiltro();
});
