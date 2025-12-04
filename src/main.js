import './style.css'

const app = document.querySelector('#app')

// 처음 화면(조건 선택 화면) 그리기
function renderHome() {
  app.innerHTML = `
    <main class="page">
      <header class="page-header">
        <h1>평행사변형이 될 조건</h1>
        <p class="page-subtitle">
          아래에서 오늘 활동에서 확인해 볼 조건을 선택해 보세요.
        </p>
      </header>

      <section class="condition-section">
        <h2 class="section-title">활동해서 확인할 조건 선택</h2>

        <div class="condition-grid">
          <button class="condition-card" data-condition="1">
            <div class="condition-label">조건 1</div>
            <div class="condition-text">
              두 쌍의 대변이 각각 평행하다.
            </div>
            <div class="condition-tag">기본 활동</div>
          </button>

          <button class="condition-card" data-condition="2">
            <div class="condition-label">조건 2</div>
            <div class="condition-text">
              두 쌍의 대변의 길이가 각각 같다.
            </div>
            <div class="condition-tag">길이 비교</div>
          </button>

          <button class="condition-card" data-condition="3">
            <div class="condition-label">조건 3</div>
            <div class="condition-text">
              두 쌍의 대각의 크기가 각각 같다.
            </div>
            <div class="condition-tag">각도 탐구</div>
          </button>

          <button class="condition-card" data-condition="4">
            <div class="condition-label">조건 4</div>
            <div class="condition-text">
              두 대각선이 서로 다른 것을 이등분한다.
            </div>
            <div class="condition-tag">대각선 탐구</div>
          </button>

          <button class="condition-card" data-condition="5">
            <div class="condition-label">조건 5</div>
            <div class="condition-text">
              한 쌍의 대변이 평행하고, 그 길이가 같다.
            </div>
            <div class="condition-tag">한 쌍의 대변</div>
          </button>
        </div>

        <p class="helper-text">
          * 마음에 드는 조건을 하나 골라 누른 뒤, 이 조건이 성립하는 도형이 어떤 모습인지
          함께 이야기해 보세요.
        </p>
      </section>
    </main>
  `

  attachHomeEvents()
}

// 각 조건 카드 클릭 시 활동 화면으로 이동
function attachHomeEvents() {
  const buttons = document.querySelectorAll('.condition-card')
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.condition
      renderActivity(id)
    })
  })
}

// 조건 정보
const conditions = {
  1: {
    title: '조건 1',
    description: '두 쌍의 대변이 각각 평행하다.',
  },
  2: {
    title: '조건 2',
    description: '두 쌍의 대변의 길이가 각각 같다.',
  },
  3: {
    title: '조건 3',
    description: '두 쌍의 대각의 크기가 각각 같다.',
  },
  4: {
    title: '조건 4',
    description: '두 대각선이 서로 다른 것을 이등분한다.',
  },
  5: {
    title: '조건 5',
    description: '한 쌍의 대변이 평행하고, 그 길이가 같다.',
  },
}

// 활동 상태 (선택된 점, 실행 기록, 사각형 꼭짓점, 평행선 자)
const activityState = {
  selectedPoint: null,
  actions: [],
  vertices: [],
  quadShape: null,
  parallelRulers: [],
}

