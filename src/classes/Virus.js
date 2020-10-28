import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

class Virus {

    constructor() {
        this.gltfLoader = new GLTFLoader()
        this.texLoader = new THREE.TextureLoader()

        this.bind()
    }

    init(scene) {
        this.scene = scene
        this.originStem

        this.blkTex = new THREE.MeshMatcapMaterial({
            matcap: this.texLoader.load("blackTex.png")
        })

        this.ball = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 20), this.blkTex)
        this.scene.add(this.ball)

        this.gltfLoader.load("stem.glb", (glb) => {
            console.log(glb)
            this.originStem = glb.scene
            this.originStem.traverse(child => {
                if (child instanceof THREE.Mesh)
                    child.material = this.blkTex
            })

            for (let i = 0; i < 50; i++) {
                let g = new THREE.Group()
                let c = this.originStem.clone()

                c.translateY(1)
                let s = 0.1 * Math.random() + 0.05
                c.scale.set(s, s, s)
                g.add(c)

                g.rotateX(Math.random() * Math.PI * 2)
                g.rotateZ(Math.random() * Math.PI * 2)


                this.scene.add(g)
            }

        })
    }

    bind() {
        this.init = this.init.bind(this)
    }
}

const _instance = new Virus()
export default _instance