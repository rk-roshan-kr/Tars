"use strict";

// 3D Planet Class
class Planet3D {
    constructor(container, planetType, color) {
        this.container = container;
        this.planetType = planetType;
        this.color = color;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.planet = null;
        this.isRotating = true;
        
        this.init();
    }
    
    init() {
        console.log('Initializing 3D planet:', this.planetType);
        
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.camera.position.z = 3;
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        this.renderer.setSize(200, 200);
        this.renderer.setClearColor(0x000000, 0);
        
        // Make canvas visible
        this.renderer.domElement.style.display = 'block';
        this.renderer.domElement.style.background = 'rgba(255, 0, 0, 0.1)';
        
        this.container.appendChild(this.renderer.domElement);
        console.log('Renderer created and appended for:', this.planetType);
        
        // Create planet
        this.createPlanet();
        
        // Add lighting
        this.addLighting();
        
        // Start animation
        this.animate();
        
        // Add mouse interaction
        this.addMouseInteraction();
    }
    
    createPlanet() {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        
        // Create different materials based on planet type
        let material;
        switch(this.planetType) {
            case 'mars':
                material = new THREE.MeshPhongMaterial({
                    color: this.color || 0xcd5c5c,
                    shininess: 30,
                    specular: 0x111111
                });
                break;
            case 'jupiter':
                material = new THREE.MeshPhongMaterial({
                    color: this.color || 0xffa500,
                    shininess: 50,
                    specular: 0x222222
                });
                break;
            case 'saturn':
                material = new THREE.MeshPhongMaterial({
                    color: this.color || 0xffd700,
                    shininess: 40,
                    specular: 0x333333
                });
                this.createRings();
                break;
            case 'neptune':
                material = new THREE.MeshPhongMaterial({
                    color: this.color || 0x4169e1,
                    shininess: 60,
                    specular: 0x444444
                });
                break;
            case 'venus':
                material = new THREE.MeshPhongMaterial({
                    color: this.color || 0xffc649,
                    shininess: 80,
                    specular: 0x555555
                });
                break;
            default:
                material = new THREE.MeshPhongMaterial({
                    color: this.color || 0x888888,
                    shininess: 30
                });
        }
        
        this.planet = new THREE.Mesh(geometry, material);
        this.scene.add(this.planet);
        
        // Add surface details for some planets
        this.addSurfaceDetails();
    }
    
