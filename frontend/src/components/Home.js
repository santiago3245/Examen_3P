import React from 'react';

function Home() {
  return (
    <div className="App-header">
      <h1>Sistema de Gestión de Siniestros</h1>
      <p>Bienvenido al sistema de gestión de siniestros</p>
      <div style={{ marginTop: '2rem', textAlign: 'left' }}>
        <h3>Descripción del Sistema</h3>
        <p>
          Este sistema permite gestionar:
        </p>
        <ul>
          <li><strong>Pólizas:</strong> Registro y administración de pólizas de seguros</li>
          <li><strong>Proveedores:</strong> Gestión de talleres, clínicas y grúas asociadas</li>
          <li><strong>Siniestros:</strong> Control completo de casos vinculados a pólizas y proveedores</li>
        </ul>
        
        <h3>Tecnologías Utilizadas</h3>
        <ul>
          <li>Backend: Java 17 + Spring Boot 3</li>
          <li>Frontend: React</li>
          <li>Bases de Datos: MySQL (Póliza, Proveedor) y PostgreSQL (Siniestro)</li>
          <li>Contenedorización: Docker</li>
          <li>Orquestación: Kubernetes</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
