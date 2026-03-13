export type State = 'GREEN' | 'YELLOW' | 'RED'

const MINUTE = 1000 * 60
const deadline = new Date().getTime() + MINUTE * 45

function getState(msRemaining: number): State {
  const minutes = msRemaining / 60000

  if (minutes > 30) return 'GREEN'
  if (minutes > 10) return 'YELLOW'
  return 'RED'
}

const model = {
  GREEN: {
    permission: 'Start tasks',
    action: 'Keep working'
  },
  YELLOW: {
    permission: 'Wrap only',
    action: 'Prepare to transition'
  },
  RED: {
    permission: 'No new tasks',
    action: 'Move now'
  }
}

export function initApp(app: HTMLElement) {
  function render() {
    const now = Date.now()
    const remaining = deadline - now
    const minutes = Math.max(0, Math.floor(remaining / 60000))
    const seconds = Math.max(0, Math.floor((remaining % 60000) / 1000))

    const state = getState(remaining)
    const current = model[state]

    app.innerHTML = `
    <main style="
      font-family: Arial;
      min-height: 100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      background:#111;
      color:white;
    ">
      <section style="
        width:360px;
        padding:24px;
        border-radius:16px;
        background:#1a1a1a;
        text-align:center;
      ">

        <div style="opacity:.7">STATE</div>
        <div style="font-size:36px">${state}</div>

        <div style="opacity:.7;margin-top:16px">PERMISSION</div>
        <div style="font-size:20px">${current.permission}</div>

        <div style="opacity:.7;margin-top:16px">ACTION</div>
        <div style="font-size:20px">${current.action}</div>

        <div style="margin-top:24px;font-size:18px">
          ${minutes}:${seconds.toString().padStart(2,'0')}
        </div>

      </section>
    </main>
    `
  }

  setInterval(render, 1000)
  render()
}