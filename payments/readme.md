# update npm package

- `pnpm update @deb-ticketing/common`

# Saving ticket and publishing event

In this app, we have published an event to evenet bus as soon as we are saving a record to db, it is very much possible saving to database succeed and event publishing fails. Then it will be a disaster.

Here is a solution to this problem. Instead of immediately publishing an event, we can save to another collection/database table and keep a flag sent or not, then with another process we can keep automating that event publishing task.

There may be another scenario, when an saving record succeeed but saving event to db fails. To avoid this we can make use of database transaction. If one of the transaction fails, we rollback both the transation and throw error.
