/* =====================================================================
   IMAGINEERS: HERO RIBBON
   A glossy, twisting satin ribbon of light that drifts on the right of
   the hero (the same kind of object as the Stripe homepage wave),
   recoloured in the Imagineers green / blue / gold.
   ---------------------------------------------------------------------
   EDIT HERE: colours, speed, width, twist and number of strands.
   ===================================================================== */
const RIBBON = {
  /* Colours run along the ribbon from its tail (left) to its head (right).
     From the stitching in colors.jpg, plus the gold of the Imagineers logo. */
  colors: ["#0B2F86", "#1F5FD6", "#129F7D", "#2FA860", "#8FD08A", "#C9A23A"],
  strands: 3,      // how many ribbons are layered (1 – 4)
  width: 1.6,      // ribbon width: 0.7 = slimmer, 1.3 = wider
  twist: 0.2,      // how much it twists over itself
  speed: 1.1,      // 0.5 = calmer, 1.5 = livelier
  sheen: 0.8,      // satin highlight strength (0 – 1.5)
  glow: 1.0        // soft-focus glow behind the ribbon (0 = off)
};

/* ---------------- Engine (no edits needed) ---------------- */
(function () {
  const hex = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SEG = 260;                         // segments along the ribbon

  document.querySelectorAll("[data-ribbon]").forEach(wrap => {
    const glowCv = document.createElement("canvas");   // blurred copy = soft focus
    const cv = document.createElement("canvas");
    glowCv.className = "ribbon-glow";
    wrap.append(glowCv, cv);
    const gl = cv.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: true, preserveDrawingBuffer: true });
    if (!gl) { wrap.innerHTML = '<div class="ribbon-fallback"></div>'; return; }
    const g2 = glowCv.getContext("2d");

    const vs = `
      attribute vec3 pos; attribute vec3 nrm; attribute vec2 uv;
      varying vec3 vN; varying vec2 vUv; varying vec3 vP;
      void main(){ vN=nrm; vUv=uv; vP=pos; gl_Position=vec4(pos.xy, pos.z*.1, 1.); }`;
    const fs = `
      precision highp float;
      varying vec3 vN; varying vec2 vUv; varying vec3 vP;
      uniform vec3 c[6]; uniform float sheen, alpha, hueShift;
      vec3 ramp(float x){
        x=clamp(x,0.,1.)*5.;
        if(x<1.) return mix(c[0],c[1],x);
        if(x<2.) return mix(c[1],c[2],x-1.);
        if(x<3.) return mix(c[2],c[3],x-2.);
        if(x<4.) return mix(c[3],c[4],x-3.);
        return mix(c[4],c[5],x-4.);
      }
      void main(){
        vec3 n=normalize(vN); if(!gl_FrontFacing) n=-n;
        vec3 V=vec3(0.,0.,1.);
        vec3 L=normalize(vec3(-.35,.55,.75));
        float diff=.62+.5*max(dot(n,L),0.);
        vec3 H=normalize(L+V);
        float spec=pow(max(dot(n,H),0.),38.)*1.1+pow(max(dot(n,H),0.),6.)*.25;   /* satin: tight + broad */
        float fres=pow(1.-abs(dot(n,V)),2.5);
        float across=vUv.y;                          /* 0..1 across the width */
        vec3 base=ramp(.12+vUv.x*.88+hueShift+(across-.5)*.10)*1.18;
        vec3 col=base*diff + sheen*(spec*vec3(1.,.97,.9)) + fres*.35*base;
        float edge=smoothstep(0.,.08,across)*smoothstep(1.,.92,across);   /* soft edges */
        float tail=smoothstep(0.,.22,vUv.x)*smoothstep(1.,.80,vUv.x);       /* fade ends */
        float a=alpha*edge*tail;
        gl_FragColor=vec4(col*a, a);
      }`;
    const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { wrap.innerHTML = '<div class="ribbon-fallback"></div>'; return; }
    gl.useProgram(prog);
    const U = n => gl.getUniformLocation(prog, n);
    gl.uniform3fv(U("c"), new Float32Array(RIBBON.colors.flatMap(hex)));
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const N = (SEG + 1) * 2;
    const P = new Float32Array(N * 3), NR = new Float32Array(N * 3), UV = new Float32Array(N * 2);
    for (let i = 0; i <= SEG; i++) { UV[i * 4] = i / SEG; UV[i * 4 + 1] = 0; UV[i * 4 + 2] = i / SEG; UV[i * 4 + 3] = 1; }
    const mk = (arr, name, size) => { const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, arr, gl.DYNAMIC_DRAW);
      const l = gl.getAttribLocation(prog, name); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, size, gl.FLOAT, false, 0, 0); return b; };
    const bP = mk(P, "pos", 3), bN = mk(NR, "nrm", 3); mk(UV, "uv", 2);

    let aspect = 1;
    const size = () => { const r = wrap.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = glowCv.width = Math.max(1, r.width * d); cv.height = glowCv.height = Math.max(1, r.height * d);
      gl.viewport(0, 0, cv.width, cv.height); aspect = r.width / Math.max(1, r.height); };
    size(); window.addEventListener("resize", size);

    /* Centre line of one strand: a long S-curve sweeping from lower-left to upper-right */
    function centre(s, t, k) {
      const ph = k * 1.7;
      const x = -0.92 + s * 1.84;
      const y = -0.62 + s * 1.12
              + 0.30 * Math.sin(s * 3.1 + t * 0.55 + ph)
              + 0.10 * Math.sin(s * 7.0 - t * 0.8 + ph * 2.0);
      const z = 0.5 * Math.sin(s * 2.2 + t * 0.4 + ph);
      return [x, y, z];
    }

    function buildStrand(t, k) {
      const tw = RIBBON.twist, w0 = 0.27 * RIBBON.width * (1 - k * 0.18);
      for (let i = 0; i <= SEG; i++) {
        const s = i / SEG, e = 1e-3;
        const a = centre(s, t, k), b = centre(Math.min(1, s + e), t, k), a0 = centre(Math.max(0, s - e), t, k);
        let T = [b[0] - a0[0], b[1] - a0[1], b[2] - a0[2]]; const tl = Math.hypot(...T); T = T.map(v => v / tl);
        /* side vector: perpendicular in the screen plane, rotated around the tangent by the twist angle */
        let S = [-T[1], T[0], 0]; const sl = Math.hypot(...S) || 1; S = S.map(v => v / sl);
        const Z = [T[1] * S[2] - T[2] * S[1], T[2] * S[0] - T[0] * S[2], T[0] * S[1] - T[1] * S[0]];
        const ang = tw * (s * 4.2 + Math.sin(s * 2.5 + t * 0.6 + k) * 1.4) + t * 0.25 + k * 0.9;
        const ca = Math.cos(ang), sa = Math.sin(ang);
        const W = [S[0] * ca + Z[0] * sa, S[1] * ca + Z[1] * sa, S[2] * ca + Z[2] * sa];
        const nrm = [T[1] * W[2] - T[2] * W[1], T[2] * W[0] - T[0] * W[2], T[0] * W[1] - T[1] * W[0]];
        const half = w0 * (0.55 + 0.45 * Math.sin(Math.PI * s)) ;
        for (let side = 0; side < 2; side++) {
          const sg = side ? 1 : -1, j = (i * 2 + side) * 3;
          P[j] = (a[0] + W[0] * half * sg) * Math.min(1, 1.25 / aspect);
          P[j + 1] = a[1] + W[1] * half * sg;
          P[j + 2] = a[2] + W[2] * half * sg;
          NR[j] = nrm[0]; NR[j + 1] = nrm[1]; NR[j + 2] = nrm[2];
        }
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, bP); gl.bufferSubData(gl.ARRAY_BUFFER, 0, P);
      gl.bindBuffer(gl.ARRAY_BUFFER, bN); gl.bufferSubData(gl.ARRAY_BUFFER, 0, NR);
    }

    function draw(t) {
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      const n = Math.max(1, Math.min(4, RIBBON.strands | 0));
      for (let k = n - 1; k >= 0; k--) {
        buildStrand(t, k);
        gl.uniform1f(U("alpha"), k === 0 ? 0.95 : 0.55 - k * 0.1);
        gl.uniform1f(U("sheen"), RIBBON.sheen * (k === 0 ? 1 : 0.6));
        gl.uniform1f(U("hueShift"), k * 0.08);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, N);
      }
      if (RIBBON.glow > 0) { g2.clearRect(0, 0, glowCv.width, glowCv.height); g2.globalAlpha = Math.min(1, 0.75 * RIBBON.glow); g2.drawImage(cv, 0, 0); }
    }

    let visible = true; const start = performance.now(), offset = 4;
    new IntersectionObserver(e => { visible = e[0].isIntersecting; if (visible) loop(); }).observe(wrap);
    function loop() { draw(offset + (performance.now() - start) / 1000 * 0.35 * RIBBON.speed); if (visible && !reduced) requestAnimationFrame(loop); }
    loop();
  });
})();