// 활동 화면
function renderActivity(conditionId) {
  const condition = conditions[conditionId]

  activityState.selectedPoint = null
  activityState.actions = []
  activityState.vertices = []
  activityState.quadShape = null
  activityState.parallelRulers = []

  app.innerHTML = `
    <main class="page activity-page">
      <header class="page-header activity-header">
        <button type="button" class="back-button">
          ← 조건 선택으로 돌아가기
        </button>
        <div class="activity-titles">
          <h1>평행사변형 탐구 활동</h1>
          <p class="page-subtitle">
            선택한 조건: <strong>${condition.title}</strong>
          </p>
          <p class="activity-condition-text">
            ${condition.description}
          </p>
        </div>
      </header>

      <section class="activity-body">
        <div class="activity-main">
          <div id="grid-container" class="grid-container"></div>

          <div class="activity-controls">
            <button type="button" id="undo-button" class="control-button">
              직전에 만든 점·선 지우기
            </button>
            <button
              type="button"
              id="make-quad-button"
              class="control-button control-button--secondary"
              disabled
            >
              선택한 네 점으로 사각형 만들기
            </button>
            <button type="button" id="reset-button" class="control-button control-button--secondary">
              모두 지우기
            </button>
          </div>
        </div>

        <aside class="activity-side">
          <h2 class="section-title">활동 방법</h2>
          <ol class="activity-steps">
            <li>격자 위의 점을 한 번 클릭하여 첫 번째 점을 정합니다.</li>
            <li>다른 격자점을 한 번 더 클릭하면 두 점을 잇는 선분이 만들어집니다.</li>
            <li>이 과정을 반복하여 평행사변형이 될 수 있는 모양을 스스로 만들어 봅니다.</li>
            <li>실수했다면 <strong>“직전에 만든 점·선 지우기”</strong> 버튼으로 한 단계씩 되돌릴 수 있습니다.</li>
            <li>처음부터 다시 하고 싶다면 <strong>“모두 지우기”</strong> 버튼을 눌러 전체를 지웁니다.</li>
          </ol>
        </aside>
      </section>
    </main>
  `

  setupActivityEvents()
}

// 활동 화면 이벤트 연결
function setupActivityEvents() {
  const backButton = document.querySelector('.back-button')
  const undoButton = document.getElementById('undo-button')
  const resetButton = document.getElementById('reset-button')
  const makeQuadButton = document.getElementById('make-quad-button')
  const gridContainer = document.getElementById('grid-container')

  backButton.addEventListener('click', () => {
    renderHome()
  })

  const svg = createGridSvg()
  gridContainer.appendChild(svg)

  // 평행선 자 드래그용 상태
  let draggingRuler = null
  let lastMousePos = null

  svg.addEventListener('click', (event) => {
    const point = event.target.closest('.grid-point')
    if (!point) return
    handlePointClick(point, svg)
  })

  // 평행선 자 드래그 시작
  svg.addEventListener('mousedown', (event) => {
    const ruler = event.target.closest('.parallel-ruler')
    if (!ruler) return
    draggingRuler = ruler
    lastMousePos = { x: event.offsetX, y: event.offsetY }
  })

  // 드래그 중 위치 갱신
  svg.addEventListener('mousemove', (event) => {
    if (!draggingRuler || !lastMousePos) return

    const dx = event.offsetX - lastMousePos.x
    const dy = event.offsetY - lastMousePos.y

    const x1 = parseFloat(draggingRuler.getAttribute('x1'))
    const y1 = parseFloat(draggingRuler.getAttribute('y1'))
    const x2 = parseFloat(draggingRuler.getAttribute('x2'))
    const y2 = parseFloat(draggingRuler.getAttribute('y2'))

    draggingRuler.setAttribute('x1', String(x1 + dx))
    draggingRuler.setAttribute('y1', String(y1 + dy))
    draggingRuler.setAttribute('x2', String(x2 + dx))
    draggingRuler.setAttribute('y2', String(y2 + dy))

    lastMousePos = { x: event.offsetX, y: event.offsetY }
  })

  // 드래그 종료
  const stopDrag = () => {
    draggingRuler = null
    lastMousePos = null
  }
  svg.addEventListener('mouseup', stopDrag)
  svg.addEventListener('mouseleave', stopDrag)

  undoButton.addEventListener('click', handleUndo)
  resetButton.addEventListener('click', handleReset)
  makeQuadButton.addEventListener('click', () => handleMakeQuadrilateral(svg))
}

