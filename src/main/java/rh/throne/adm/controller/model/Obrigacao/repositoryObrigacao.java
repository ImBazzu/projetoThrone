package rh.throne.adm.controller.model.Obrigacao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public interface repositoryObrigacao extends CrudRepository<Obrigacao, Long> {

	@Query("SELECT o FROM Obrigacao o ORDER BY o.vencimento ASC")
	public List<Obrigacao> getObrigacao();

	@Query("SELECT o FROM Obrigacao o WHERE (lower(o.nome) LIKE %:value% OR lower(o.descricao)"
			+ "LIKE %:value% OR lower(o.fp) LIKE %:value% OR DATE_FORMAT(o.vencimento, '%d/%m/%Y') "
			+ "LIKE %:value% OR o.valor LIKE %:value%) AND o.pago = :pago ORDER BY o.vencimento ASC")
	public List<Obrigacao> getFiltrarPorString(String value, boolean pago);
}
