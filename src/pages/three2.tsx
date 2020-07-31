import React from 'react'
/** @jsx jsx */
import { jsx } from 'theme-ui'
import * as THREE from 'three'
import LayoutEmpty from '../components/LayoutEmpty'

export default function Three2() {
  React.useEffect(() => {
    const canvas = document.querySelector('#c') as HTMLCanvasElement
    const renderer = new THREE.WebGLRenderer({ canvas })

    const fov = 75
    const aspect = 2 // the canvas default
    const near = 0.1
    const far = 5
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 2

    const resizeRendererToDisplaySize = (renderer) => {
      const canvas = renderer.domElement
      const pixelRatio = window.devicePixelRatio
      const width = (window.innerWidth * pixelRatio) | 0
      const height = (window.innerHeight * pixelRatio) | 0
      const needResize = canvas.width !== width || canvas.height !== height
      if (needResize) {
        renderer.setSize(width, height, false)
      }
      return needResize
    }

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

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
      }

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