// 격자(SVG) 만들기
function createGridSvg() {
  const GRID_ROWS = 8
  const GRID_COLS = 8
  const CELL_SIZE = 50
  const PADDING = 24

  const width = PADDING * 2 + CELL_SIZE * (GRID_COLS - 1)
  const height = PADDING * 2 + CELL_SIZE * (GRID_ROWS - 1)

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
  svg.setAttribute('width', '100%')
  svg.setAttribute('height', '100%')
  svg.classList.add('grid-svg')

  // 세로선
  for (let c = 0; c < GRID_COLS; c++) {
    const x = PADDING + CELL_SIZE * c
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('x1', x)
    line.setAttribute('y1', PADDING)
    line.setAttribute('x2', x)
    line.setAttribute('y2', height - PADDING)
    line.classList.add('grid-line')
    svg.appendChild(line)
  }

  // 가로선
  for (let r = 0; r < GRID_ROWS; r++) {
    const y = PADDING + CELL_SIZE * r
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('x1', PADDING)
    line.setAttribute('y1', y)
    line.setAttribute('x2', width - PADDING)
    line.setAttribute('y2', y)
    line.classList.add('grid-line')
    svg.appendChild(line)
  }

  // 각 작은 정사각형 안의 양방향 대각선
  for (let r = 0; r < GRID_ROWS - 1; r++) {
    for (let c = 0; c < GRID_COLS - 1; c++) {
      const xLeft = PADDING + CELL_SIZE * c
      const xRight = PADDING + CELL_SIZE * (c + 1)
      const yTop = PADDING + CELL_SIZE * r
      const yBottom = PADDING + CELL_SIZE * (r + 1)

      // ↘ 대각선
      const diag1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      diag1.setAttribute('x1', xLeft)
      diag1.setAttribute('y1', yTop)
      diag1.setAttribute('x2', xRight)
      diag1.setAttribute('y2', yBottom)
      diag1.classList.add('grid-diagonal')
      svg.appendChild(diag1)

      // ↙ 대각선
      const diag2 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      diag2.setAttribute('x1', xRight)
      diag2.setAttribute('y1', yTop)
      diag2.setAttribute('x2', xLeft)
      diag2.setAttribute('y2', yBottom)
      diag2.classList.add('grid-diagonal')
      svg.appendChild(diag2)
    }
  }

  // 격자점
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      const x = PADDING + CELL_SIZE * c
      const y = PADDING + CELL_SIZE * r

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', x)
      circle.setAttribute('cy', y)
      circle.setAttribute('r', 4)
      circle.classList.add('grid-point')
      circle.dataset.row = String(r)
      circle.dataset.col = String(c)
      svg.appendChild(circle)
    }
  }

  return svg
}

// 점 클릭 → 점 선택 / 선분 그리기
function handlePointClick(point, svg) {
  const { selectedPoint } = activityState

  // 사각형 꼭짓점으로 등록 (최대 4개, 중복 클릭은 무시)
  if (activityState.vertices.length < 4) {
    const already = activityState.vertices.some((v) => v.element === point)
    if (!already) {
      activityState.vertices.push({
        element: point,
        x: Number(point.getAttribute('cx')),
        y: Number(point.getAttribute('cy')),
      })
    }
  }

  // 네 개의 점이 모였는지에 따라 버튼 활성/비활성
  const makeQuadButton = document.getElementById('make-quad-button')
  if (makeQuadButton) {
    makeQuadButton.disabled = activityState.vertices.length !== 4
  }

  // 첫 번째 점 선택
  if (!selectedPoint) {
    point.classList.add('grid-point--active')
    activityState.selectedPoint = point
    activityState.actions.push({ type: 'select', element: point })
    return
  }

  // 같은 점을 두 번 클릭하면 무시
  if (selectedPoint === point) {
    return
  }

  // 두 번째 점 선택 → 선분 생성
  const x1 = selectedPoint.getAttribute('cx')
  const y1 = selectedPoint.getAttribute('cy')
  const x2 = point.getAttribute('cx')
  const y2 = point.getAttribute('cy')

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  line.setAttribute('x1', x1)
  line.setAttribute('y1', y1)
  line.setAttribute('x2', x2)
  line.setAttribute('y2', y2)
  line.classList.add('segment-line')

  svg.appendChild(line)
  activityState.actions.push({ type: 'segment', element: line })

  selectedPoint.classList.remove('grid-point--active')
  activityState.selectedPoint = null
}

