## Webpage

조우제 교수님 연구용 웹사이트 (main)

### Way to deploy

1. package.json 파일에서 "homepage" : "deploy 하려는 domain name" 으로 변경.
2. npm run build 실행
3. (github에 배포시) 생성된 build 폴더 안의 index.html을 복사하고 복사된 파일 이름을 404.html로 변경
4. build 폴더 안의 static 폴더, 404.html, index.html, asset json 파일을 deploy하려는 플랫폼에 업로드
