# Car management dashboard

Adalah aplikasi untuk manajemen data mobil.

## Database Diagram

aplikasi ini menggunakan modul sequelize yang
digunakan untuk mengurus koneksi ke
database. berikut databasenya:

![diagram](public/images/dokumentasi/db_diagram.png)


#### API

port= localhost:8000

**View Dasboard**

- `/cars`(GET) = halaman menampilkan semua data car
- `/cars/create` (GET) = ini halaman untuk create new car
- `/cars/edit/:id` (GET) = ini halaman untuk edit car

**Action API for Dashboard**

- `/cars/admin/create` (POST) = ini API action untuk create new car
- `/cars/admin/edit/:id` (POST) = ini API action untuk update car
- `/cars/admin/delete/:id` (POST) = ini API action untuk delete car

**Action API Backend for Postman**
- `localhost:8000/api/v1/cars`(GET) = Postman menampilkan semua data car
- `localhost:8000/api/v1/cars/:id`(GET) = Postman menampilkan data car by id
- `localhost:8000/api/v1/cars`(POST) = Postman membuat data car baru