    createRings() {
        if (this.planetType === 'saturn') {
            const ringGeometry = new THREE.RingGeometry(1.2, 1.8, 64);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xaaaaaa,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.6
            });
            const rings = new THREE.Mesh(ringGeometry, ringMaterial);
            rings.rotation.x = Math.PI / 2;
            this.scene.add(rings);
        }
    }
    
    addSurfaceDetails() {
        // Add some surface variation for certain planets
        if (this.planetType === 'mars' || this.planetType === 'jupiter') {
            const detailGeometry = new THREE.SphereGeometry(1.01, 32, 32);
            const detailMaterial = new THREE.MeshPhongMaterial({
                color: this.planetType === 'mars' ? 0x8b4513 : 0xff4500,
                transparent: true,
                opacity: 0.3
            });
            const details = new THREE.Mesh(detailGeometry, detailMaterial);
            this.scene.add(details);
        }
    }
    
    addLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 3, 5);
        this.scene.add(directionalLight);
        
        // Point light for more dramatic effect
        const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
        pointLight.position.set(-5, -3, -5);
        this.scene.add(pointLight);
    }
    
    addMouseInteraction() {
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        
        this.renderer.domElement.addEventListener('mousedown', (e) => {
            isDragging = true;
            this.isRotating = false;
        });
        
        this.renderer.domElement.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaMove = {
                    x: e.clientX - previousMousePosition.x,
                    y: e.clientY - previousMousePosition.y
                };
                
                if (this.planet) {
                    this.planet.rotation.y += deltaMove.x * 0.01;
                    this.planet.rotation.x += deltaMove.y * 0.01;
                }
            }
            
            previousMousePosition = {
                x: e.clientX,
                y: e.clientY
            };
        });
        
        this.renderer.domElement.addEventListener('mouseup', () => {
            isDragging = false;
            setTimeout(() => {
                this.isRotating = true;
            }, 2000);
        });
        
        // Touch events for mobile
        this.renderer.domElement.addEventListener('touchstart', () => {
            this.isRotating = false;
        });
        
        this.renderer.domElement.addEventListener('touchend', () => {
            setTimeout(() => {
                this.isRotating = true;
            }, 2000);
        });
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.isRotating && this.planet) {
            this.planet.rotation.y += 0.005;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    resize(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    
    destroy() {
        this.container.removeChild(this.renderer.domElement);
        this.renderer.dispose();
    }
}

// Original navigation functionality
document.addEventListener("DOMContentLoaded", function() {
  console.log('DOMContentLoaded fired - JavaScript is running!');
  
  // Simple visual indicator that JS is working
  const indicator = document.createElement('div');
  indicator.style.position = 'fixed';
  indicator.style.top = '10px';
  indicator.style.right = '10px';
  indicator.style.background = 'green';
  indicator.style.color = 'white';
  indicator.style.padding = '5px';
  indicator.style.zIndex = '10000';
  indicator.innerHTML = 'JS Running';
  document.body.appendChild(indicator);
  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");

  if (next && prev) {
    next.addEventListener("click", function () {
      let items = document.querySelectorAll(".item");
      if (items.length > 0) {
        document.querySelector(".slide").appendChild(items[0]);
      }
    });

    prev.addEventListener("click", function () {
      let items = document.querySelectorAll(".item");
      if (items.length > 0) {
        document.querySelector(".slide").prepend(items[items.length - 1]);
      }
    });
  }
  
  // Initialize 3D planets
  const planet3DContainers = document.querySelectorAll('.planet-3d');
  const planets = [];
  
  console.log('Found 3D planet containers:', planet3DContainers.length);
  console.log('Three.js available:', typeof THREE !== 'undefined');
  
  // Simple fallback test - create colored circles
  planet3DContainers.forEach(container => {
    const planetType = container.dataset.planet;
    const color = container.dataset.color;
    
    // Create a simple colored div as fallback
    const fallbackDiv = document.createElement('div');
    fallbackDiv.style.width = '100%';
    fallbackDiv.style.height = '100%';
    fallbackDiv.style.borderRadius = '50%';
    fallbackDiv.style.backgroundColor = color || '#888888';
    fallbackDiv.style.display = 'flex';
    fallbackDiv.style.alignItems = 'center';
    fallbackDiv.style.justifyContent = 'center';
    fallbackDiv.style.color = 'white';
    fallbackDiv.style.fontSize = '14px';
    fallbackDiv.innerHTML = planetType.toUpperCase();
    
    container.appendChild(fallbackDiv);
    console.log('Created fallback planet:', planetType, 'with color:', color);
  });
  
  // Check if Three.js is loaded before trying 3D
  if (typeof THREE !== 'undefined') {
    planet3DContainers.forEach(container => {
      // Remove fallback first
      container.innerHTML = '';
      
      const planetType = container.dataset.planet;
      const color = container.dataset.color;
      console.log('Creating 3D planet:', planetType, 'with color:', color);
      try {
        const planet = new Planet3D(container, planetType, color);
        planets.push(planet);
        console.log('3D Planet created successfully:', planetType);
      } catch (error) {
        console.error('Error creating 3D planet:', planetType, error);
        // Restore fallback on error
        const fallbackDiv = document.createElement('div');
        fallbackDiv.style.width = '100%';
        fallbackDiv.style.height = '100%';
        fallbackDiv.style.borderRadius = '50%';
        fallbackDiv.style.backgroundColor = color || '#888888';
        fallbackDiv.style.display = 'flex';
        fallbackDiv.style.alignItems = 'center';
        fallbackDiv.style.justifyContent = 'center';
        fallbackDiv.style.color = 'white';
        fallbackDiv.style.fontSize = '14px';
        fallbackDiv.innerHTML = planetType.toUpperCase();
        container.appendChild(fallbackDiv);
      }
    });
  } else {
    console.error('Three.js library not loaded! Using fallback planets.');
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    planets.forEach(planet => {
      planet.resize(200, 200);
    });
  });
  
  // Store planets globally for access
  window.planet3DInstances = planets;
});
