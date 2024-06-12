# MeetMyDoctor

## Overview

This web application enables the patients/people to book doctor's appointments at the medical appointment center which is registered with this application(Note : This application is exclusive to the medical appointment center, not shared among medical appointment centers). Patients can make doctor's appointments online and the medical appointment center can manage relavant data collections by this application. This application uses **MongoDB** as the database, **Express.js** for backend API development, **React.js** for client-side and **Node.js** for server-side proccessiong. This Application does not perform highly regulated actions like finacial transacations. Therefore there is no need to have highly structured data schema,  hence I opted for MERN Stack methodolgy for fast development and flexibility. 


# Technical Info



## Data Collections 
*MongoDB* will be used to store data. The application will use following data collections.

### 1. Doctors 
+ **id** : ObjectId
+ name
+ contactNumber
+ whatsapp
+ email
+ specialization
+ educationAbbrivation : ex-: (MBBS / MD)
+ generalSlotDuration : general time taken by the doctor to examine one person.

### 2. Rooms

+ **id** : ObjectId
+ roomNumber  



### 3. Clinic Sessions
+ **id** : ObjectId
+ doctorId : id (from **doctors** collection) of the doctor to whom this session belongs.
+ roomId
+ startsAt
+ endsAt
+ currentQueueSize: number of patients registered at the moment
+ maxQueueSize : (patientsPerHour from ClinicSessionDetail)*clinicHours

### 3. Appointments
+ **id** : ObjectId
+ patientName
+ contactNo
+ address
+ doctorId : doctor's id from the **doctors** collection.
+ queueNumber
+ description 
+ clinicSession : clinicSessionId from **clinicSessions** collection.

## Back-end API developmemt

### Structure

- Server
    - controllers
        - DoctorController.js
        - ClinicSesstionController.js 
        - AppointmentsController.js
        - RoomController.js
    - models
        - Doctor.js
        - ClinicSession.js
        - Appointment.js
        - Room.js
    - app.js (Application Entry Point)
    - routes.js
- dtos
    - DoctorDto.js (same fields as in 'Doctor' model)
    - ClinicSessionDto.js
    - AppointmentDto.js
    - RoomDto.js (same fields as in 'Room' model)


### Technologies 
- *Express.js*

### Runtime environment 
- *Node.js*

### External Libraries

- *Mongoose* 





