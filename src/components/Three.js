import React, { Component } from 'react'
import * as THREE from 'three'
// import * as dat from 'dat.gui'
const OrbitControls = require('three-orbit-controls')(THREE)

export default class Three extends Component {
  componentDidMount() {
    const getBox = (w, h, d) => {
      const geometry = new THREE.BoxGeometry(w, h, d)
      const material = new THREE.MeshPhongMaterial({ color: 0x777777 })
      let mesh = new THREE.Mesh(geometry, material)
      mesh.castShadow = true

      return mesh
    }

    const getBoxGrid = (amount, separationMultiplier) => {
      let group = new THREE.Group()

      for (let i = 0; i < amount; i++) {
        let obj = getBox(1, 1, 1)
        obj.position.x = i * separationMultiplier
        obj.position.y = obj.geometry.parameters.height / 2
        group.add(obj)

        for (let j = 1; j < amount; j++) {
          let obj = getBox(1, 1, 1)
          obj.position.x = i * separationMultiplier
          obj.position.y = obj.geometry.parameters.height / 2
          obj.position.z = j * separationMultiplier
          group.add(obj)
        }
      }

      group.position.x = -(separationMultiplier * (amount - 1)) / 2
      group.position.z = -(separationMultiplier * (amount - 1)) / 2

      return group
    }

    const getSphere = (size) => {
      const geometry = new THREE.SphereGeometry(size, 24, 24)
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
      return new THREE.Mesh(geometry, material)
    }

    const getPlane = (size) => {
      const geometry = new THREE.PlaneGeometry(size, size)
      const material = new THREE.MeshPhongMaterial({
        color: 0x777777,
        side: THREE.DoubleSide,
      })
      let mesh = new THREE.Mesh(geometry, material)
      mesh.receiveShadow = true

      return mesh
    }

    const getPointLight = (intensity) => {
      const light = new THREE.PointLight(0xffffff, intensity)
      light.castShadow = true

      return light
    }

    const update = (renderer, scene, camera) => {
      renderer.render(scene, camera)

      requestAnimationFrame(() => update(renderer, scene, camera))
    }

    // const gui = new dat.GUI();

    const scene = new THREE.Scene()
    let enableFog = false

    if (enableFog) {
      scene.fog = new THREE.FogExp2(0x777777, 0.2)
    }

    const plane = getPlane(20)
    const pointLight = getPointLight(1)
    const sphere = getSphere(0.05)
    const boxGrid = getBoxGrid(10, 1.5)

    plane.name = 'plane-1'

    plane.rotateX(Math.PI / 2)
    pointLight.position.y = 1.25
    pointLight.intensity = 2

    // gui.add(pointLight, "intensity", 0, 10);
    // gui.add(pointLight.position, "y", 0, 5);

    scene.add(plane)
    pointLight.add(sphere)
    scene.add(pointLight)
    scene.add(boxGrid)

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    )
    camera.position.x = 1
    camera.position.y = 2
    camera.position.z = 5

    camera.lookAt(new THREE.Vector3(0, 0, 0))

    const renderer = new THREE.WebGLRenderer()
    renderer.shadowMap.enabled = true
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x777777)

    document.getElementById('webgl').appendChild(renderer.domElement)

    let controls = new OrbitControls(camera, renderer.domElement)
    update(renderer, scene, camera, controls)
  }

  render() {
    return (
      <div>
        <script src="https://ajax.googleapis.com/ajax/libs/threejs/r84/three.min.js" />
        <div id="webgl" />
      </div>
    )
  }
}
