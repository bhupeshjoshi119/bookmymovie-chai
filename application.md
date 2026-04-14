#create a user

curl -i -X POST http://localhost:8080/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","email":"jane.doe@example.com","password":"s3cretpw"}' \
  | jq .


  ### user sign in

  curl -X POST http://localhost:8080/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email":"jane.doe@example.com","password":"s3cretpw"}'
{"message":"Signin Success","data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3OWQ1MDA0LTlmMDEtNGVjNS1hYTA1LTIyNjA4MmQ5YzA4NiIsImlhdCI6MTc3NjE2NzA4NH0.MFlCqDr54AU4-MUEA47uqUd1LxwfhdEZX0C1-eCuA5E"}}

### get your authenticated user:

curl -X GET http://localhost:8080/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3OWQ1MDA0LTlmMDEtNGVjNS1hYTA1LTIyNjA4MmQ5YzA4NiIsImlhdCI6MTc3NjE2NzA4NH0.MFlCqDr54AU4-MUEA47uqUd1LxwfhdEZX0C1-eCuA5E"
{"firstName":"Jane","lastName":"Doe","email":"jane.doe@example.com"}


## book a movie

curl -X POST http://localhost:8080/auth/movie/book \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3OWQ1MDA0LTlmMDEtNGVjNS1hYTA1LTIyNjA4MmQ5YzA4NiIsImlhdCI6MTc3NjE2NzA4NH0.MFlCqDr54AU4-MUEA47uqUd1LxwfhdEZX0C1-eCuA5E" \
  -d '{                       
    "movieTitle": "Inception",         
    "showTime": "2024-12-25T18:30:00Z",
    "seatNumbers": ["A1", "A2", "A3"],
    "seatsCount": 3,  
    "priceCents": 7500
  }'
{"booking":{"id":"037f2c63-2fe1-4efb-9224-d381069b12d5","userId":"279d5004-9f01-4ec5-aa05-226082d9c086","movieTitle":"Inception","showTime":"2024-12-25T18:30:00.000Z","seatNumbers":"[\"A1\",\"A2\",\"A3\"]","seatsCount":3,"priceCents":7500,"status":"confirmed","createdAt":"2026-04-14T11:49:09.058Z","updatedAt":"2026-04-14T11:49:09.033Z"}}


