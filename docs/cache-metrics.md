# Practical 9 — cache vs uncached GET /students

Record Postman "Time" values after login. Take at least 3 readings each.

| Sample | Uncached (ms) | Cached (ms) |
| ------ | ------------- | ----------- |
| 1      |               |             |
| 2      |               |             |
| 3      |               |             |

Notes:

- Cache key: `all_students`
- TTL: 60 seconds
- Invalidated on POST, PUT, and DELETE
- Debug counters: `GET /debug/cache`
