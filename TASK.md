## TASKIFY

### Task

- [x] 레이아웃
  - [x] 헤더
    - [x] 서비스명
    - [x] 카드 정렬 방식 변경 버튼
    - [x] 히스토리 버튼
  - [x] 칼럼
    - [x] 칼럼 명
    - [x] 카드 추가 버튼
    - [x] 칼럼 삭제 버튼
    - [x] 카드 목록
  - [x] 카드
    - [x] 카드 제목
    - [x] 카드 내용
    - [x] 카드 수정 버튼
    - [x] 카드 삭제 버튼
    - [x] 카드 생성 디바이스
  - [x] 활동 기록
    - [x] 활동 기록 출력
    - [x] 활동 기록 전체 삭제
- 코드 구조
  - index.html
  - style.css
  - app.js
  - controller
    - mainController.js
    - headerController.js
    - columnController.js
    - taskController.js
  - view
    - headerView.js
    - columnListView.js
    - columnView.js
    - taskView.js
  - model.js
  - component
    - historyItem.js
    - button.js
    - taskItem.js
    - editTaskItem.js
- 데이터 구조
  - 칼럼
    - 칼럼 ID
    - 칼럼 이름
  - 테스크
    - 테스크 ID
    - 테스크 이름
    - 테스크 내용
    - 테스크 생성 시간
    - 테스크 생성 디바이스 정보(Web, Android, iOS)
    - 칼럼 ID
  - 히스토리
    - 데이터(Column, Task)
    - 액션
    - 액션 시간
  - 사용자
    - 사용자 이름
    - 사용자 프로필 이미지
- [x] 작업 목록
  - [x] 메뉴(활동 기록)
    - [x] 히스토리 버튼 클릭 시 활동 기록 창 표시(화면 오른쪽에 숨겨져 있음)
    - [x] 닫기 버튼 클릭 시 활동 기록 창 닫기(화면 오른쪽으로 숨겨짐)
    - [x] 활동 기록 창
      - [x] 활동 기록 추가
        - [x] 등록
        - [x] 삭제
        - [x] 변경
        - [x] 이동
      - [x] 활동 기록 출력
        - [x] 사용자 이름
        - [x] 사용자 프로필
        - [x] 액션
          - [x] 액션 중요 키워드 볼드체 표시
        - [x] 액션 시간
      - [x] 활동 기록 전체 삭제
        - [x] 활동 기록 전체 삭제 버튼 클릭 시 활동 기록 전체 삭제 확인 창 표시
        - [x] 확인 버튼 클릭 시 활동 기록 전체 삭제
  - [x] 카드
    - [x] 새로운 카드 등록
      - [x] 칼럼 옆 `+` 버튼 클릭 시 새로운 카드 등록 창 표시
      - [x] `+` 버튼 다시 클릭 또는 취소 버튼 클릭 시 새로운 카드 등록 창 닫기
      - [x] 새로운 카드 등록 창
        - [x] 카드 제목 입력
        - [x] 카드 내용 입력
        - [x] 등록 버튼 클릭 시 새로운 카드 등록
      - [x] 카드 500자 제한
      - [x] 작성자의 디바이스 정보 표시
      - [x] 카드 등록 시 활동 기록 추가
    - [x] 카드 이동
      - [x] 카드 드래그 앤 드롭
        - [x] 드래그 앤 드롭 시 기존 카드 잔상
        - [x] 드래그 앤 드롭 시 드래그 중인 카드 이동
        - [x] 절반 이상 이동 시 카드 잔상 이동
        - [x] 드래그 앤 드롭 종료 시 잔상 위치로 카드 이동
      - [x] 카드 이동 시 활동 기록 추가
    - [x] 카드 삭제
      - [x] `X` 버튼 클릭 시 카드 삭제 확인 창 표시
        - [x] `X` 버튼 hover 시 빨간색으로 변경
      - [x] 확인 버튼 클릭 시 카드 삭제
    - [x] 카드 수정
      - [x] 카드 수정 버튼(연필 모양) 클릭 시 카드 등록 창과 동일한 창 표시
      - [x] 취소 버튼 클릭 시 수정 취소
      - [x] 저장 버튼 클릭 시 카드 수정
      - [x] 카드 수정 시 활동 기록 추가
    - [x] 카드 정렬 방식 변경
      - [x] 카드 정렬 방식 변경 버튼 클릭 시 카드 정렬 방식 변경
      - [x] 카드 정렬 방식
        - [x] 생성 순
        - [x] 최신 순
      - [x] 정렬이 변경될 때 애니메이션 추가

### Additional Task

- [x] 칼럼
  - [x] 칼럼명 수정 기능
    - [x] 칼럼 수정 버튼(연필 모양) 클릭 시 텍스트 필드 표시
    - [x] 텍스트 필드 외의 영역 클릭 시 수정 반영
    - [x] 칼럼명은 50자 제한
  - [x] 칼럼 추가 및 삭제
    - [x] 화면 우측 하단에 칼럼 추가 버튼 표시
    - [x] 칼럼 추가 버튼 클릭 시 기존의 칼럼 가장 오른쪽에 새로운 칼럼 추가
    - [x] 칼럼 추가 시 활동 기록 추가
    - [x] 칼럼 삭제 버튼 클릭 시 칼럼 삭제 확인 창 표시
    - [x] 확인 버튼 클릭 시 칼럼 삭제
    - [x] 칼럼 삭제 시 활동 기록 추가
- [x] 실행 취소 및 다시 실행
  - [x] 실행 취소 및 다시 실행 버튼 표시
  - [x] 실행 취소 버튼 클릭 시 이전 활동 취소
  - [x] 다시 실행 버튼 클릭 시 취소된 활동 다시 실행
  - [x] 실행 취소는 5회까지 가능
