curl -i -X POST http://localhost:8080/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","email":"jane.doe@example.com","password":"s3cretpw"}' \
  | jq .

  curl -X POST http://localhost:8080/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email":"jane.doe@example.com","password":"s3cretpw"}'

  {"message":"Signin Success","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkM2Y3YzZkLWNkMGMtNDNiZi1hNWMxLTBjZjk2MWI2YzExNCIsImlhdCI6MTc3NjE1MDcyOH0.nHpvudJGefroYgdWiWxZk1XtD6QRiJVNMgHx_mFTfFQ"}}% 


  curl -X POST http://localhost:8080/auth/movie/book \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkM2Y3YzZkLWNkMGMtNDNiZi1hNWMxLTBjZjk2MWI2YzExNCIsImlhdCI6MTc3NjE1MDcyOH0.nHpvudJGefroYgdWiWxZk1XtD6QRiJVNMgHx_mFTfFQ" \
  -d '{
    "movieTitle": "Inception",
    "showTime": "2024-12-25T18:30:00Z",
    "seatNumbers": ["A1", "A2", "A3"],
    "seatsCount": 3,
    "priceCents": 7500
  }'


    curl -X POST http://localhost:8080/auth/movie/book \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "movieTitle": "Inception",
    "showTime": "2024-12-25T18:30:00Z",
    "seatNumbers": ["A1", "A2", "A3"],
    "seatsCount": 3,
    "priceCents": 7500
  }'

  {"booking":{"id":"1bed13c2-557f-4565-ae13-70fe8803fca3","userId":"ad3f7c6d-cd0c-43bf-a5c1-0cf961b6c114","movieTitle":"Inception","showTime":"2024-12-25T18:30:00.000Z","seatNumbers":"[\"A1\",\"A2\",\"A3\"]","seatsCount":3,"priceCents":7500,"status":"confirmed","createdAt":"2026-04-14T09:09:06.013Z","updatedAt":"2026-04-14T09:09:05.922Z"}}%