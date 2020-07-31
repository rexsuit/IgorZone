import React from 'react'
/** @jsx jsx */
import { jsx } from 'theme-ui'
import * as THREE from 'three'
import LayoutEmpty from '../../components/LayoutEmpty'
import { resizeIfNeeded } from '../../util/ThreeUtils'

export default function Cube() {
  React.useEffect(() => {
    const canvas = document.querySelector('#c') as HTMLCanvasElement
    const renderer = new THREE.WebGLRenderer({ canvas })

    const fov = 75
    const aspect = 2 // the canvas default
    const near = 0.1
    const far = 5
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 2

    const boxWidth = 1
    const boxHeight = 1
    const boxDepth = 1
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 })
    const cube = new THREE.Mesh(geometry, material)

    const scene = new THREE.Scene()

    {
      const color = 0xffffff
      const intensity = 1
      const light = new THREE.DirectionalLight(color, intensity)
      light.position.set(-1, 2, 4)
      scene.add(light)
    }

    scene.add(cube)
    console.log(window.devicePixelRatio)

    function render(time) {
      time *= 0.001 // convert time to seconds

      resizeIfNeeded(renderer, camera)

      cube.rotation.x = time
      cube.rotation.y = time

      renderer.render(scene, camera)

      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  })
  return (
    <LayoutEmpty>
      <canvas id="c" />
    </LayoutEmpty>
  )
}
