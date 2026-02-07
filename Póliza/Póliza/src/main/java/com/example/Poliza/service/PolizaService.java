package com.example.Poliza.service;

import com.example.Poliza.model.Poliza;
import com.example.Poliza.repository.PolizaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PolizaService {
    
    @Autowired
    private PolizaRepository polizaRepository;
    
    public List<Poliza> getAllPolizas() {
        return polizaRepository.findAll();
    }
    
    public Optional<Poliza> getPolizaById(Long id) {
        return polizaRepository.findById(id);
    }
    
    public Optional<Poliza> getPolizaByNumero(String numeroPoliza) {
        return polizaRepository.findByNumeroPoliza(numeroPoliza);
    }
    
    public Poliza createPoliza(Poliza poliza) {
        if (polizaRepository.existsByNumeroPoliza(poliza.getNumeroPoliza())) {
            throw new RuntimeException("Ya existe una póliza con el número: " + poliza.getNumeroPoliza());
        }
        return polizaRepository.save(poliza);
    }
    
    public Poliza updatePoliza(Long id, Poliza polizaDetails) {
        Poliza poliza = polizaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Póliza no encontrada con id: " + id));
        
        poliza.setNumeroPoliza(polizaDetails.getNumeroPoliza());
        poliza.setTipo(polizaDetails.getTipo());
        poliza.setEstado(polizaDetails.getEstado());
        
        return polizaRepository.save(poliza);
    }
    
    public void deletePoliza(Long id) {
        Poliza poliza = polizaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Póliza no encontrada con id: " + id));
        polizaRepository.delete(poliza);
    }
}
