package com.example.Proveedor.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "proveedores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Proveedor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TipoProveedor tipo;
    
    @Column(nullable = false)
    private String ciudad;
    
    public enum TipoProveedor {
        TALLER,
        CLINICA,
        GRUA
    }

    public Proveedor(String nombre, TipoProveedor tipo, String ciudad) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.ciudad = ciudad;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public TipoProveedor getTipo() {
        return tipo;
    }
    public void setTipo(TipoProveedor tipo) {
        this.tipo = tipo;
    }
    public String getCiudad() {
        return ciudad;
    }
    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }
}
