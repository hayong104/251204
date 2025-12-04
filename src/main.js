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
            두 쌍의 대변이 각각 평행한다.
          </div>
          <div class="condition-tag">기본</div>
        </button>

        <button class="condition-card condition-card--disabled" disabled>
          <div class="condition-label">조건 2 (준비 중)</div>
          <div class="condition-text">
            앞으로 추가될 다른 조건입니다.
          </div>
          <div class="condition-tag">COMING SOON</div>
        </button>
      </div>

      <p class="helper-text">
        * 조건을 누르면, 그 조건이 맞는 도형인지 활동을 통해 확인하는 화면으로 이어지도록
        나중에 확장할 수 있습니다.
      </p>
    </section>
  </main>
`
