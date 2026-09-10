// SCOOP INNOVATIONS - 3D Digital Ecosystem Core
// Real WebGL (Three.js) visualization: a rotating modular "core" with the
// solution verticals orbiting it on tilted 3D rings, connected by live links.
// Falls back to a lightweight CSS dashboard if WebGL/Three.js is unavailable.

(function() {
    var THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    var raf = null;
    var cleanupFn = null;
    var resizeObserver = null;

    var VERTICALS = [
        { icon: '🏥', id: 'hospital',      r: 3.05, incl: 14,  speed: 0.26,  phase: 0.0 },
        { icon: '🎓', id: 'school',        r: 3.55, incl: -20, speed: -0.20, phase: 1.1 },
        { icon: '🏨', id: 'hotel',         r: 2.85, incl: 38,  speed: 0.19,  phase: 2.3 },
        { icon: '🛍️', id: 'retail',        r: 3.75, incl: -9,  speed: -0.23, phase: 3.6 },
        { icon: '⚙️', id: 'manufacturing', r: 3.3,  incl: 52,  speed: 0.16,  phase: 4.8 },
        { icon: '🚚', id: 'logistics',     r: 3.95, incl: -42, speed: -0.14, phase: 1.9 },
        { icon: '⚖️', id: 'legal',         r: 3.15, incl: 26,  speed: 0.21,  phase: 5.6 }
    ];

    function hasWebGL() {
        try {
            var c = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    function getCyan() {
        var v = getComputedStyle(document.documentElement).getPropertyValue('--scoop-cyan').trim();
        return v || '#00d2ff';
    }

    function teardown() {
        if (raf) cancelAnimationFrame(raf);
        raf = null;
        if (cleanupFn) { cleanupFn(); cleanupFn = null; }
        if (resizeObserver) { resizeObserver.disconnect(); resizeObserver = null; }
    }

    function makeEmojiSprite(THREE, emoji, size) {
        var canvas = document.createElement('canvas');
        canvas.width = canvas.height = 128;
        var ctx = canvas.getContext('2d');
        ctx.font = '86px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, 64, 70);
        var tex = new THREE.CanvasTexture(canvas);
        var mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
        var sprite = new THREE.Sprite(mat);
        sprite.scale.set(size, size, 1);
        return sprite;
    }

    function makeGlowSprite(THREE, colorHex, size) {
        var canvas = document.createElement('canvas');
        canvas.width = canvas.height = 256;
        var ctx = canvas.getContext('2d');
        var grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        grad.addColorStop(0, colorHex + 'ff');
        grad.addColorStop(0.35, colorHex + '88');
        grad.addColorStop(1, colorHex + '00');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 256, 256);
        var tex = new THREE.CanvasTexture(canvas);
        var mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
        var sprite = new THREE.Sprite(mat);
        sprite.scale.set(size, size, 1);
        return sprite;
    }

    function buildEcosystemCore() {
        var THREE = window.THREE;
        var container = document.getElementById('hero-3d-canvas');
        if (!container || !THREE || !hasWebGL()) {
            buildDashboardCanvas();
            return;
        }

        teardown();
        container.innerHTML = '';

        var width = container.clientWidth || 400;
        var height = container.clientHeight || 400;

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, 9.2);

        var renderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch (e) {
            buildDashboardCanvas();
            return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;cursor:grab;';
        container.appendChild(renderer.domElement);

        var cyanHex = getCyan();
        var cyan = new THREE.Color(cyanHex);

        var group = new THREE.Group();
        scene.add(group);

        // Glowing core
        group.add(makeGlowSprite(THREE, cyanHex, 3.4));

        var coreGeo = new THREE.IcosahedronGeometry(1.55, 1);
        var coreWire = new THREE.LineSegments(
            new THREE.EdgesGeometry(coreGeo),
            new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: 0.9 })
        );
        group.add(coreWire);

        var coreFill = new THREE.Mesh(
            coreGeo,
            new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: 0.05, blending: THREE.AdditiveBlending })
        );
        group.add(coreFill);

        // Orbit nodes: one per solution vertical, tilted 3D rings + live links to core
        var nodeObjs = VERTICALS.map(function(v) {
            var sprite = makeEmojiSprite(THREE, v.icon, 0.8);
            group.add(sprite);

            var dot = new THREE.Mesh(
                new THREE.SphereGeometry(0.045, 8, 8),
                new THREE.MeshBasicMaterial({ color: cyan })
            );
            group.add(dot);

            var lineGeo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)
            ]);
            var line = new THREE.Line(
                lineGeo,
                new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: 0.3 })
            );
            group.add(line);

            return { sprite: sprite, dot: dot, line: line, v: v };
        });

        // Ambient particle field for depth
        var particleCount = 220;
        var positions = new Float32Array(particleCount * 3);
        for (var i = 0; i < particleCount; i++) {
            var r = 6 + Math.random() * 6;
            var theta = Math.random() * Math.PI * 2;
            var phi = Math.acos(Math.random() * 2 - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        var particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        var particles = new THREE.Points(
            particleGeo,
            new THREE.PointsMaterial({ color: cyan, size: 0.045, transparent: true, opacity: 0.45, sizeAttenuation: true })
        );
        scene.add(particles);

        // Drag-to-rotate + hover/click on nodes
        var dom = renderer.domElement;
        var dragging = false, moved = false, lastX = 0, lastY = 0;
        var rotY = 0.35, rotX = 0.12, targetRotY = rotY, targetRotX = rotX;
        var raycaster = new THREE.Raycaster();
        var pointer = new THREE.Vector2();

        function onPointerDown(e) {
            dragging = true; moved = false;
            lastX = e.clientX; lastY = e.clientY;
            dom.style.cursor = 'grabbing';
        }
        function onPointerMove(e) {
            if (!dragging) return;
            var dx = e.clientX - lastX, dy = e.clientY - lastY;
            if (Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
            targetRotY += dx * 0.005;
            targetRotX += dy * 0.005;
            targetRotX = Math.max(-0.85, Math.min(0.85, targetRotX));
            lastX = e.clientX; lastY = e.clientY;
        }
        function onPointerUp(e) {
            dragging = false;
            dom.style.cursor = 'grab';
            if (!moved) {
                var rect = dom.getBoundingClientRect();
                pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                raycaster.setFromCamera(pointer, camera);
                var hit = raycaster.intersectObjects(nodeObjs.map(function(n) { return n.sprite; }));
                if (hit.length) {
                    var found = nodeObjs.filter(function(n) { return n.sprite === hit[0].object; })[0];
                    if (found && window.highlightSolutionCard) window.highlightSolutionCard(found.v.id);
                }
            }
        }

        dom.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);

        function onResize() {
            var w = container.clientWidth, h = container.clientHeight;
            if (!w || !h) return;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
        window.addEventListener('resize', onResize);
        if (window.ResizeObserver) {
            resizeObserver = new ResizeObserver(onResize);
            resizeObserver.observe(container);
        }

        var clock = new THREE.Clock();
        function animate() {
            raf = requestAnimationFrame(animate);
            var t = clock.getElapsedTime();

            rotY += (targetRotY - rotY) * 0.06;
            rotX += (targetRotX - rotX) * 0.06;
            group.rotation.y = rotY + t * 0.045;
            group.rotation.x = rotX;

            coreWire.rotation.y += 0.0018;
            coreWire.rotation.x += 0.0009;
            coreFill.rotation.copy(coreWire.rotation);

            nodeObjs.forEach(function(n) {
                var v = n.v;
                var angle = t * v.speed + v.phase;
                var inclRad = v.incl * Math.PI / 180;
                var x = Math.cos(angle) * v.r;
                var zBase = Math.sin(angle) * v.r;
                var y = zBase * Math.sin(inclRad);
                var z = zBase * Math.cos(inclRad);
                n.sprite.position.set(x, y, z);
                n.dot.position.set(x, y, z);
                var pos = n.line.geometry.attributes.position;
                pos.setXYZ(1, x, y, z);
                pos.needsUpdate = true;
            });

            particles.rotation.y += 0.0004;

            renderer.render(scene, camera);
        }
        animate();

        cleanupFn = function() {
            dom.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
        };
    }

    // ---- Fallback: lightweight CSS orbit dashboard (used if WebGL/Three.js fails) ----
    function buildDashboardCanvas() {
        teardown();
        var container = document.getElementById('hero-3d-canvas');
        if (!container) return;
        container.innerHTML = '';

        var wrapper = document.createElement('div');
        wrapper.className = 'tech-dashboard-wrapper';
        wrapper.style.cssText = 'width:100%;height:100%;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:20px;box-sizing:border-box;overflow:hidden;';

        var orbitContainer = document.createElement('div');
        orbitContainer.style.cssText = 'position:relative;width:240px;height:240px;display:flex;align-items:center;justify-content:center;flex-shrink:0;';

        var centerNode = document.createElement('div');
        centerNode.style.cssText = 'position:absolute;width:68px;height:68px;background:radial-gradient(circle,#00d2ff 0%,#0284c7 60%,transparent 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;z-index:10;box-shadow:0 0 30px rgba(0,210,255,0.7),0 0 60px rgba(0,210,255,0.3);animation:scoopPulse 2.5s ease-in-out infinite;';
        centerNode.textContent = 'S';
        centerNode.style.color = '#fff';
        centerNode.style.fontWeight = '900';
        centerNode.style.fontFamily = 'Plus Jakarta Sans, sans-serif';
        centerNode.style.fontSize = '1.6rem';
        centerNode.style.letterSpacing = '-0.02em';
        orbitContainer.appendChild(centerNode);

        var orbitData = [
            { size: 100, speed: 7,  icon: '🏥' },
            { size: 145, speed: 11, icon: '🎓' },
            { size: 190, speed: 15, icon: '⚙️' },
        ];
        orbitData.forEach(function(od, idx) {
            var ring = document.createElement('div');
            ring.style.cssText = 'position:absolute;width:' + od.size + 'px;height:' + od.size + 'px;border:1.5px solid rgba(0,210,255,' + (0.38 - idx * 0.08) + ');border-radius:50%;animation:orbitRotate ' + od.speed + 's linear infinite ' + (idx % 2 === 0 ? '' : 'reverse') + ';';
            var dot = document.createElement('div');
            dot.style.cssText = 'position:absolute;top:-13px;left:50%;transform:translateX(-50%);width:26px;height:26px;background:var(--bg-card,rgba(10,20,40,0.85));border:1px solid rgba(0,210,255,0.55);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 0 10px rgba(0,210,255,0.4);';
            dot.textContent = od.icon;
            ring.appendChild(dot);
            orbitContainer.appendChild(ring);
        });

        wrapper.appendChild(orbitContainer);

        var statsGrid = document.createElement('div');
        statsGrid.style.cssText = 'display:grid;grid-template-columns:repeat(2,1fr);gap:10px;width:100%;max-width:300px;';

        var stats = [
            { icon: '🏥', label: 'Healthcare', value: 'HMS + LIMS' },
            { icon: '🎓', label: 'Education', value: 'Campus ERP' },
            { icon: '🛍️', label: 'Commerce', value: 'Retail & POS' },
            { icon: '⚙️', label: 'Industry', value: 'MFG + Textile' },
        ];

        stats.forEach(function(stat, i) {
            var card = document.createElement('div');
            card.style.cssText = 'background:var(--bg-card,rgba(255,255,255,0.05));border:1px solid rgba(0,210,255,0.2);border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:8px;animation:slideInRight 0.5s ease ' + (i * 0.1) + 's both;cursor:default;transition:border-color 0.25s,box-shadow 0.25s;';
            card.addEventListener('mouseenter', function() { card.style.borderColor = 'rgba(0,210,255,0.6)'; card.style.boxShadow = '0 0 16px rgba(0,210,255,0.2)'; });
            card.addEventListener('mouseleave', function() { card.style.borderColor = 'rgba(0,210,255,0.2)'; card.style.boxShadow = 'none'; });
            card.innerHTML = '<span style="font-size:18px;">' + stat.icon + '</span><div><div style="font-size:0.68rem;color:var(--text-muted,#64748b);font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">' + stat.label + '</div><div style="font-size:0.8rem;color:#00d2ff;font-weight:700;">' + stat.value + '</div></div>';
            statsGrid.appendChild(card);
        });
        wrapper.appendChild(statsGrid);

        var counterStrip = document.createElement('div');
        counterStrip.style.cssText = 'display:flex;gap:24px;justify-content:center;width:100%;';
        var counterItems = [
            { target: 10, suffix: '', label: 'Solutions' },
            { target: 100, suffix: '%', label: 'Modular' },
        ];
        counterItems.forEach(function(ci) {
            var item = document.createElement('div');
            item.style.cssText = 'text-align:center;';
            var val = document.createElement('div');
            val.style.cssText = 'font-size:1.6rem;font-weight:800;color:#00d2ff;line-height:1;font-family:JetBrains Mono,monospace;';
            val.textContent = '0' + ci.suffix;
            var lbl = document.createElement('div');
            lbl.style.cssText = 'font-size:0.68rem;color:var(--text-muted,#94a3b8);text-transform:uppercase;letter-spacing:0.07em;margin-top:3px;';
            lbl.textContent = ci.label;
            item.appendChild(val);
            item.appendChild(lbl);
            counterStrip.appendChild(item);

            var start = 0;
            var step = function() {
                start++;
                val.textContent = start + ci.suffix;
                if (start < ci.target) setTimeout(step, 60);
            };
            setTimeout(step, 900);
        });
        wrapper.appendChild(counterStrip);

        container.appendChild(wrapper);

        if (!document.getElementById('tech-dash-kf')) {
            var style = document.createElement('style');
            style.id = 'tech-dash-kf';
            style.textContent = '@keyframes scoopPulse{0%,100%{box-shadow:0 0 30px rgba(0,210,255,.7),0 0 60px rgba(0,210,255,.3);transform:scale(1);}50%{box-shadow:0 0 50px rgba(0,210,255,.95),0 0 90px rgba(0,210,255,.5);transform:scale(1.07);}}@keyframes orbitRotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}@keyframes slideInRight{from{opacity:0;transform:translateX(16px);}to{opacity:1;transform:translateX(0);}}';
            document.head.appendChild(style);
        }
    }

    function loadThreeAndBuild() {
        if (window.THREE) { buildEcosystemCore(); return; }
        var script = document.createElement('script');
        script.src = THREE_CDN;
        script.async = true;
        script.onload = buildEcosystemCore;
        script.onerror = buildDashboardCanvas;
        document.head.appendChild(script);
    }

    window.update3DTheme = function() {
        if (window.THREE) {
            buildEcosystemCore();
        } else {
            buildDashboardCanvas();
        }
    };

    function init() {
        if (hasWebGL()) {
            loadThreeAndBuild();
        } else {
            buildDashboardCanvas();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
