const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
console.log(ctx);

canvas.width = innerWidth;
canvas.height = innerHeight;

// const computerStyle = getComputedStyle(canvas)
// const height = computerStyle.height;
// const width = computerStyle.width;

// player
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


// projectiles
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

const projectiles = []

// animation function
function animate() {
    requestAnimationFrame(animate)
    projectiles.forEach((shot) => {
        shot.update();
    })
}

// click
canvas.addEventListener('click', (e) => {
    // push new projectile?
    const angle = Math.atan2(e.pageY - y, e.pageX - x)
    console.log(angle);
    projectiles.push(new Shot(canvas.width / 2, canvas.height / 2, 5, 'orange',
    {
        x: 1,
        y: 1
    })
    )
    // angle - Math.cos and Math.sin
    console.log(e);
})

animate()