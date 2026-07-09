(function() {
  const searchRoutes = [
    {
      keywords: ['와이파이', 'wifi', 'wi-fi', '인터넷', '무선인터넷', '비밀번호', '비번'],
      url: 'stay.html#wifi',
      label: 'Wi-Fi 안내'
    },
    {
      keywords: ['체크인', '입실', '체크아웃', '퇴실', '연장', '레이트체크아웃'],
      url: 'stay.html#check',
      label: '체크인 · 체크아웃'
    },
    {
      keywords: ['에어컨', 'tv', '티비', '리모컨', '객실문', '문소리', '알림음'],
      url: 'stay.html#room-guide',
      label: '객실 이용 안내'
    },
    {
      keywords: ['조식', '한뜰', '아침', '식사', 'breakfast', '조식권', '조식시간', '조식금액'],
      url: 'stay.html#breakfast',
      label: '조식 안내'
    },
    {
      keywords: ['오름카페', '오름', 'bbq', '바비큐', '다이닝', '식음'],
      url: 'stay.html#cafe',
      label: '오름카페 안내'
    },
    {
      keywords: ['주차', '차량번호', '주차장'],
      url: 'stay.html#parking',
      label: '주차 안내'
    },
    {
      keywords: ['짐보관', '짐', '수하물', '수건', '대여', '충전기', '컨버터', '와인오프너', '오프너', '배달음식'],
      url: 'service.html#service',
      label: '고객 서비스 안내'
    },
    {
      keywords: ['편의점', 'cu', '씨유', '무인', '운영시간', '전자레인지', '생수'],
      url: 'service.html#facility',
      label: '편의시설 안내'
    },
    {
      keywords: ['정수기', '물', '냉수', '온수'],
      url: 'service.html#water',
      label: '정수기 안내'
    },
    {
      keywords: ['gym', '헬스장', '피트니스', '운동'],
      url: 'service.html#gym',
      label: 'GYM 안내'
    },
    {
      keywords: ['택시', '교통', '카카오택시'],
      url: 'service.html#transport',
      label: '교통 안내'
    },
    {
      keywords: ['분실물', 'lost', '분실'],
      url: 'service.html#lost',
      label: '분실물 안내'
    },
    {
      keywords: ['흡연', '금연', '담배', '취사', '소음', '방충망', '카드키'],
      url: 'policy.html#room-policy',
      label: '객실 이용 기준'
    },
    {
      keywords: ['청소', '객실정비', '정비', '쓰레기', '수거', '방해금지'],
      url: 'policy.html#housekeeping',
      label: '객실 정비 안내'
    },
    {
      keywords: ['비상', '화재', '응급', '안전', '비상구'],
      url: 'policy.html#safety',
      label: '비상 · 안전 안내'
    },
    {
      keywords: ['공지', '유의', '안내사항'],
      url: 'policy.html#notice',
      label: '이용 유의사항'
    },
    {
      keywords: ['주변', '식당', '관광지', '지도', '카페', '카페추천', '맛집', '비오는날', '비 오는 날', '우천', '근처'],
      url: 'nearby.html',
      label: '주변 안내'
    },
    {
      keywords: ['제휴', '혜택', '할인', '이벤트', '파더스가든', '산양큰엉곶', '탄산온천', '항공우주박물관', '유람선', '루나폴'],
      url: 'benefits.html',
      label: '제휴 혜택 안내'
    },
    {
      keywords: ['faq', '문의', '질문', '자주묻는질문', '자주 묻는 질문'],
      url: 'faq.html',
      label: '자주 묻는 질문'
    }
  ];

  function normalize(value) {
    return value.toLowerCase().replace(/\s+/g, '').replace(/[·ㆍ]/g, '');
  }

  function ensureSearchOverlay() {
    let overlay = document.getElementById('searchOverlay');

    if (overlay) {
      return overlay;
    }

    overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.id = 'searchOverlay';
    overlay.innerHTML = [
      '<div class="search-panel">',
      '  <div class="search-panel-head">',
      '    <div>',
      '      <div class="search-label">Search</div>',
      '      <h2>필요한 안내를 검색해 주세요</h2>',
      '    </div>',
      '    <button class="search-close" type="button" aria-label="검색 닫기">×</button>',
      '  </div>',
      '  <p>예: 수건, 정수기, 전자레인지, 체크아웃</p>',
      '  <form id="guideSearchForm" class="search-form">',
      '    <input id="guideSearchInput" type="search" placeholder="검색어를 입력해 주세요" autocomplete="off" />',
      '    <button type="submit">검색</button>',
      '  </form>',
      '  <div id="searchMessage" class="search-message"></div>',
      '</div>'
    ].join('');

    document.body.appendChild(overlay);
    return overlay;
  }

  function pushDataLayer(payload) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  }

  function initMenuTracking() {
    const trackedLinks = document.querySelectorAll('[data-track-area]');

    trackedLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        pushDataLayer({
          event: 'guide_menu_click',
          menu_area: link.dataset.trackArea,
          menu_item: link.dataset.trackItem,
          menu_target: link.getAttribute('href')
        });
      });
    });
  }

  function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');

    if (!searchToggle) {
      return;
    }

    const searchOverlay = ensureSearchOverlay();
    const searchClose = searchOverlay.querySelector('.search-close');
    const searchForm = searchOverlay.querySelector('#guideSearchForm');
    const searchInput = searchOverlay.querySelector('#guideSearchInput');
    const searchMessage = searchOverlay.querySelector('#searchMessage');

    function openSearch() {
      searchOverlay.classList.add('is-open');
      document.body.classList.add('search-open');

      pushDataLayer({
        event: 'guide_search_open'
      });

      setTimeout(function() {
        searchInput.focus();
      }, 120);
    }

    function closeSearch() {
      searchOverlay.classList.remove('is-open');
      document.body.classList.remove('search-open');
      searchMessage.textContent = '';
      searchInput.value = '';
    }

    searchToggle.addEventListener('click', openSearch);
    searchClose.addEventListener('click', closeSearch);

    searchOverlay.addEventListener('click', function(event) {
      if (event.target === searchOverlay) {
        closeSearch();
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && searchOverlay.classList.contains('is-open')) {
        closeSearch();
      }
    });

    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const rawTerm = searchInput.value.trim();
      const searchTerm = normalize(rawTerm);

      if (!searchTerm) {
        searchMessage.textContent = '검색어를 입력해 주세요.';
        return;
      }

      const matchedRoute = searchRoutes.find(function(route) {
        return route.keywords.some(function(keyword) {
          return searchTerm.includes(normalize(keyword));
        });
      });

      if (matchedRoute) {
        pushDataLayer({
          event: 'guide_search',
          search_term: rawTerm,
          search_result: matchedRoute.label,
          search_target: matchedRoute.url
        });

        const targetUrl = new URL(matchedRoute.url, window.location.href);
        const samePage = targetUrl.pathname === window.location.pathname;

        window.location.href = matchedRoute.url;

        if (samePage && targetUrl.hash) {
          setTimeout(function() {
            window.location.reload();
          }, 30);
        }
      } else {
        pushDataLayer({
          event: 'guide_search_no_result',
          search_term: rawTerm
        });

        searchMessage.textContent = '검색 결과가 없습니다. 예: 수건, 정수기, 전자레인지, 체크아웃';
      }
    });
  }

  initMenuTracking();
  initSearch();
})();
