const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
console.log(ctx);

canvas.width = innerWidth;
canvas.height = innerHeight;

// const computerStyle = getComputedStyle(canvas)
// const height = computerStyle.height;
// const width = computerStyle.width;

// Player
class Player {
    constructor(x, y, radius, color) {
        this.x = x 
        this.y = y
        this.radius = radius
        this.color = color
    }
    render() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}


// Projectiles
class Shot {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    render() {
        ctx.beginPath();
        // temp player circle - replace with spaceship image later
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    // velocity function
    update() {
        this.render();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
    // refresh function ?
};

// Asteroids
class Asteroid {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    render() {
        ctx.beginPath();
        // temp player circle - replace with spaceship image later
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    // velocity function
    update() {
        this.render();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
    // refresh function ?
}


const x = canvas.width / 2
const y = canvas.height / 2

const player = new Player(x, y, 10, 'black');
player.render();

const shot = new Shot(x, y, 5, 'orange',
    {
        x: 1,
        y: 2
    }
);

// projectiles array
const projectiles = []
const asteroids = []

function spawnAsteroid() {
    setInterval(() => {
        const radius = 30
        const x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
        const y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        const color = 'green'
        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)
        const speed = 25
        const velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        }

        asteroids.push(new Asteroid(x, y, radius, color, velocity))
        console.log(asteroids);
    }, 1000)
}

// animation function
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.render();
    projectiles.forEach((shot) => {
        shot.update();
    })
    asteroids.forEach((Asteroid) => {
        Asteroid.update()
    })
}

// click
canvas.addEventListener('click', (e) => {
    // push new projectile?
    const angle = Math.atan2(e.pageY - y, e.pageX - x)
    const speed = 25
    const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
    }
    projectiles.push(new Shot(x, y, 5, 'orange', velocity)
    )
})

animate()
spawnAsteroid()