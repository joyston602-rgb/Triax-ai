import * as THREE from 'three';

export class MeasurementTool {
  constructor(scene) {
    this.scene = scene;
    this.measurements = [];
    this.isActive = false;
    this.measurementType = 'distance';
    this.points = [];
    this.tempLine = null;
  }

  setMeasurementType(type) {
    this.measurementType = type;
    this.clearTemp();
  }

  activate() {
    this.isActive = true;
    this.points = [];
    this.clearTemp();
  }

  deactivate() {
    this.isActive = false;
    this.clearTemp();
    this.points = [];
  }

  clearTemp() {
    if (this.tempLine) {
      this.scene.remove(this.tempLine);
      this.tempLine = null;
    }
  }

  clearAllMeasurements() {
    this.measurements.forEach(measurement => {
      this.scene.remove(measurement.line);
      if (measurement.label) {
        this.scene.remove(measurement.label);
      }
    });
    this.measurements = [];
  }

  addPoint(point) {
    if (!this.isActive) return;

    this.points.push(point.clone());

    if (this.measurementType === 'distance' && this.points.length === 2) {
      this.createDistanceMeasurement();
    } else if (this.measurementType === 'angle' && this.points.length === 3) {
      this.createAngleMeasurement();
    }
  }

  createDistanceMeasurement() {
    const [point1, point2] = this.points;
    const distance = point1.distanceTo(point2);

    // Create line
    const geometry = new THREE.BufferGeometry().setFromPoints([point1, point2]);
    const material = new THREE.LineBasicMaterial({ 
      color: 0xff0000, 
      linewidth: 2 
    });
    const line = new THREE.Line(geometry, material);

    // Create label (simplified - in a real app you'd use HTML labels or sprites)
    const midPoint = new THREE.Vector3().addVectors(point1, point2).multiplyScalar(0.5);
    const labelGeometry = new THREE.SphereGeometry(0.05);
    const labelMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.copy(midPoint);
    label.userData = { 
      type: 'measurement-label', 
      text: `${distance.toFixed(2)} units` 
    };

    this.scene.add(line);
    this.scene.add(label);

    this.measurements.push({
      type: 'distance',
      line,
      label,
      points: [...this.points],
      value: distance
    });

    console.log(`Distance: ${distance.toFixed(2)} units`);
    this.points = [];
  }

  createAngleMeasurement() {
    const [point1, point2, point3] = this.points;
    
    // Calculate angle
    const v1 = new THREE.Vector3().subVectors(point1, point2);
    const v2 = new THREE.Vector3().subVectors(point3, point2);
    const angle = v1.angleTo(v2) * (180 / Math.PI);

    // Create angle arc (simplified)
    const curve = new THREE.EllipseCurve(
      point2.x, point2.z,
      0.5, 0.5,
      0, angle * (Math.PI / 180),
      false,
      0
    );

    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(
      points.map(p => new THREE.Vector3(p.x, point2.y, p.y))
    );
    
    const material = new THREE.LineBasicMaterial({ 
      color: 0x00ff00, 
      linewidth: 2 
    });
    const line = new THREE.Line(geometry, material);

    // Create label
    const labelGeometry = new THREE.SphereGeometry(0.05);
    const labelMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.copy(point2);
    label.userData = { 
      type: 'measurement-label', 
      text: `${angle.toFixed(1)}°` 
    };

    this.scene.add(line);
    this.scene.add(label);

    this.measurements.push({
      type: 'angle',
      line,
      label,
      points: [...this.points],
      value: angle
    });

    console.log(`Angle: ${angle.toFixed(1)}°`);
    this.points = [];
  }

  updateTempLine(currentPoint) {
    if (!this.isActive || this.points.length === 0) return;

    this.clearTemp();

    if (this.measurementType === 'distance' && this.points.length === 1) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        this.points[0], 
        currentPoint
      ]);
      const material = new THREE.LineBasicMaterial({ 
        color: 0xffff00, 
        opacity: 0.5, 
        transparent: true 
      });
      this.tempLine = new THREE.Line(geometry, material);
      this.scene.add(this.tempLine);
    }
  }

  getMeasurements() {
    return this.measurements.map(m => ({
      type: m.type,
      value: m.value,
      points: m.points
    }));
  }
}
