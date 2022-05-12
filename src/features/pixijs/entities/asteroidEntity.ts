import { Sprite, Loader, DisplayObject } from 'pixi.js'
import { Bodies, Body, ICollision as Collision } from 'matter-js'

import { MatterEntity } from '../abstract/matterEntity'
import { LaserEntity } from '../entities/laserEntity'
import { ShipEntity } from '../entities/shipEntity'
import { AsteroidScene } from '../scenes/asteroidScene'
import { Manager } from '../static/manager'
import { View } from '../static/view'

export class AsteroidEntity extends MatterEntity<Sprite> {
    
    private radius: number

    constructor (x: number, y: number, radius: number) {
        super(
            new Sprite(Loader.shared.resources['asteroid'].texture),
            Bodies.circle(x, y, radius, {
                inertia: Infinity,
                friction: 0,
                frictionAir: 0,
                restitution: 1,
                collisionFilter: {
                    category: AsteroidScene.COLLISION_CATEGORIES.ASTEROID,
                },
            }),
        )

        this.radius = radius
        this.facade.width = View.scale(this.radius * 2)
        this.facade.height = View.scale(this.radius * 2)
        this.facade.anchor.x = 0.5
        this.facade.anchor.y = 0.5

        Body.setAngle(this.body, Math.random() * Math.PI * 2)

        Body.setVelocity(this.body, {
            x: (Math.random() - 0.5) * View.unitWidth() / 300,
            y: (Math.random() - 0.5) * View.unitWidth() / 300,
        })

        super.resize()
    }

    override update (delta: number) {
        if (this.boundPositionToLeft(this.radius)) {
            Body.setVelocity(this.body, {
                x: -this.body.velocity.x,
                y: this.body.velocity.y,
            })
        }
        if (this.boundPositionToRight(this.radius)) {
            Body.setVelocity(this.body, {
                x: -this.body.velocity.x,
                y: this.body.velocity.y,
            })
        }
        if (this.boundPositionToTop(this.radius)) {
            Body.setVelocity(this.body, {
                x: this.body.velocity.x,
                y: -this.body.velocity.y,
            })
        }
        if (this.boundPositionToBottom(this.radius)) {
            Body.setVelocity(this.body, {
                x: this.body.velocity.x,
                y: -this.body.velocity.y,
            })
        }

        this.facade.width = View.scale(this.radius * 2)
        this.facade.height = View.scale(this.radius * 2)
    }

    override collide (entity: MatterEntity<DisplayObject>, collision: Collision) {
        const scene = (Manager.currentScene as AsteroidScene)
        if (entity instanceof LaserEntity && collision.depth > 3) {
            scene.scoreEntity.setScore(scene.scoreEntity.score + ~~(100 / this.radius))
            scene.removeEntity(entity)
            this.perish()
        }
        if (entity instanceof ShipEntity) {
            this.perish()
        }
    }

    private perish () {
        const scene = (Manager.currentScene as AsteroidScene)
        if (this.radius > AsteroidScene.ASTEROID_MIN_SIZE * View.unitWidth()) {
            const halfSize = ~~(this.radius / 2)
            const angle = Math.random() * Math.PI * 2
            const x = Math.sin(angle) * (halfSize + 1)
            const y = -Math.cos(angle) * (halfSize + 1)
            scene.spawnAsteroid(
                Math.max(0, this.body.position.x + x),
                Math.max(0, this.body.position.y + y),
                halfSize,
            )
            scene.spawnAsteroid(
                Math.max(0, this.body.position.x - x),
                Math.max(0, this.body.position.y - y),
                halfSize,
            )
        }
        scene.removeEntity(this)
    }
}
