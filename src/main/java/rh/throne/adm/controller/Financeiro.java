package rh.throne.adm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import rh.throne.adm.controller.model.Obrigacao.CadastrarObrigacao;
import rh.throne.adm.controller.model.Obrigacao.listaObrigacaoDTO;
import rh.throne.adm.controller.model.Obrigacao.repositoryObrigacao;

@RestController
@RequestMapping("/financeiro")
public class Financeiro {

	@Autowired
	private repositoryObrigacao rObrigacao;

	@GetMapping
	public ModelAndView home() {
		var mv = new ModelAndView("Financeiro/financeiro");
		return mv;
	}

	@GetMapping("/getFiltroObrigacao")
	@ResponseStatus(code = HttpStatus.OK)
	public ResponseEntity<listaObrigacaoDTO> getObrigacaoFiltrar(String filtro, boolean pago) {
		var obrigacoes = rObrigacao.getFiltrarPorString(filtro, pago);
		var lista = new listaObrigacaoDTO(obrigacoes);
		return ResponseEntity.status(HttpStatus.OK).body(lista);
	}

	@PostMapping("/cadastrar")
	@ResponseStatus(code = HttpStatus.CREATED)
	public ResponseEntity<CadastrarObrigacao> cadastrar(@RequestBody CadastrarObrigacao ob) {
		rObrigacao.save(ob.toObrigacao());
		return ResponseEntity.status(HttpStatus.CREATED).body(ob);
	}


	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(code = HttpStatus.OK)
	public ResponseEntity<Long> deletar(@PathVariable Long id) {
	    rObrigacao.deleteById(id);
	    return ResponseEntity.status(HttpStatus.OK).body(id);
	}
	
	@GetMapping("/moverOb/{id}")
	@ResponseStatus(code = HttpStatus.OK)
	public ResponseEntity<Long> moverParaPendente(@PathVariable Long id, boolean situacao) {
		var ob = rObrigacao.findById(id).get();
		ob.setPago(situacao);
		rObrigacao.save(ob);
	    return ResponseEntity.status(HttpStatus.OK).body(id);
	}
	

}
