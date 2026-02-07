package com.example.Proveedor.controller;

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

import com.example.Proveedor.model.Proveedor;
import com.example.Proveedor.service.ProveedorService;

@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = "*")
public class ProveedorController {
    
    @Autowired
    private ProveedorService proveedorService;
    
    @GetMapping
    public ResponseEntity<List<Proveedor>> getAllProveedores() {
        return ResponseEntity.ok(proveedorService.getAllProveedores());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Proveedor> getProveedorById(@PathVariable Long id) {
        return proveedorService.getProveedorById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Proveedor>> getProveedoresByTipo(@PathVariable Proveedor.TipoProveedor tipo) {
        return ResponseEntity.ok(proveedorService.getProveedoresByTipo(tipo));
    }
    
    @GetMapping("/ciudad/{ciudad}")
    public ResponseEntity<List<Proveedor>> getProveedoresByCiudad(@PathVariable String ciudad) {
        return ResponseEntity.ok(proveedorService.getProveedoresByCiudad(ciudad));
    }
    
    @PostMapping
    public ResponseEntity<Proveedor> createProveedor(@RequestBody Proveedor proveedor) {
        Proveedor newProveedor = proveedorService.createProveedor(proveedor);
        return ResponseEntity.status(HttpStatus.CREATED).body(newProveedor);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Proveedor> updateProveedor(@PathVariable Long id, @RequestBody Proveedor proveedor) {
        try {
            Proveedor updatedProveedor = proveedorService.updateProveedor(id, proveedor);
            return ResponseEntity.ok(updatedProveedor);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProveedor(@PathVariable Long id) {
        try {
            proveedorService.deleteProveedor(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
