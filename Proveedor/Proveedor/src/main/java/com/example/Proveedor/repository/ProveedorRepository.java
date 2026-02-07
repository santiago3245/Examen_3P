package com.example.Proveedor.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Proveedor.model.Proveedor;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    List<Proveedor> findByTipo(Proveedor.TipoProveedor tipo);
    List<Proveedor> findByCiudad(String ciudad);
}
