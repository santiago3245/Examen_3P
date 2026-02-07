package com.example.Siniestro.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Siniestro.model.Siniestro;

@Repository
public interface SiniestroRepository extends JpaRepository<Siniestro, Long> {
    Optional<Siniestro> findByNumeroCaso(String numeroCaso);
    boolean existsByNumeroCaso(String numeroCaso);
    List<Siniestro> findByPolizaId(Long polizaId);
    List<Siniestro> findByProveedorId(Long proveedorId);
    List<Siniestro> findByEstado(Siniestro.EstadoSiniestro estado);
}
