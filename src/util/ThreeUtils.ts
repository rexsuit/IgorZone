import * as THREE from 'three'

export const resizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => {
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

export const resizeIfNeeded = (
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
) => {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
  }
}