// 선택한 네 점으로 사각형 그리기
function handleMakeQuadrilateral(svg) {
  if (activityState.vertices.length !== 4) return

  // 기존 사각형이 있다면 제거
  if (activityState.quadShape) {
    activityState.quadShape.remove()
    activityState.quadShape = null
  }

  // 교차하는 선분이 없도록, 꼭짓점을 중심점 기준 각도 순으로 정렬
  const cx =
    activityState.vertices.reduce((sum, v) => sum + v.x, 0) / activityState.vertices.length
  const cy =
    activityState.vertices.reduce((sum, v) => sum + v.y, 0) / activityState.vertices.length

  const ordered = [...activityState.vertices].sort((a, b) => {
    const angleA = Math.atan2(a.y - cy, a.x - cx)
    const angleB = Math.atan2(b.y - cy, b.x - cx)
    return angleA - angleB
  })

  const pointsAttr = ordered.map((v) => `${v.x},${v.y}`).join(' ')

  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  polygon.setAttribute('points', pointsAttr)
  polygon.classList.add('quad-polygon')

  // 격자선보다 위, 점보다 아래에 오도록 끝부분에 추가
  svg.appendChild(polygon)
  activityState.quadShape = polygon

  // 사각형 위를 클릭했을 때, 가장 가까운 변을 기준으로 평행선 자 생성
  polygon.addEventListener('click', (event) => {
    const rect = svg.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickY = event.clientY - rect.top
    createParallelRulerFromEdge(svg, clickX, clickY)
  })
}

// 사각형의 한 변을 선택해 평행선 자 생성
function createParallelRulerFromEdge(svg, clickX, clickY) {
  if (!activityState.quadShape || activityState.vertices.length !== 4) return

  // 기존 평행선 자 제거
  activityState.parallelRulers.forEach((ruler) => ruler.remove())
  activityState.parallelRulers = []

  const verts = activityState.vertices
  let bestIndex = 0
  let bestDist = Infinity

  // 클릭한 위치에서 가장 가까운 변 찾기
  for (let i = 0; i < 4; i++) {
    const a = verts[i]
    const b = verts[(i + 1) % 4]
    const ax = a.x
    const ay = a.y
    const bx = b.x
    const by = b.y

    const vx = bx - ax
    const vy = by - ay
    const wx = clickX - ax
    const wy = clickY - ay

    const len2 = vx * vx + vy * vy || 1
    let t = (vx * wx + vy * wy) / len2
    t = Math.max(0, Math.min(1, t))

    const px = ax + t * vx
    const py = ay + t * vy
    const dist = Math.hypot(clickX - px, clickY - py)

    if (dist < bestDist) {
      bestDist = dist
      bestIndex = i
    }
  }

  const a = verts[bestIndex]
  const b = verts[(bestIndex + 1) % 4]

  const ruler = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  ruler.setAttribute('x1', String(a.x))
  ruler.setAttribute('y1', String(a.y))
  ruler.setAttribute('x2', String(b.x))
  ruler.setAttribute('y2', String(b.y))
  ruler.classList.add('parallel-ruler')

  svg.appendChild(ruler)
  activityState.parallelRulers.push(ruler)
}

// 직전 점/선 되돌리기
function handleUndo() {
  const last = activityState.actions.pop()
  if (!last) return

  if (last.type === 'segment') {
    last.element.remove()
  } else if (last.type === 'select') {
    last.element.classList.remove('grid-point--active')
    if (activityState.selectedPoint === last.element) {
      activityState.selectedPoint = null
    }
  }
}

// 전체 초기화
function handleReset() {
  activityState.actions.forEach((action) => {
    if (action.type === 'segment') {
      action.element.remove()
    } else if (action.type === 'select') {
      action.element.classList.remove('grid-point--active')
    }
  })

  activityState.actions = []
  activityState.selectedPoint = null

  // 사각형 및 꼭짓점 정보 초기화
  if (activityState.quadShape) {
    activityState.quadShape.remove()
    activityState.quadShape = null
  }
  activityState.vertices = []

  // 평행선 자 제거
  activityState.parallelRulers.forEach((ruler) => ruler.remove())
  activityState.parallelRulers = []

  const makeQuadButton = document.getElementById('make-quad-button')
  if (makeQuadButton) {
    makeQuadButton.disabled = true
  }
}

// 시작 시 처음 화면 보여주기
renderHome()
