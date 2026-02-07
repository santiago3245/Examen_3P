package com.example.Siniestro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Siniestro.model.Siniestro;
import com.example.Siniestro.service.SiniestroService;

@RestController
@RequestMapping("/api/siniestros")
@CrossOrigin(origins = "*")
public class SiniestroController {
    
    @Autowired
    private SiniestroService siniestroService;
    
    @GetMapping
    public ResponseEntity<List<Siniestro>> getAllSiniestros() {
        return ResponseEntity.ok(siniestroService.getAllSiniestros());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Siniestro> getSiniestroById(@PathVariable Long id) {
        return siniestroService.getSiniestroById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/caso/{numeroCaso}")
    public ResponseEntity<Siniestro> getSiniestroByNumeroCaso(@PathVariable String numeroCaso) {
        return siniestroService.getSiniestroByNumeroCaso(numeroCaso)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/poliza/{polizaId}")
    public ResponseEntity<List<Siniestro>> getSiniestrosByPoliza(@PathVariable Long polizaId) {
        return ResponseEntity.ok(siniestroService.getSiniestrosByPoliza(polizaId));
    }
    
    @GetMapping("/proveedor/{proveedorId}")
    public ResponseEntity<List<Siniestro>> getSiniestrosByProveedor(@PathVariable Long proveedorId) {
        return ResponseEntity.ok(siniestroService.getSiniestrosByProveedor(proveedorId));
    }
    
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Siniestro>> getSiniestrosByEstado(@PathVariable Siniestro.EstadoSiniestro estado) {
        return ResponseEntity.ok(siniestroService.getSiniestrosByEstado(estado));
    }
    
    @PostMapping
    public ResponseEntity<Siniestro> createSiniestro(@RequestBody Siniestro siniestro) {
        try {
            Siniestro newSiniestro = siniestroService.createSiniestro(siniestro);
            return ResponseEntity.status(HttpStatus.CREATED).body(newSiniestro);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Siniestro> updateSiniestro(@PathVariable Long id, @RequestBody Siniestro siniestro) {
        try {
            Siniestro updatedSiniestro = siniestroService.updateSiniestro(id, siniestro);
            return ResponseEntity.ok(updatedSiniestro);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSiniestro(@PathVariable Long id) {
        try {
            siniestroService.deleteSiniestro(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
