package com.example.Siniestro.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "siniestros")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Siniestro {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String numeroCaso;
    
    @Column(nullable = false)
    private LocalDate fecha;
    
    @Column(nullable = false, length = 1000)
    private String descripcion;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal montoEstimado;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EstadoSiniestro estado;
    

    @Column(nullable = false)
    private Long polizaId;
    
    
    @Column(nullable = false)
    private Long proveedorId;
    
    // Transient fields for display (not stored in DB)
    @Transient
    private String numeroPoliza;
    
    @Transient
    private String nombreProveedor;
    
    public enum EstadoSiniestro {
        ABIERTO,
        EN_PROCESO,
        CERRADO
    }

    public Siniestro(String numeroCaso, LocalDate fecha, String descripcion, BigDecimal montoEstimado, EstadoSiniestro estado, Long polizaId, Long proveedorId) {
        this.numeroCaso = numeroCaso;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.montoEstimado = montoEstimado;
        this.estado = estado;
        this.polizaId = polizaId;
        this.proveedorId = proveedorId;
    }

    public long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNumeroCaso() {
        return numeroCaso;
    }
    public void setNumeroCaso(String numeroCaso) {
        this.numeroCaso = numeroCaso;
    }
    public LocalDate getFecha() {
        return fecha;
    }
    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public BigDecimal getMontoEstimado() {
        return montoEstimado;
    }
    public void setMontoEstimado(BigDecimal montoEstimado) {
        this.montoEstimado = montoEstimado;
    }
    public EstadoSiniestro getEstado() {
        return estado;
    }
    public void setEstado(EstadoSiniestro estado) {
        this.estado = estado;
    }
    public Long getPolizaId() {
        return polizaId;
    }
    public void setPolizaId(Long polizaId) {
        this.polizaId = polizaId;
    }
    public Long getProveedorId() {
        return proveedorId;
    }
    public void setProveedorId(Long proveedorId) {
        this.proveedorId = proveedorId;
    }
    public String getNumeroPoliza() {
        return numeroPoliza;
    }
    public void setNumeroPoliza(String numeroPoliza) {
        this.numeroPoliza = numeroPoliza;
    }
    public String getNombreProveedor() {
        return nombreProveedor;
    }
    public void setNombreProveedor(String nombreProveedor) {
        this.nombreProveedor = nombreProveedor;
    }
    

}

