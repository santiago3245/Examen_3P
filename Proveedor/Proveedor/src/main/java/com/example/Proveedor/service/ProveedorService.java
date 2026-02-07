package com.example.Proveedor.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Proveedor.model.Proveedor;
import com.example.Proveedor.repository.ProveedorRepository;

@Service
public class ProveedorService {
    
    @Autowired
    private ProveedorRepository proveedorRepository;
    
    public List<Proveedor> getAllProveedores() {
        return proveedorRepository.findAll();
    }
    
    public Optional<Proveedor> getProveedorById(Long id) {
        return proveedorRepository.findById(id);
    }
    
    public List<Proveedor> getProveedoresByTipo(Proveedor.TipoProveedor tipo) {
        return proveedorRepository.findByTipo(tipo);
    }
    
    public List<Proveedor> getProveedoresByCiudad(String ciudad) {
        return proveedorRepository.findByCiudad(ciudad);
    }
    
    public Proveedor createProveedor(Proveedor proveedor) {
        return proveedorRepository.save(proveedor);
    }
    
    public Proveedor updateProveedor(Long id, Proveedor proveedorDetails) {
        Proveedor proveedor = proveedorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Proveedor no encontrado con id: " + id));
        
        proveedor.setNombre(proveedorDetails.getNombre());
        proveedor.setTipo(proveedorDetails.getTipo());
        proveedor.setCiudad(proveedorDetails.getCiudad());
        
        return proveedorRepository.save(proveedor);
    }
    
    public void deleteProveedor(Long id) {
        Proveedor proveedor = proveedorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Proveedor no encontrado con id: " + id));
        proveedorRepository.delete(proveedor);
    }
}
