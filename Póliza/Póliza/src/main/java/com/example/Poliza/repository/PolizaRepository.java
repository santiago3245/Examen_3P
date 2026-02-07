package com.example.Poliza.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Poliza.model.Poliza;

@Repository
public interface PolizaRepository extends JpaRepository<Poliza, Long> {
    Optional<Poliza> findByNumeroPoliza(String numeroPoliza);
    boolean existsByNumeroPoliza(String numeroPoliza);
}
