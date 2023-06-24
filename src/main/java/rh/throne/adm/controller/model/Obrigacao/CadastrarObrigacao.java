package rh.throne.adm.controller.model.Obrigacao;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CadastrarObrigacao(String nome, String descricao, String fp, LocalDate vencimento, BigDecimal valor) {

	public Obrigacao toObrigacao() {
		return new Obrigacao(null,this.nome,this.descricao,this.fp,this.vencimento,this.valor,false);
	}
}
