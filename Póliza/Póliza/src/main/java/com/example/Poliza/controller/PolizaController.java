package com.example.Poliza.controller;

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

import com.example.Poliza.model.Poliza;
import com.example.Poliza.service.PolizaService;

@RestController
@RequestMapping("/api/polizas")
@CrossOrigin(origins = "*")
public class PolizaController {
    
    @Autowired
    private PolizaService polizaService;
    
    @GetMapping
    public ResponseEntity<List<Poliza>> getAllPolizas() {
        return ResponseEntity.ok(polizaService.getAllPolizas());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Poliza> getPolizaById(@PathVariable Long id) {
        return polizaService.getPolizaById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/numero/{numeroPoliza}")
    public ResponseEntity<Poliza> getPolizaByNumero(@PathVariable String numeroPoliza) {
        return polizaService.getPolizaByNumero(numeroPoliza)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    
    @PostMapping
    public ResponseEntity<Poliza> createPoliza(@RequestBody Poliza poliza) {
        try {
            Poliza newPoliza = polizaService.createPoliza(poliza);
            return ResponseEntity.status(HttpStatus.CREATED).body(newPoliza);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Poliza> updatePoliza(@PathVariable Long id, @RequestBody Poliza poliza) {
        try {
            Poliza updatedPoliza = polizaService.updatePoliza(id, poliza);
            return ResponseEntity.ok(updatedPoliza);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoliza(@PathVariable Long id) {
        try {
            polizaService.deletePoliza(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}


