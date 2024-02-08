mongosh --tlsAllowInvalidHostnames "mongodb://localhost:27017/dbname?ssl=true" --username dbroot --password $MONGO_DB_PASSWORD --tlsCAFile ../global-bundle.pem
