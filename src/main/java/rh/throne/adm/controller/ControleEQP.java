package rh.throne.adm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/controleEQP")
public class ControleEQP {
	
	@GetMapping
	public ModelAndView home() {
		var mv = new ModelAndView("Controle EQP/controleEQP");
		return mv;
	}
}
