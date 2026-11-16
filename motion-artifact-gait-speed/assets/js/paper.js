/* Paper site interactions. No dependencies. */
(function () {
    'use strict';

    var $ = function (s, r) { return (r || document).querySelector(s); };
    var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
    var NS = 'http://www.w3.org/2000/svg';
    function svg(tag, attrs, parent) {
        var e = document.createElementNS(NS, tag);
        for (var k in attrs) e.setAttribute(k, attrs[k]);
        if (parent) parent.appendChild(e);
        return e;
    }
    function el(tag, attrs, html) {
        var e = document.createElement(tag);
        for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
        if (html != null) e.innerHTML = html;
        return e;
    }
    var fmt = function (n) { return n.toLocaleString('en-US'); };

    /* ------------------------------------------------------------------ data */
    var CONDS = [
        { key: 'noise', label: 'Noise electrodes', short: 'Noise electrodes', sub: 'artifact only' },
        { key: 'minimal', label: 'Minimal pre-processing', short: 'Minimal', sub: 'pipeline A' },
        { key: 'bemobil', label: 'BeMoBIL pre-processing', short: 'BeMoBIL', sub: 'pipeline B' },
        { key: 'icanclean', label: 'iCanClean pipeline', short: 'iCanClean', sub: 'pipeline C' }
    ];
    var GROUPS = { young: 'Young adults', older: 'Older adults' };
    // Per-participant test accuracy of the 1D-CNN (mean over cross-validation folds).
    var ACC = {
        young: {
            ids: [1, 2, 3, 5, 6, 8, 15, 16, 25, 29],
            noise: [0.929, 0.928, 0.998, 0.980, 0.875, 0.692, 0.999, 0.981, 0.966, 0.748],
            minimal: [0.997, 0.936, 0.957, 0.939, 0.944, 0.827, 0.793, 0.948, 1.000, 0.807],
            bemobil: [0.939, 0.927, 0.945, 0.953, 0.899, 0.819, 0.739, 0.950, 1.000, 0.760],
            icanclean: [0.849, 0.491, 0.485, 0.531, 0.466, 0.398, 0.293, 0.704, 0.856, 0.735]
        },
        older: {
            ids: [1, 2, 4, 9, 11, 12, 15, 17, 21, 40],
            noise: [0.906, 0.993, 0.999, 0.987, 0.951, 0.882, 0.885, 0.624, 0.937, 0.700],
            minimal: [0.622, 0.828, 0.881, 0.966, 0.910, 0.601, 0.777, 0.972, 0.718, 0.818],
            bemobil: [0.817, 0.896, 0.920, 0.955, 0.880, 0.658, 0.850, 0.987, 0.936, 0.849],
            icanclean: [0.604, 0.665, 0.610, 0.737, 0.696, 0.605, 0.630, 0.798, 0.734, 0.544]
        }
    };
    // Group-level confusion matrices: rows = true speed, columns = predicted speed (test windows).
    var SPEEDS = ['0.25', '0.5', '0.75', '1.0'];
    var CFM = {
        young: {
            noise: [[17507, 218, 10, 0], [1150, 14007, 1097, 1482], [357, 242, 16252, 885], [23, 12, 938, 16763]],
            minimal: [[15467, 1980, 104, 185], [433, 16099, 1118, 85], [156, 605, 16639, 336], [21, 18, 1004, 16693]],
            bemobil: [[14906, 2746, 82, 4], [760, 16102, 838, 38], [149, 669, 16803, 116], [32, 55, 2117, 15534]],
            icanclean: [[10354, 3246, 2486, 1650], [2411, 10317, 3440, 1568], [2018, 3604, 9624, 2490], [2272, 594, 3970, 10899]]
        },
        older: {
            noise: [[16448, 1020, 304, 8], [1412, 15328, 738, 303], [74, 940, 16034, 733], [403, 1689, 462, 15227]],
            minimal: [[15364, 1923, 459, 36], [1158, 14348, 2250, 25], [1187, 3441, 11486, 1667], [126, 34, 1259, 16361]],
            bemobil: [[16164, 1287, 349, 29], [1175, 15320, 1230, 105], [975, 2076, 14214, 564], [108, 13, 1022, 16686]],
            icanclean: [[12638, 2486, 1798, 858], [1157, 11769, 3887, 969], [2624, 3878, 9898, 1381], [1501, 1017, 2475, 12789]]
        }
    };
    var INFO = {
        noise: {
            blurb: 'The decoder never sees scalp EEG. It is trained only on the 120 noise electrodes of the dual-layer cap, which capture motion artifact and record no brain activity.',
            steps: ['120 noise electrodes sit on top of the 120 scalp electrodes', 'They record motion artifact, not cortical activity', 'Same 1D-CNN, windows and train/test split as the EEG conditions'],
            rej: null
        },
        minimal: {
            blurb: 'Keeps as much of the original signal as possible: a drift-removing filter plus amplitude-based bad-channel rejection.',
            steps: ['High-pass filter at 1 Hz', 'Flag channels whose mean absolute amplitude exceeds 100 µV', 'Reject flagged channels and rebuild them by spherical interpolation', 'Average re-reference'],
            rej: { young: '2.0', older: '1.0' }
        },
        bemobil: {
            blurb: 'The pre-processing module of the BeMoBIL pipeline for mobile brain/body imaging: stricter, correlation-based channel rejection.',
            steps: ['Remove line noise with Zapline-plus', 'Average re-reference', 'Flag channels whose RANSAC correlation with neighbours is below 0.8 (5 iterations)', 'Interpolate rejected channels', 'Average re-reference'],
            rej: { young: '7.5', older: '6.5' }
        },
        icanclean: {
            blurb: 'Uses the noise electrodes and neck EMG as references and removes EEG components that correlate with them (canonical correlation analysis).',
            steps: ['High-pass at 1 Hz (EEG, noise, EMG); extra 20 Hz low-pass on EMG', 'Average re-reference each channel set; remove 60 and 120 Hz line noise', 'Reject channels more than 5 SD from the set mean (up to 3 iterations)', 'iCanClean stage 1 — noise-electrode reference, 4 s windows, R² threshold 0.65', 'iCanClean stage 2 — EMG reference, 4 s windows, R² threshold 0.4'],
            rej: { young: '23.0', older: '15.5' }
        }
    };

    function quantile(arr, q) {
        var a = arr.slice().sort(function (x, y) { return x - y; });
        var p = (a.length - 1) * q, lo = Math.floor(p), hi = Math.ceil(p);
        return a[lo] + (a[hi] - a[lo]) * (p - lo);
    }
    var median = function (a) { return quantile(a, 0.5); };
    var pct = function (v, d) { return (v * 100).toFixed(d == null ? 1 : d); };
    var subId = function (n) { return 'sub-' + ('00' + n).slice(-3); };

    /* --------------------------------------------------------------- tooltip */
    var tip = $('#tip');
    function showTip(html, x, y) {
        tip.innerHTML = html; tip.hidden = false;
        var w = tip.offsetWidth, h = tip.offsetHeight;
        var left = Math.max(8, Math.min(x - w / 2, document.documentElement.clientWidth - w - 8));
        var top = y - h - 14;
        if (top < window.scrollY + 60) top = y + 18;
        tip.style.left = left + 'px'; tip.style.top = top + 'px';
    }
    function hideTip() { tip.hidden = true; }
    function anchor(node) {
        var r = node.getBoundingClientRect();
        return [r.left + r.width / 2 + window.scrollX, r.top + window.scrollY];
    }

    /* ----------------------------------------------------------------- theme */
    var root = document.documentElement;
    $('#theme-toggle').addEventListener('click', function () {
        var cur = root.getAttribute('data-theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        var next = cur === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('paper-theme', next); } catch (e) {}
    });

    /* -------------------------------------------------------------- explorer */
    (function explorer() {
        var seg = $('#exp-seg'), panel = $('#exp-panel');
        if (!seg) return;
        CONDS.forEach(function (c, i) {
            var b = el('button', { type: 'button', role: 'tab', 'aria-selected': 'false', 'data-key': c.key }, c.short + '<small>' + c.sub + '</small>');
            b.addEventListener('click', function () { render(c.key); });
            b.addEventListener('keydown', function (e) {
                var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
                if (!d) return;
                var n = CONDS[(i + d + CONDS.length) % CONDS.length];
                render(n.key); $('[data-key="' + n.key + '"]', seg).focus();
            });
            seg.appendChild(b);
        });
        panel.innerHTML =
            '<div class="exp-top"><div class="exp-desc"><h3></h3><p></p><ol class="exp-steps"></ol><p class="exp-meta"></p></div>' +
            '<div class="meters">' + ['young', 'older'].map(function (g) {
                return '<div class="meter" data-g="' + g + '"><div class="meter-head"><span class="meter-label"><i class="swatch ' + (g === 'older' ? 'tri ' : '') + 'sw-' + g + '"></i>' + GROUPS[g] +
                    '</span><span class="meter-val"><span class="v"></span><small>%</small></span></div>' +
                    '<div class="meter-track"><span class="meter-fill" style="background:var(--' + g + ')"></span><span class="meter-chance"></span></div>' +
                    '<div class="meter-foot"><span>0</span><span class="ch">chance 25%</span><span>100%</span></div></div>';
            }).join('') + '</div></div><div class="cfm-row">' + ['young', 'older'].map(function (g) {
                return '<div class="cfm" data-g="' + g + '"><h4><i class="swatch ' + (g === 'older' ? 'tri ' : '') + 'sw-' + g + '"></i>' + GROUPS[g] + ' — confusion matrix</h4>' +
                    '<p class="sub">Rows: true speed (m/s). Columns: predicted speed. Cells: % of that row’s test windows.</p><div class="cfm-grid"></div><p class="cfm-axis">predicted speed (m/s)</p></div>';
            }).join('') + '</div>';

        function render(key) {
            var c = CONDS.filter(function (x) { return x.key === key; })[0], info = INFO[key];
            $$('button', seg).forEach(function (b) {
                var on = b.getAttribute('data-key') === key;
                b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1;
            });
            $('.exp-desc h3', panel).textContent = c.label;
            $('.exp-desc p', panel).textContent = info.blurb;
            $('.exp-steps', panel).innerHTML = info.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('');
            $('.exp-meta', panel).textContent = info.rej
                ? 'Median channels rejected (of 120): ' + info.rej.young + ' in young adults, ' + info.rej.older + ' in older adults.'
                : 'Artifact-only control — not entered in the statistical model.';
            ['young', 'older'].forEach(function (g) {
                var m = median(ACC[g][key]);
                var box = $('.meter[data-g="' + g + '"]', panel);
                $('.v', box).textContent = pct(m, 0);
                $('.meter-fill', box).style.width = pct(m, 1) + '%';
                var grid = $('.cfm[data-g="' + g + '"] .cfm-grid', panel);
                var h = '<span class="hd"></span>' + SPEEDS.map(function (s) { return '<span class="hd">' + s + '</span>'; }).join('');
                CFM[g][key].forEach(function (row, r) {
                    var tot = row.reduce(function (a, b) { return a + b; }, 0);
                    h += '<span class="hd">' + SPEEDS[r] + '</span>';
                    row.forEach(function (n, cI) {
                        var p = n / tot * 100;
                        h += '<span class="cell' + (p > 52 ? ' hi' : '') + '" style="--p:' + p.toFixed(1) + '" tabindex="0" data-tip="<b>True ' + SPEEDS[r] + ' m/s → predicted ' + SPEEDS[cI] + ' m/s</b>' +
                            fmt(n) + ' of ' + fmt(tot) + ' windows (' + p.toFixed(1) + '%)">' + (p >= 0.95 ? Math.round(p) : '<1') + '</span>';
                    });
                });
                grid.innerHTML = h;
            });
        }
        panel.addEventListener('pointerover', function (e) {
            var c = e.target.closest('.cell'); if (!c) return;
            var a = anchor(c); showTip(c.getAttribute('data-tip'), a[0], a[1]);
        });
        panel.addEventListener('focusin', function (e) {
            var c = e.target.closest('.cell'); if (!c) return;
            var a = anchor(c); showTip(c.getAttribute('data-tip'), a[0], a[1]);
        });
        panel.addEventListener('pointerout', hideTip);
        panel.addEventListener('focusout', hideTip);
        render('noise');
    })();

    /* -------------------------------------------------------- accuracy chart */
    (function accuracyChart() {
        var host = $('#acc-chart');
        if (!host) return;
        var W = 780, H = 400, T = 22, B = 340, L = 46;
        var cx = { noise: 130, minimal: 345, bemobil: 515, icanclean: 685 };
        var y = function (v) { return T + (100 - v * 100) / 80 * (B - T); };
        var show = 'both';

        var bar = el('div', { 'class': 'chart-bar' });
        var chips = el('div', { 'class': 'chips', role: 'group', 'aria-label': 'Age group filter' });
        [['both', 'Both groups'], ['young', 'Young'], ['older', 'Older']].forEach(function (o) {
            var b = el('button', { type: 'button', 'aria-pressed': o[0] === show }, o[1]);
            b.addEventListener('click', function () {
                show = o[0];
                $$('button', chips).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
                draw();
            });
            chips.appendChild(b);
        });
        bar.appendChild(chips);
        bar.appendChild(el('div', { 'class': 'legend' },
            '<span><i class="swatch sw-young"></i>Young adults</span><span><i class="swatch tri sw-older"></i>Older adults</span>'));
        host.appendChild(bar);
        var s = svg('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Test accuracy of the 1D-CNN per participant for noise electrodes and three pre-processing pipelines. A data table follows the chart.' }, host);

        function swarm(vals) {
            var placed = [], out = [];
            vals.map(function (v, i) { return { v: v, i: i }; }).sort(function (a, b) { return a.v - b.v; }).forEach(function (p) {
                var py = y(p.v), tries = [0, -9, 9, -18, 18, -27, 27], dx = 0;
                for (var t = 0; t < tries.length; t++) {
                    var ok = placed.every(function (q) { return Math.hypot(q.x - tries[t], q.y - py) > 9.5; });
                    if (ok) { dx = tries[t]; break; }
                }
                placed.push({ x: dx, y: py }); out[p.i] = dx;
            });
            return out;
        }

        function draw() {
            while (s.firstChild) s.removeChild(s.firstChild);
            host.classList.remove('dim');
            for (var t = 20; t <= 100; t += 20) {
                svg('line', { 'class': 'grid', x1: L, x2: W - 8, y1: y(t / 100), y2: y(t / 100) }, s);
                svg('text', { x: L - 8, y: y(t / 100) + 4, 'text-anchor': 'end' }, s).textContent = t;
            }
            var yl = svg('text', { x: 12, y: (T + B) / 2, transform: 'rotate(-90 12 ' + (T + B) / 2 + ')', 'text-anchor': 'middle' }, s);
            yl.textContent = 'Test accuracy (%)';
            svg('line', { 'class': 'chance', x1: L, x2: W - 8, y1: y(0.25), y2: y(0.25) }, s);
            svg('text', { 'class': 'lbl', x: L + 6, y: y(0.25) - 6 }, s).textContent = 'Chance = 25%';
            svg('line', { 'class': 'axis', x1: 238, x2: 238, y1: T - 6, y2: B + 40 }, s);
            var gs = show === 'both' ? ['young', 'older'] : [show];
            var pts = {};
            var traceLayer = svg('g', {}, s);
            CONDS.forEach(function (c) {
                var lab = svg('text', { 'class': 'lbl-strong', x: cx[c.key], y: B + 24, 'text-anchor': 'middle' }, s);
                lab.textContent = c.short;
                svg('text', { x: cx[c.key], y: B + 41, 'text-anchor': 'middle' }, s).textContent = c.key === 'noise' ? 'artifact only' : 'EEG';
                gs.forEach(function (g, gi) {
                    var vals = ACC[g][c.key];
                    var x0 = cx[c.key] + (gs.length === 2 ? (gi ? 36 : -36) : 0);
                    var q1 = quantile(vals, 0.25), q3 = quantile(vals, 0.75), m = median(vals);
                    svg('rect', { 'class': 'box ' + g, x: x0 - 26, width: 52, y: y(q3), height: Math.max(1, y(q1) - y(q3)), rx: 4 }, s);
                    var off = swarm(vals);
                    vals.forEach(function (v, i) {
                        var px = x0 + off[i], py = y(v), mark;
                        if (g === 'young') mark = svg('circle', { 'class': 'pt young', cx: px, cy: py, r: 5 }, s);
                        else mark = svg('path', { 'class': 'pt older', d: 'M' + px + ' ' + (py - 6.5) + 'l6 11h-12z' }, s);
                        (pts[g + i] = pts[g + i] || []).push({ x: px, y: py, mark: mark });
                    });
                    svg('line', { 'class': 'med ' + g, x1: x0 - 26, x2: x0 + 26, y1: y(m), y2: y(m) }, s);
                    var side = gs.length === 2 ? (gi ? 1 : -1) : 1;
                    var ml = svg('text', { 'class': 'lbl-strong', x: x0 + side * 32, y: y(m) + 4, 'text-anchor': side > 0 ? 'start' : 'end' }, s);
                    ml.textContent = pct(m, 0);
                });
            });
            // hit targets on top
            gs.forEach(function (g) {
                ACC[g].ids.forEach(function (id, i) {
                    pts[g + i].forEach(function (p) {
                        var hit = svg('circle', { 'class': 'hit', cx: p.x, cy: p.y, r: 11 }, s);
                        var on = function () {
                            host.classList.add('dim');
                            $$('.pt.on', s).forEach(function (n) { n.classList.remove('on'); });
                            pts[g + i].forEach(function (q) { q.mark.classList.add('on'); });
                            while (traceLayer.firstChild) traceLayer.removeChild(traceLayer.firstChild);
                            svg('polyline', { 'class': 'trace', points: pts[g + i].map(function (q) { return q.x + ',' + q.y; }).join(' ') }, traceLayer);
                            var rows = CONDS.map(function (c) { return '<tr><td>' + c.short + '</td><td>' + pct(ACC[g][c.key][i]) + '%</td></tr>'; }).join('');
                            var a = anchor(hit);
                            showTip('<b>' + GROUPS[g].replace('adults', 'adult') + ' · ' + subId(id) + '</b><table>' + rows + '</table>', a[0], a[1]);
                        };
                        var off = function () {
                            host.classList.remove('dim'); hideTip();
                            $$('.pt.on', s).forEach(function (n) { n.classList.remove('on'); });
                            while (traceLayer.firstChild) traceLayer.removeChild(traceLayer.firstChild);
                        };
                        hit.addEventListener('pointerenter', on);
                        hit.addEventListener('pointerleave', off);
                        hit.addEventListener('click', on);
                    });
                });
            });
        }
        draw();

        var rows = '';
        ['young', 'older'].forEach(function (g) {
            ACC[g].ids.forEach(function (id, i) {
                rows += '<tr><th scope="row">' + GROUPS[g].replace(' adults', '') + ' ' + subId(id) + '</th>' +
                    CONDS.map(function (c) { return '<td>' + pct(ACC[g][c.key][i]) + '</td>'; }).join('') + '</tr>';
            });
            rows += '<tr class="grp-start"><th scope="row">' + GROUPS[g] + ' — median</th>' +
                CONDS.map(function (c) { return '<td class="med">' + pct(median(ACC[g][c.key])) + '</td>'; }).join('') + '</tr>';
        });
        host.appendChild(el('details', { 'class': 'data' },
            '<summary>Show the data as a table</summary><div class="tbl-scroll"><table><thead><tr><th>Participant</th>' +
            CONDS.map(function (c) { return '<th>' + c.short + ' (%)</th>'; }).join('') + '</tr></thead><tbody>' + rows + '</tbody></table></div>'));
    })();

    /* -------------------------------------------------- cross-validation widget */
    (function cvWidget() {
        var host = $('#cv-widget');
        if (!host) return;
        var fold = 1, swapped = false, timer = null;
        host.innerHTML = '<h5>Step through the cross-validation scheme</h5>' +
            '<p class="hint">Each fold trains on a contiguous 126 s of one run, validates on the next 18 s, and tests on the entire other run recorded at the same speed. Then the two runs swap roles.</p>' +
            '<div class="w-controls"><div class="chips" role="group" aria-label="Fold">' +
            [1, 2, 3].map(function (n) { return '<button type="button" data-fold="' + n + '">Fold ' + n + '</button>'; }).join('') +
            '</div><div class="chips"><button type="button" id="cv-swap" aria-pressed="false">Swap runs</button><button type="button" id="cv-play">▶ Play all six</button></div></div>' +
            '<div class="viz"></div><p class="hint" id="cv-read" style="margin:10px 0 0"></p>' +
            '<div class="cv-legend"><span><i style="background:var(--young)"></i>Training (70%)</span><span><i style="background:var(--older)"></i>Validation (10%)</span><span><i style="background:var(--test)"></i>Testing (whole other run)</span></div>';
        var X0 = 64, X1 = 690, PX = (X1 - X0) / 180;
        var s = svg('svg', { viewBox: '0 0 700 168', role: 'img', 'aria-label': 'Timeline of the two runs showing training, validation and testing segments' }, $('.viz', host));
        var rowsY = [14, 78];
        var R = rowsY.map(function (yy, i) {
            svg('text', { 'class': 'lbl-strong', x: 0, y: yy + 22 }, s).textContent = 'Run ' + (i + 1);
            svg('rect', { 'class': 'cv-idle', x: X0, y: yy, width: X1 - X0, height: 34, rx: 4 }, s);
            return {
                train: svg('rect', { 'class': 'cv-rect cv-train', y: yy, height: 34, rx: 4, x: X0, width: 0 }, s),
                valid: svg('rect', { 'class': 'cv-rect cv-valid', y: yy, height: 34, rx: 4, x: X0, width: 0 }, s),
                test: svg('rect', { 'class': 'cv-rect cv-test', y: yy, height: 34, rx: 4, x: X0, width: 0 }, s),
                lab: svg('text', { 'class': 'cv-inlabel', y: yy + 22, 'text-anchor': 'middle' }, s),
                lab2: svg('text', { 'class': 'cv-inlabel', y: yy + 22, 'text-anchor': 'middle' }, s)
            };
        });
        for (var t = 0; t <= 180; t += 18) {
            svg('line', { 'class': 'axis', x1: X0 + t * PX, x2: X0 + t * PX, y1: 120, y2: 126 }, s);
            if (t % 36 === 0) svg('text', { x: X0 + t * PX, y: 142, 'text-anchor': 'middle' }, s).textContent = t;
        }
        svg('line', { 'class': 'axis', x1: X0, x2: X1, y1: 120, y2: 120 }, s);
        svg('text', { x: (X0 + X1) / 2, y: 162, 'text-anchor': 'middle' }, s).textContent = 'Time within a 3-minute run (s)';

        function render() {
            var start = (fold - 1) * 18, a = swapped ? 1 : 0, b = swapped ? 0 : 1;
            var tr = R[a], te = R[b];
            tr.train.setAttribute('x', X0 + start * PX); tr.train.setAttribute('width', 126 * PX - 2);
            tr.valid.setAttribute('x', X0 + (start + 126) * PX); tr.valid.setAttribute('width', 18 * PX);
            tr.test.setAttribute('width', 0);
            tr.lab.setAttribute('x', X0 + (start + 63) * PX); tr.lab.textContent = 'Train · 126 s';
            tr.lab2.setAttribute('x', X0 + (start + 135) * PX); tr.lab2.textContent = 'Val';
            te.train.setAttribute('width', 0); te.valid.setAttribute('width', 0);
            te.test.setAttribute('x', X0); te.test.setAttribute('width', X1 - X0);
            te.lab.setAttribute('x', (X0 + X1) / 2); te.lab.textContent = 'Test · 180 s'; te.lab2.textContent = '';
            $$('[data-fold]', host).forEach(function (x) { x.setAttribute('aria-pressed', +x.getAttribute('data-fold') === fold); });
            $('#cv-swap').setAttribute('aria-pressed', swapped);
            $('#cv-read').textContent = 'Fold ' + fold + (swapped ? ' (runs swapped)' : '') + ': train on ' + start + '–' + (start + 126) + ' s of run ' + (a + 1) +
                ', validate on ' + (start + 126) + '–' + (start + 144) + ' s, then test on all 180 s of run ' + (b + 1) + '.';
        }
        function stop() { if (timer) { clearInterval(timer); timer = null; $('#cv-play').textContent = '▶ Play all six'; } }
        $$('[data-fold]', host).forEach(function (x) {
            x.addEventListener('click', function () { stop(); fold = +x.getAttribute('data-fold'); render(); });
        });
        $('#cv-swap').addEventListener('click', function () { stop(); swapped = !swapped; render(); });
        $('#cv-play').addEventListener('click', function () {
            if (timer) return stop();
            var k = 0; fold = 1; swapped = false; render();
            $('#cv-play').textContent = '■ Stop';
            timer = setInterval(function () {
                k++; if (k > 5) return stop();
                fold = k % 3 + 1; swapped = k >= 3; render();
            }, 1400);
        });
        render();
    })();

    /* ------------------------------------------------------------ CNN widget */
    (function cnnWidget() {
        var host = $('#cnn-widget');
        if (!host) return;
        var conv = '3 × [Conv1D (kernel 21, “same” padding) → batch norm → ReLU]';
        var NODES = [
            { n: 'Input', ch: 120, div: 1, d: 'One window of 120-channel EEG, <i>W</i> samples long (one stride at the participant’s slowest speed, sampled at 500 Hz).' },
            { n: 'Block 1', ch: 16, div: 2, p: 51216, d: conv + ', then max-pooling (÷2) and dropout (<i>p</i> = 0.4).' },
            { n: 'Block 2', ch: 32, div: 4, p: 54048, d: conv + ', then max-pooling (÷2) and dropout (<i>p</i> = 0.4).' },
            { n: 'Block 3', ch: 64, div: 8, p: 215616, d: conv + ', then max-pooling (÷2) and dropout (<i>p</i> = 0.4).' },
            { n: 'Block 4', ch: 128, div: 16, p: 861312, d: conv + ', then max-pooling (÷2) and dropout (<i>p</i> = 0.4).' },
            { n: 'Block 5', ch: 256, div: 16, p: 3442944, d: conv + ', then dropout (<i>p</i> = 0.4). No pooling in this block.' },
            { n: 'Avg pool', ch: 256, div: 0, d: 'Adaptive average pooling takes the mean over time, leaving one value per filter — so no trainable parameter depends on the window length.' },
            { n: 'Dense', ch: 64, div: 0, p: 16448, d: 'Hidden dense layer with 64 units and ReLU.' },
            { n: 'Output', ch: 4, div: 0, p: 130, d: 'Logits for the four gait-speed classes (0.25, 0.5, 0.75, 1.0 m/s), trained with cross-entropy loss.' }
        ];
        var sel = 1;
        host.innerHTML = '<h5>Follow a window through the network</h5>' +
            '<p class="hint">The window length differs between participants because it equals each person’s stride time at 0.25 m/s. Drag the slider (illustrative values) to see how the feature-map shape changes while the parameter count stays at 4,641,714.</p>' +
            '<div class="w-controls"><label>Stride time <input type="range" id="cnn-t" min="1" max="3" step="0.02" value="1.8"> <output id="cnn-o"></output></label></div>' +
            '<div class="cnn-flow"></div><div class="cnn-detail" aria-live="polite"></div>';
        var flow = $('.cnn-flow', host), slider = $('#cnn-t');
        NODES.forEach(function (nd, i) {
            var b = el('button', { type: 'button', 'class': 'cnn-node', 'aria-pressed': 'false' }, '<b>' + nd.n + '</b><span class="shape"></span><span class="bar"></span>');
            b.addEventListener('click', function () { sel = i; render(); });
            flow.appendChild(b);
        });
        function shape(nd, Wn) { return nd.div ? '(' + nd.ch + ', ' + Math.floor(Wn / nd.div) + ')' : '(' + nd.ch + ')'; }
        function render() {
            var Wn = Math.round(parseFloat(slider.value) * 500);
            $('#cnn-o').textContent = parseFloat(slider.value).toFixed(2) + ' s → W = ' + Wn + ' samples';
            $$('.cnn-node', flow).forEach(function (b, i) {
                var nd = NODES[i];
                $('.shape', b).textContent = shape(nd, Wn);
                $('.bar', b).style.width = (nd.div ? Math.max(4, Wn / nd.div / 1500 * 100) : 4) + '%';
                b.setAttribute('aria-pressed', i === sel);
            });
            var nd = NODES[sel];
            $('.cnn-detail', host).innerHTML = '<b>' + nd.n + ' → output ' + shape(nd, Wn) + (nd.div ? ' (filters, time)' : '') + '.</b> ' + nd.d +
                (nd.p ? ' ' + fmt(nd.p) + ' trainable parameters.' : '');
        }
        slider.addEventListener('input', render);
        render();
    })();

    /* ------------------------------------------------------------------ tabs */
    $$('.tabs').forEach(function (tabs) {
        var btns = $$('button', tabs);
        btns.forEach(function (b) {
            b.addEventListener('click', function () {
                btns.forEach(function (x) {
                    var on = x === b;
                    x.setAttribute('aria-selected', on);
                    document.getElementById(x.getAttribute('data-tab')).hidden = !on;
                });
            });
        });
    });

    /* -------------------------------------------------------------- lightbox */
    (function () {
        var box = $('#lightbox');
        if (!box || !box.showModal) return;
        var img = $('img', box);
        $$('[data-zoom]').forEach(function (b) {
            b.addEventListener('click', function () {
                img.src = b.getAttribute('data-zoom');
                img.alt = $('img', b).alt;
                box.showModal();
            });
        });
        $('.lightbox-close', box).addEventListener('click', function () { box.close(); });
        box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
    })();

    /* ----------------------------------------------------- citation popovers */
    (function () {
        var pop = $('#cite-pop'), pinned = false, hideT;
        function open(a) {
            var n = a.getAttribute('data-ref'), li = document.getElementById('ref-' + n);
            if (!li) return;
            pop.innerHTML = '<span class="n">[' + n + ']</span>' + li.innerHTML +
                '<div style="margin-top:8px"><a href="#ref-' + n + '" data-jump>Show in reference list ↓</a></div>';
            pop.hidden = false;
            var r = a.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight;
            var left = Math.max(12, Math.min(r.left + window.scrollX - 20, document.documentElement.clientWidth - w - 12));
            var top = r.bottom + window.scrollY + 8;
            if (r.bottom + h + 16 > window.innerHeight && r.top - h - 8 > 60) top = r.top + window.scrollY - h - 8;
            pop.style.left = left + 'px'; pop.style.top = top + 'px';
        }
        function close() { pop.hidden = true; pinned = false; }
        document.addEventListener('click', function (e) {
            var a = e.target.closest('.cite');
            if (a) { e.preventDefault(); open(a); pinned = true; return; }
            if (e.target.closest('[data-jump]')) { close(); return; }
            if (!e.target.closest('#cite-pop')) close();
        });
        document.addEventListener('pointerover', function (e) {
            if (e.pointerType !== 'mouse') return;
            var a = e.target.closest('.cite');
            if (a) { clearTimeout(hideT); if (!pinned) open(a); }
            else if (e.target.closest('#cite-pop')) clearTimeout(hideT);
        });
        document.addEventListener('pointerout', function (e) {
            if (e.pointerType !== 'mouse' || pinned) return;
            if (e.target.closest('.cite') || e.target.closest('#cite-pop')) hideT = setTimeout(close, 220);
        });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    })();

    /* --------------------------------------- progress, back-to-top, active TOC */
    (function () {
        var barEl = $('#progress-bar'), top = $('#to-top'), ticking = false;
        function upd() {
            var h = document.documentElement.scrollHeight - window.innerHeight;
            barEl.style.width = (h > 0 ? window.scrollY / h * 100 : 0) + '%';
            top.hidden = window.scrollY < 900;
            ticking = false;
        }
        window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
        top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
        upd();

        var links = $$('#toc-list a, .topnav a');
        var targets = [];
        links.forEach(function (a) {
            var t = document.getElementById(a.getAttribute('href').slice(1));
            if (t && targets.indexOf(t) < 0) targets.push(t);
        });
        function mark() {
            var cur = null, line = 120;
            targets.forEach(function (t) { if (t.getBoundingClientRect().top <= line) cur = t; });
            var ids = [];
            if (cur) { ids.push(cur.id); var sec = cur.closest('section'); if (sec && sec.id) ids.push(sec.id); }
            links.forEach(function (a) { a.classList.toggle('active', ids.indexOf(a.getAttribute('href').slice(1)) >= 0); });
        }
        window.addEventListener('scroll', function () { requestAnimationFrame(mark); }, { passive: true });
        mark();
    })();
})();
