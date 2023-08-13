#!/bin/bash

# Create or overwrite the .env file
echo "REACT_APP_BACKEND_URL=$(aws ssm get-parameters --output text --region ap-south-1 --names REACT_APP_BACKEND_URL --with-decryption --query Parameters[0].Value)" > /home/ec2-user/bookstore/.env

