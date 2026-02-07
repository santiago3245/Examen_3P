package com.example.Siniestro.service;

import com.example.Siniestro.model.Siniestro;
import com.example.Siniestro.repository.SiniestroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SiniestroService {
    
    @Autowired
    private SiniestroRepository siniestroRepository;
    
    public List<Siniestro> getAllSiniestros() {
        return siniestroRepository.findAll();
    }
    
    public Optional<Siniestro> getSiniestroById(Long id) {
        return siniestroRepository.findById(id);
    }
    
    public Optional<Siniestro> getSiniestroByNumeroCaso(String numeroCaso) {
        return siniestroRepository.findByNumeroCaso(numeroCaso);
    }
    
    public List<Siniestro> getSiniestrosByPoliza(Long polizaId) {
        return siniestroRepository.findByPolizaId(polizaId);
    }
    
    public List<Siniestro> getSiniestrosByProveedor(Long proveedorId) {
        return siniestroRepository.findByProveedorId(proveedorId);
    }
    
    public List<Siniestro> getSiniestrosByEstado(Siniestro.EstadoSiniestro estado) {
        return siniestroRepository.findByEstado(estado);
    }
    
    public Siniestro createSiniestro(Siniestro siniestro) {
        if (siniestroRepository.existsByNumeroCaso(siniestro.getNumeroCaso())) {
            throw new RuntimeException("Ya existe un siniestro con el número de caso: " + siniestro.getNumeroCaso());
        }
        return siniestroRepository.save(siniestro);
    }
    
    public Siniestro updateSiniestro(Long id, Siniestro siniestroDetails) {
        Siniestro siniestro = siniestroRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Siniestro no encontrado con id: " + id));
        
        siniestro.setNumeroCaso(siniestroDetails.getNumeroCaso());
        siniestro.setFecha(siniestroDetails.getFecha());
        siniestro.setDescripcion(siniestroDetails.getDescripcion());
        siniestro.setMontoEstimado(siniestroDetails.getMontoEstimado());
        siniestro.setEstado(siniestroDetails.getEstado());
        siniestro.setPolizaId(siniestroDetails.getPolizaId());
        siniestro.setProveedorId(siniestroDetails.getProveedorId());
        
        return siniestroRepository.save(siniestro);
    }
    
    public void deleteSiniestro(Long id) {
        Siniestro siniestro = siniestroRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Siniestro no encontrado con id: " + id));
        siniestroRepository.delete(siniestro);
    }

}