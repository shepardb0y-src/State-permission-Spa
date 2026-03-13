import { initApp } from './app'

const app = document.getElementById('app')

if (!app) {
  throw new Error('No #app element found')
}

initApp(app)