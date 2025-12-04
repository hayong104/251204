import './style.css'

const app = document.querySelector('#app')

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
            두 쌍의 대변이 각각 평행하하다.
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
