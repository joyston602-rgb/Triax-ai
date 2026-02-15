import * as THREE from 'three';

export class ObjectFactory {
  static createCube(size = 1) {
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    return new THREE.Mesh(geometry, material);
  }

  static createSphere(radius = 1) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    return new THREE.Mesh(geometry, material);
  }

  static createCylinder(radiusTop = 1, radiusBottom = 1, height = 2) {
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    return new THREE.Mesh(geometry, material);
  }

  static createCone(radius = 1, height = 2) {
    const geometry = new THREE.ConeGeometry(radius, height, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    return new THREE.Mesh(geometry, material);
  }

  static createPlane(width = 2, height = 2) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshStandardMaterial({ color: 0xff00ff, side: THREE.DoubleSide });
    return new THREE.Mesh(geometry, material);
  }

  static createPyramid(size = 1) {
    const geometry = new THREE.ConeGeometry(size, size * 1.5, 4);
    const material = new THREE.MeshStandardMaterial({ color: 0xff8800 });
    return new THREE.Mesh(geometry, material);
  }

  static createOctahedron(radius = 1) {
    const geometry = new THREE.OctahedronGeometry(radius);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ffff });
    return new THREE.Mesh(geometry, material);
  }

  static createTetrahedron(radius = 1) {
    const geometry = new THREE.TetrahedronGeometry(radius);
    const material = new THREE.MeshStandardMaterial({ color: 0x8800ff });
    return new THREE.Mesh(geometry, material);
  }

  static createTorus(radius = 1, tube = 0.4) {
    const geometry = new THREE.TorusGeometry(radius, tube, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xff4444 });
    return new THREE.Mesh(geometry, material);
  }

  static createTorusKnot(radius = 1, tube = 0.4) {
    const geometry = new THREE.TorusKnotGeometry(radius, tube, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x44ff44 });
    return new THREE.Mesh(geometry, material);
  }

  static createDodecahedron(radius = 1) {
    const geometry = new THREE.DodecahedronGeometry(radius);
    const material = new THREE.MeshStandardMaterial({ color: 0x4444ff });
    return new THREE.Mesh(geometry, material);
  }

  static createIcosahedron(radius = 1) {
    const geometry = new THREE.IcosahedronGeometry(radius);
    const material = new THREE.MeshStandardMaterial({ color: 0xffaa44 });
    return new THREE.Mesh(geometry, material);
  }

  static createRing(innerRadius = 0.5, outerRadius = 1) {
    const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xaa44ff, 
      side: THREE.DoubleSide 
    });
    return new THREE.Mesh(geometry, material);
  }

  static createCapsule(radius = 0.5, length = 2) {
    // CapsuleGeometry might not be available in all Three.js versions
    // Create a capsule using cylinder + spheres
    const group = new THREE.Group();
    
    // Main cylinder
    const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, length, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x44aaff });
    const cylinder = new THREE.Mesh(cylinderGeometry, material);
    
    // Top sphere
    const sphereGeometry = new THREE.SphereGeometry(radius, 16, 8);
    const topSphere = new THREE.Mesh(sphereGeometry, material);
    topSphere.position.y = length / 2;
    
    // Bottom sphere
    const bottomSphere = new THREE.Mesh(sphereGeometry, material);
    bottomSphere.position.y = -length / 2;
    
    group.add(cylinder);
    group.add(topSphere);
    group.add(bottomSphere);
    
    return group;
  }

  // Advanced shapes
  static createText(text = "Hello", size = 1) {
    // This would require TextGeometry from three/examples/jsm/geometries/TextGeometry
    // For now, create a placeholder box
    const geometry = new THREE.BoxGeometry(size * text.length * 0.6, size, 0.2);
    const material = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData.text = text;
    return mesh;
  }

  static createSpring(radius = 0.5, length = 3, coils = 10) {
    const curve = new THREE.CatmullRomCurve3([]);
    const points = [];
    
    for (let i = 0; i <= coils * 20; i++) {
      const t = i / (coils * 20);
      const angle = t * coils * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = t * length - length / 2;
      points.push(new THREE.Vector3(x, y, z));
    }
    
    curve.points = points;
    const geometry = new THREE.TubeGeometry(curve, 100, 0.05, 8, false);
    const material = new THREE.MeshStandardMaterial({ color: 0x888888 });
    return new THREE.Mesh(geometry, material);
  }

  static createGear(radius = 1, teeth = 12, thickness = 0.2) {
    const shape = new THREE.Shape();
    const outerRadius = radius;
    const innerRadius = radius * 0.8;
    const toothHeight = radius * 0.2;
    
    for (let i = 0; i < teeth; i++) {
      const angle1 = (i / teeth) * Math.PI * 2;
      const angle2 = ((i + 0.5) / teeth) * Math.PI * 2;
      const angle3 = ((i + 1) / teeth) * Math.PI * 2;
      
      if (i === 0) {
        shape.moveTo(
          Math.cos(angle1) * outerRadius,
          Math.sin(angle1) * outerRadius
        );
      }
      
      // Tooth
      shape.lineTo(
        Math.cos(angle1) * (outerRadius + toothHeight),
        Math.sin(angle1) * (outerRadius + toothHeight)
      );
      shape.lineTo(
        Math.cos(angle2) * (outerRadius + toothHeight),
        Math.sin(angle2) * (outerRadius + toothHeight)
      );
      shape.lineTo(
        Math.cos(angle3) * outerRadius,
        Math.sin(angle3) * outerRadius
      );
    }
    
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: false
    });
    
    const material = new THREE.MeshStandardMaterial({ color: 0x666666 });
    return new THREE.Mesh(geometry, material);
  }
}
