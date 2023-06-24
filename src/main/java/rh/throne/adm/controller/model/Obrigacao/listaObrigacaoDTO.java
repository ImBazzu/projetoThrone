package rh.throne.adm.controller.model.Obrigacao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import lombok.Getter;

@Getter
public class listaObrigacaoDTO {
	private List<ObrigacaoDTO> listaOb = new ArrayList<>();
	private BigDecimal valorTotal = new BigDecimal("0");
	private String valorTotalFormatado;
	
	public listaObrigacaoDTO(List<Obrigacao> listaObDTO) {
		
		listaObDTO.forEach((item) -> {
			valorTotal = valorTotal.add(item.getValor());
			this.listaOb.add(new ObrigacaoDTO(item));
		});
		this.valorTotalFormatado = ObrigacaoDTO.getFormatarValor(valorTotal);
	}
}
