package rh.throne.adm.controller.model.Obrigacao;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public record ObrigacaoDTO(Long id, String nome, String descricao, String fp, String vencimento, String valor,
		boolean pago) {

	public ObrigacaoDTO(Obrigacao obrigacao) {

		this(obrigacao.getId(), obrigacao.getNome(), obrigacao.getDescricao(), obrigacao.getFp(),
				getFormatarVencimento(obrigacao.getVencimento()), getFormatarValor(obrigacao.getValor()),
				obrigacao.getPago());
	}

	public static String getFormatarValor(BigDecimal valor) {
		NumberFormat formato = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
		return formato.format(valor);
	}

	public static String getFormatarVencimento(LocalDate vencimento) {
		var format = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		return vencimento.format(format);
	}

}
