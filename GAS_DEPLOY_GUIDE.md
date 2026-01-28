# Google Apps Script 배포 가이드

Figma 플러그인에서 구글 시트에 데이터를 **자동 저장(쓰기)**하고 **동기화(읽기)**하기 위해 필요한 중간 서버 코드입니다.

---

## 1. 구글 시트 준비
1.  새 구글 스프레드시트를 만듭니다 (또는 아까 만든 것 사용).
2.  상단 메뉴에서 **[확장 프로그램]** > **[Apps Script]**를 클릭합니다.

## 2. 코드 붙여넣기
1.  Apps Script 에디터가 열리면, 기존 `Code.gs`의 내용을 모두 지웁니다.
2.  아래 코드를 복사해서 붙여넣습니다.
3.  `Ctrl + S`를 눌러 저장합니다. (프로젝트 이름은 아무거나 상관없습니다, 예: `MenuAssistBackend`)

```javascript
/* Code.gs */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); // 동시성 제어

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheets()[0]; // 첫 번째 시트 사용

    // 요청 데이터 파싱
    const postData = JSON.parse(e.postData.contents);
    const { keyword, description, concept, componentSetKey, componentSetName, variants } = postData;

    // 헤더 확인 및 생성 (없으면 생성)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["keyword", "description", "concept", "componentSetKey", "componentSetName", "variants"]);
    }

    // 유효성 검사: 중복 키워드 확인
    if (sheet.getLastRow() > 0) {
      const data = sheet.getDataRange().getValues();
      // 기존 데이터(2번째 줄부터)에서 키워드(0번 컬럼) 비교
      const isDuplicate = data.slice(1).some(row => row[0] === keyword);
      
      if (isDuplicate) {
         return ContentService.createTextOutput(JSON.stringify({ 
          "result": "error", 
          "message": `이미 등록된 키워드입니다: ${keyword}` 
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // 데이터 추가
    sheet.appendRow([
      keyword,
      description,
      concept,
      componentSetKey,
      componentSetName,
      JSON.stringify(variants) // JSON 배열을 문자열로 저장
    ]);

    return ContentService.createTextOutput(JSON.stringify({ 
      "result": "success", 
      "message": "등록 완료" 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ 
      "result": "error", 
      "message": e.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  // 간단한 데이터를 읽어오는 기능 (테스트용)
  // 실제 플러그인 동기화는 CSV 발행 링크를 써도 되지만, 
  // 여기서 JSON으로 직접 리턴해줄 수도 있습니다.
  
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = doc.getSheets()[0];
  const data = sheet.getDataRange().getValues();
  
  // 첫 줄(헤더)을 키로 사용하여 JSON 객체 배열로 변환
  const headers = data[0];
  const rows = data.slice(1);
  
  const result = rows.map(row => {
    let obj = {};
    headers.forEach((header, i) => {
      // variants 컬럼은 다시 JSON으로 파싱해서 내려줌
      if (header === 'variants' && row[i]) {
        try {
          obj[header] = JSON.parse(row[i]);
        } catch(err) {
          obj[header] = row[i];
        }
      } else {
        obj[header] = row[i];
      }
    });
    return obj;
  });

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. 배포하기 (중요!)

이 단계가 가장 중요합니다. 정확히 따라 해주세요.

1.  우측 상단 **[배포]** 버튼 > **[새 배포]** 클릭.
2.  유형 선택(톱니바퀴 아이콘) > **[웹 앱]** 선택.
3.  설정:
    *   **설명**: (예: v1)
    *   **다음 사용자 계정으로 실행**: `나(Me)` (변경하지 마세요)
    *   **액세스 권한이 있는 사용자**: **`모든 사용자` (Anyone)** - **★이걸 꼭 선택해야 합니다.**
4.  **[배포]** 버튼 클릭.
5.  권한 승인 창이 뜨면:
    *   `권한 검토` 클릭 > 계정 선택 > `고급` 클릭 > `...으로 이동(안전하지 않음)` 클릭 > `허용` 클릭.
6.  **웹 앱 URL**이 생성됩니다. 이 주소(`https://script.google.com/macros/s/.../exec`)를 **복사**해두세요.

---

## 4. 플러그인 설정
이제 Figma 플러그인으로 돌아가서, 이 **웹 앱 URL**을 입력하면 모든 준비가 끝납니다.
