#create a user
curl -i -X POST http://localhost:8080/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","email":"jane.doe@example.com","password":"s3cretpw"}' \
  | jq .

### user sign in
