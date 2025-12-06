#!/bin/bash

URL="https://ticketing.dev/api/tickets/693300a973addef23a425952"
COOKIE="session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalk1TXpKbU1UVXpOalF3WVdGaU0yUmlaak5qWXpBd09TSXNJbVZ0WVdsc0lqb2laR1ZpUUdkdFlXbHNMbU52YlNJc0ltbGhkQ0k2TVRjMk5EazBPVEEyTlgwLnY3OTB3ekJpdkpQdVJzSFZYWEc0cUg0RzY1S1l6a2lLRkc0OFNpMkNJN28ifQ=="

for i in {1..200}
do
  curl -k -X PUT "$URL" \
    -H "Content-Type: application/json" \
    -H "Cookie: $COOKIE" \
    -d '{"title": "The finest women", "price": 500}' &

  curl -k -X PUT "$URL" \
    -H "Content-Type: application/json" \
    -H "Cookie: $COOKIE" \
    -d '{"title": "The finest women", "price": 505}' &
done

wait
echo "All parallel calls complete."
