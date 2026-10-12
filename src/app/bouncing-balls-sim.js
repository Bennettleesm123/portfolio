const COLS = 64;
const ROWS = 22;
const RAMP = " .:-=+*#%@";
const G = 80;
const H = 1 / 900;
const STIFF = 120;
const SIZES = [3, 2.3, 1.7];
const BOUNCE = [0.84, 0.82, 0.8];
const SPREAD = 2.1;
const WARM = 9.1;
const SHADOW = "▀▒░";

function mulberry32(seed) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createBalls() {
  const width = COLS / 2;
  const rand = mulberry32(11);
  const balls = SIZES.map((radius, index) => {
    const frequency = STIFF / radius;
    const restitution = BOUNCE[index];
    const zeta = -Math.log(restitution) / Math.hypot(Math.PI, Math.log(restitution));
    const x = width * (0.2 + (0.6 * index) / Math.max(1, SIZES.length - 1));
    return {
      r: radius,
      k: frequency * frequency,
      c: 2 * zeta * frequency,
      x,
      y: radius,
      vx: 0,
      vy: 0,
      rest: 0,
      crouch: -SPREAD * index,
      sq: 0,
    };
  });

  const launch = (ball) => {
    ball.vy = Math.sqrt(2 * G * (ROWS - 1 - 1.5 - 2 * ball.r) * (0.75 + 0.25 * rand()));
    ball.vx = (width / 2 - ball.x) * 0.3 + (rand() - 0.5) * 10;
    ball.y = ball.r;
    ball.crouch = null;
    ball.rest = 0;
  };

  const step = () => {
    const floor = ROWS - 1;
    for (const ball of balls) {
      if (ball.crouch !== null) {
        ball.crouch += H;
        const u = Math.max(0, Math.min(1, ball.crouch / 0.45));
        ball.sq = 0.3 * ball.r * u * u * (3 - 2 * u);
        ball.y = ball.r - ball.sq;
        ball.vx *= 1 - 6 * H;
        if (u >= 1) launch(ball);
        continue;
      }
      ball.vy -= G * H;
      const sunk = ball.r - ball.y;
      if (sunk > 0) {
        ball.vy += Math.max(0, ball.k * sunk - ball.c * ball.vy) * H;
        ball.vx *= 1 - 0.8 * H;
        ball.rest += H;
        if (ball.rest > 0.3) ball.crouch = 0;
      } else {
        ball.rest = 0;
      }
      ball.sq = Math.max(0, sunk);
      ball.vy = Math.min(ball.vy, Math.sqrt(2 * G * Math.max(0, floor - 1.2 - ball.r - ball.y)));
      ball.x += ball.vx * H;
      ball.y += ball.vy * H;
      if (ball.x < ball.r) {
        ball.x = ball.r;
        ball.vx = Math.abs(ball.vx) * 0.85;
      }
      if (ball.x > width - ball.r) {
        ball.x = width - ball.r;
        ball.vx = -Math.abs(ball.vx) * 0.85;
      }
    }

    for (let i = 0; i < balls.length; i += 1) {
      for (let j = i + 1; j < balls.length; j += 1) {
        const a = balls[i];
        const b = balls[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);
        const gap = a.r + b.r - dist;
        if (gap <= 0 || dist === 0) continue;
        const nx = dx / dist;
        const ny = dy / dist;
        const massA = a.r * a.r;
        const massB = b.r * b.r;
        const approach = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
        if (approach < 0) {
          const impulse = (-1.85 * approach) / (1 / massA + 1 / massB);
          a.vx -= (impulse * nx) / massA;
          a.vy -= (impulse * ny) / massA;
          b.vx += (impulse * nx) / massB;
          b.vy += (impulse * ny) / massB;
        }
        const shareA = massB / (massA + massB);
        const shareB = massA / (massA + massB);
        a.x -= nx * gap * shareA;
        a.y -= ny * gap * shareA;
        b.x += nx * gap * shareB;
        b.y += ny * gap * shareB;
        if (a.crouch !== null && ny < 0) a.crouch = null;
        if (b.crouch !== null && ny > 0) b.crouch = null;
      }
    }
  };

  const advance = (dt) => {
    const count = Math.round(dt / H);
    for (let i = 0; i < count; i += 1) step();
  };

  return { balls, advance };
}

