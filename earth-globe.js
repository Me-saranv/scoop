// SCOOP INNOVATIONS - Home hero: realistic 3D digital Earth (WebGL / Three.js)
// Real spherical geometry, NASA night-lights texture, Fresnel atmosphere glow,
// upper-right directional key light, glowing city nodes, animated connection
// arcs, an orbital energy trail, and a floating particle field.
// Falls back to the existing static SVG globe if WebGL/Three.js is unavailable.

(function () {
    var THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    var EARTH_TEX = 'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg';
    var BUMP_TEX = 'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png';

    var CITIES = [
        { lat: 40.71, lon: -74.01 },   // New York
        { lat: 51.51, lon: -0.13 },    // London
        { lat: 50.11, lon: 8.68 },     // Frankfurt
        { lat: 25.20, lon: 55.27 },    // Dubai
        { lat: 19.08, lon: 72.88 },    // Mumbai
        { lat: 13.08, lon: 80.27 },    // Chennai
        { lat: 1.35, lon: 103.82 },    // Singapore
        { lat: 35.68, lon: 139.69 },   // Tokyo
        { lat: -33.87, lon: 151.21 },  // Sydney
        { lat: -23.55, lon: -46.63 },  // Sao Paulo
        { lat: -26.20, lon: 28.05 }    // Johannesburg
    ];
    var ARCS = [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [9, 10], [0, 9]
    ];

    var raf = null;
    var cleanupFn = null;
    var resizeObserver = null;

    function hasWebGL() {
        try {
            var c = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
        } catch (e) { return false; }
    }

    function teardown() {
        if (raf) cancelAnimationFrame(raf);
        raf = null;
        if (cleanupFn) { cleanupFn(); cleanupFn = null; }
        if (resizeObserver) { resizeObserver.disconnect(); resizeObserver = null; }
    }

    function latLonToVec3(THREE, lat, lon, radius) {
        var phi = (90 - lat) * (Math.PI / 180);
        var theta = (lon + 180) * (Math.PI / 180);
        return new THREE.Vector3(
            -radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );
    }

    function makeGlowSprite(THREE, colorHex, size) {
        var canvas = document.createElement('canvas');
        canvas.width = canvas.height = 128;
        var ctx = canvas.getContext('2d');
        var grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, colorHex + 'ff');
        grad.addColorStop(0.35, colorHex + '99');
        grad.addColorStop(1, colorHex + '00');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);
        var tex = new THREE.CanvasTexture(canvas);
        var mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
        var sprite = new THREE.Sprite(mat);
        sprite.scale.set(size, size, 1);
        return sprite;
    }

    function buildArcCurve(THREE, p1, p2, radius) {
        var angle = p1.angleTo(p2);
        var mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(radius * (1 + 0.34 * (angle / Math.PI)));
        return new THREE.QuadraticBezierCurve3(p1.clone(), mid, p2.clone());
    }

    function orbitPoint(THREE, radius, angle, tilt) {
        var v = new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
        v.applyAxisAngle(new THREE.Vector3(1, 0, 0), tilt);
        v.applyAxisAngle(new THREE.Vector3(0, 0, 1), 0.24);
        return v;
    }

    function buildEarth() {
        var THREE = window.THREE;
        var mount = document.getElementById('earth-3d-mount');
        if (!mount || !THREE || !hasWebGL()) return;

        teardown();

        var width = mount.clientWidth || 480;
        var height = mount.clientHeight || 480;
        var radius = 1.86;

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
        camera.position.set(0, 0, 6.8);

        var renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch (e) { return; }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        if (renderer.outputEncoding !== undefined) renderer.outputEncoding = THREE.sRGBEncoding;

        // Only swap in the canvas once we know WebGL init succeeded.
        mount.innerHTML = '';
        mount.appendChild(renderer.domElement);

        // ---- Lighting: bright key light from the upper-right, soft ambient fill ----
        var ambient = new THREE.AmbientLight(0x1c2f52, 0.75);
        scene.add(ambient);

        var keyLight = new THREE.DirectionalLight(0xcfeeff, 1.75);
        keyLight.position.set(4.2, 3.4, 4.6);
        scene.add(keyLight);

        var rimLight = new THREE.PointLight(0x2f6bff, 1.1, 20);
        rimLight.position.set(-4, -2, -3.5);
        scene.add(rimLight);

        var earthGroup = new THREE.Group();
        scene.add(earthGroup);

        // ---- Earth sphere with real night-lights texture (navy oceans, glowing cities) ----
        var loader = new THREE.TextureLoader();
        loader.crossOrigin = 'anonymous';
        var earthTex = loader.load(EARTH_TEX);
        if (earthTex.encoding !== undefined) earthTex.encoding = THREE.sRGBEncoding;
        earthTex.anisotropy = 4;
        var bumpTex = loader.load(BUMP_TEX);

        var earthGeo = new THREE.SphereGeometry(radius, 96, 96);
        var earthMat = new THREE.MeshPhongMaterial({
            map: earthTex,
            bumpMap: bumpTex,
            bumpScale: 0.03,
            specular: new THREE.Color(0x2a4a78),
            shininess: 10,
            emissiveMap: earthTex,
            emissive: new THREE.Color(0xffffff),
            emissiveIntensity: 0.45
        });
        var earthMesh = new THREE.Mesh(earthGeo, earthMat);
        earthGroup.add(earthMesh);

        // ---- Fresnel atmosphere rim glow ----
        var atmoUniforms = {
            glowColor: { value: new THREE.Color(0x7bf1fb) }
        };
        var atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(radius * 1.09, 64, 64),
            new THREE.ShaderMaterial({
                uniforms: atmoUniforms,
                vertexShader: [
                    'varying vec3 vNormal;',
                    'varying vec3 vPosW;',
                    'void main() {',
                    '  vNormal = normalize(normalMatrix * normal);',
                    '  vec4 wp = modelMatrix * vec4(position, 1.0);',
                    '  vPosW = wp.xyz;',
                    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
                    '}'
                ].join('\n'),
                fragmentShader: [
                    'uniform vec3 glowColor;',
                    'varying vec3 vNormal;',
                    'varying vec3 vPosW;',
                    'void main() {',
                    '  vec3 viewDir = normalize(cameraPosition - vPosW);',
                    '  float intensity = pow(0.62 - dot(vNormal, viewDir), 2.1);',
                    '  gl_FragColor = vec4(glowColor, clamp(intensity, 0.0, 1.0) * 0.5);',
                    '}'
                ].join('\n'),
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                transparent: true,
                depthWrite: false
            })
        );
        earthGroup.add(atmosphere);

        // ---- City nodes ----
        var cityVecs = CITIES.map(function (c) { return latLonToVec3(THREE, c.lat, c.lon, radius * 1.004); });
        cityVecs.forEach(function (v) {
            var dot = new THREE.Mesh(
                new THREE.SphereGeometry(radius * 0.014, 10, 10),
                new THREE.MeshBasicMaterial({ color: 0xbdf6ff })
            );
            dot.position.copy(v);
            earthGroup.add(dot);

            var glow = makeGlowSprite(THREE, '#7bf1fb', radius * 0.16);
            glow.position.copy(v);
            earthGroup.add(glow);
        });

        // ---- Animated connection arcs between cities ----
        var arcPulses = [];
        ARCS.forEach(function (pair, idx) {
            var p1 = cityVecs[pair[0]];
            var p2 = cityVecs[pair[1]];
            if (!p1 || !p2) return;
            var curve = buildArcCurve(THREE, p1, p2, radius);
            var pts = curve.getPoints(48);
            var lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
            var line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({
                color: 0x2fe0f0, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending
            }));
            earthGroup.add(line);

            var pulse = makeGlowSprite(THREE, '#e8fbff', radius * 0.1);
            earthGroup.add(pulse);
            arcPulses.push({ curve: curve, sprite: pulse, phase: idx / ARCS.length, speed: 0.09 + (idx % 3) * 0.02 });
        });

        // ---- Circular orbital energy trail ----
        var orbitRadius = radius * 1.5;
        var orbitTilt = 0.36;
        var orbitPts = [];
        for (var oi = 0; oi <= 96; oi++) {
            orbitPts.push(orbitPoint(THREE, orbitRadius, (oi / 96) * Math.PI * 2, orbitTilt));
        }
        var orbitLine = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(orbitPts),
            new THREE.LineBasicMaterial({ color: 0x2f6bff, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending })
        );
        earthGroup.add(orbitLine);

        var trailCount = 10;
        var trailSprites = [];
        for (var ti = 0; ti < trailCount; ti++) {
            var s = makeGlowSprite(THREE, ti === 0 ? '#ffffff' : '#7bf1fb', radius * (ti === 0 ? 0.16 : 0.11 - ti * 0.006));
            s.material.opacity = 1 - (ti / trailCount);
            earthGroup.add(s);
            trailSprites.push(s);
        }

        // ---- Floating particle field around the globe ----
        var particleCount = 260;
        var positions = new Float32Array(particleCount * 3);
        for (var i = 0; i < particleCount; i++) {
            var r = radius * 1.9 + Math.random() * radius * 1.6;
            var theta = Math.random() * Math.PI * 2;
            var phi = Math.acos(Math.random() * 2 - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        var particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        var particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({
            color: 0x7bf1fb, size: radius * 0.018, transparent: true, opacity: 0.55, sizeAttenuation: true
        }));
        scene.add(particles);

        // Gentle default orientation so the Atlantic + Africa/Europe face the viewer
        earthGroup.rotation.y = -1.1;
        earthGroup.rotation.x = 0.12;

        // ---- Drag to rotate ----
        var dom = renderer.domElement;
        var dragging = false, lastX = 0, lastY = 0;
        var targetRotY = earthGroup.rotation.y, targetRotX = earthGroup.rotation.x;
        var rotY = targetRotY, rotX = targetRotX;

        function onDown(e) { dragging = true; lastX = e.clientX; lastY = e.clientY; mount.classList.add('dragging'); }
        function onMove(e) {
            if (!dragging) return;
            targetRotY += (e.clientX - lastX) * 0.006;
            targetRotX += (e.clientY - lastY) * 0.006;
            targetRotX = Math.max(-0.9, Math.min(0.9, targetRotX));
            lastX = e.clientX; lastY = e.clientY;
        }
        function onUp() { dragging = false; mount.classList.remove('dragging'); }
        dom.addEventListener('pointerdown', onDown);
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);

        function onResize() {
            var w = mount.clientWidth, h = mount.clientHeight;
            if (!w || !h) return;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
        window.addEventListener('resize', onResize);
        if (window.ResizeObserver) {
            resizeObserver = new ResizeObserver(onResize);
            resizeObserver.observe(mount);
        }

        var clock = new THREE.Clock();
        function animate() {
            raf = requestAnimationFrame(animate);
            var t = clock.getElapsedTime();

            rotY += (targetRotY - rotY) * 0.06;
            rotX += (targetRotX - rotX) * 0.06;
            earthGroup.rotation.y = rotY + (dragging ? 0 : t * 0.028);
            earthGroup.rotation.x = rotX;

            arcPulses.forEach(function (a) {
                var tp = (t * a.speed + a.phase) % 1;
                a.sprite.position.copy(a.curve.getPointAt(tp));
                a.sprite.material.opacity = Math.sin(tp * Math.PI);
            });

            var orbitAngle = t * 0.26;
            trailSprites.forEach(function (s, idx) {
                var a = orbitAngle - idx * 0.09;
                s.position.copy(orbitPoint(THREE, orbitRadius, a, orbitTilt));
            });

            particles.rotation.y += 0.0006;

            renderer.render(scene, camera);
        }
        animate();

        cleanupFn = function () {
            dom.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
        };
    }

    function init() {
        var mount = document.getElementById('earth-3d-mount');
        if (!mount) return; // not on the Home page
        if (!hasWebGL()) return; // keep the static SVG fallback already in the markup

        if (window.THREE) { buildEarth(); return; }
        var script = document.createElement('script');
        script.src = THREE_CDN;
        script.async = true;
        script.onload = buildEarth;
        script.onerror = function () {}; // fallback markup stays as-is
        document.head.appendChild(script);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