function render(balls) {
  const floor = ROWS - 1;
  const light = [-0.45, 0.55, 0.7];
  const lightLength = Math.hypot(...light);
  const lx = light[0] / lightLength;
  const ly = light[1] / lightLength;
  const lz = light[2] / lightLength;
  const halfLength = Math.hypot(lx, ly, lz + 1);
  const hx = lx / halfLength;
  const hy = ly / halfLength;
  const hz = (lz + 1) / halfLength;
  const cells = new Array(COLS * ROWS).fill(" ");
  for (let col = 0; col < COLS; col += 1) cells[floor * COLS + col] = "▔";

  const shade = (nx, ny, nz) => {
    const diffuse = Math.max(0, nx * lx + ny * ly + nz * lz);
    const specular = Math.max(0, nx * hx + ny * hy + nz * hz) ** 40;
    return Math.min(1, 0.14 + 0.66 * diffuse + 0.5 * specular + 0.12 * Math.max(0, -ny));
  };

  const draw = (ball) => {
    const ry = ball.r - ball.sq;
    const rx = (ball.r * ball.r) / ry;
    const cy = floor - ry - Math.max(0, ball.y - ball.r);
    const cx = ball.x * 2;
    const runs = [];
    for (let row = Math.floor(cy - ry); row <= cy + ry; row += 1) {
      const run = [];
      runs.push(run);
      if (row < 0 || row >= floor) continue;
      for (let col = Math.floor(cx - 2 * rx); col <= cx + 2 * rx; col += 1) {
        if (col < 0 || col >= COLS) continue;
        let hit = 0;
        let value = 0;
        for (let j = 0; j < 4; j += 1) {
          for (let i = 0; i < 4; i += 1) {
            const u = (col + 0.125 + i * 0.25 - cx) / 2 / rx;
            const w = (row + 0.125 + j * 0.25 - cy) / ry;
            const inside = u * u + w * w;
            if (inside < 1) {
              hit += 1;
              value += shade(u, -w, Math.sqrt(1 - inside));
            }
          }
        }
        if (hit < 4) continue;
        const ink = 1.1 - value / hit;
        const glyph = Math.round(Math.min(1, ink) * Math.sqrt(hit / 16) * (RAMP.length - 1));
        if (glyph > 0) run.push([row * COLS + col, RAMP[glyph]]);
      }
    }
    const count = runs.length;
    if (count > 2 && runs[0].length < 3 && runs[1].length > 5) runs[0].length = 0;
    if (count > 2 && runs[count - 1].length < 3 && runs[count - 2].length > 5) runs[count - 1].length = 0;
    for (const run of runs) {
      for (const [index, glyph] of run) cells[index] = glyph;
    }
  };

  for (const ball of balls) {
    const height = Math.max(0, ball.y - ball.r) / (floor - 2 * ball.r);
    const rx = (ball.r * ball.r) / (ball.r - ball.sq);
    const shadowWidth = rx * 2 * (1 - 0.6 * height);
    for (let col = Math.ceil(ball.x * 2 - shadowWidth); col < ball.x * 2 + shadowWidth; col += 1) {
      const edge = Math.abs(col + 0.5 - ball.x * 2) / shadowWidth;
      const glyph = Math.min(SHADOW.length - 1, Math.floor(height * 2.6 + edge * 1.3));
      if (col >= 0 && col < COLS) cells[floor * COLS + col] = SHADOW[glyph];
    }
  }

  for (const ball of [...balls].sort((a, b) => b.r - a.r)) draw(ball);

  const lines = [];
  for (let row = 0; row < ROWS; row += 1) {
    lines.push(cells.slice(row * COLS, (row + 1) * COLS).join(""));
  }
  return lines.join("\n");
}

export function createScene() {
  const { balls, advance } = createBalls();
  for (let i = 0; i < WARM * 30; i += 1) advance(1 / 30);
  const still = render(balls);
  return {
    still,
    advance(dt) {
      advance(Math.min(0.1, Math.max(0, dt)));
      return render(balls);
    },
  };
}
