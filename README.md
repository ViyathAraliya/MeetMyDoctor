# MeetMyDoctor

## Overview

This web application enables the patients/people to book doctor's appointments at the medical appointment center which is registered with this application(Note : This application is exclusive to the medical appointment center, not shared among medical appointment centers). Patients can make doctor's appointments online and the medical appointment center can manage relavant data collections by this application. This application uses **MongoDB** as the database, **Express.js** for backend API development, **React.js** for client-side and **Node.js** for server-side proccessiong. This Application does not perform highly regulated actions like finacial transacations. Therefore there is no need to have highly structured data schema,  hence I opted for MERN Stack methodolgy for fast development and flexibility. 


# Technical Info



## Data Collections 
*MongoDB* will be used to store data. The application will use following data collections.

### Model: Doctor
- Description: Doctors who visit the Medical Appointment Center.
- Fields: 
    + **id** : 
        - Description: Unique identifier to for the Doctor document.     
        - Type: ObjectId (MongoDB ObjectId)
    + name
        - Description: Name of the doctor.
        - Type: String
        - Required: Yes
    + contactNumber
        - Description: Contact number of the doctor.
        - Type: String
        - Requieed: Yes
    + whatsapp(optional)
        - Descripion: Whatsapp number of the doctor. 
        - Type: String
        - Required: No
    + email(optional)
        - Description: Email address of the doctor.
    + specialization
        - Description: The area of medical expertise. 
        - Type; String
    + educationAbbrivation : 
        - Description: Abbrivation for the highest educational degree obtained by the doctor       (MBBS / MD)
        - Type: String
    + generalSlotDuration : g
        - Description:  General / average time taken by the doctor to examine one patient
        - Type: Number 

### Model: Room
- Description: Rooms where the Clinic Sessions will be held.
- Fields:

    + **id** 
        - Description: Unique identifier for the Doctor document.     
        - Type: ObjectId (MongoDB ObjectId)
    + roomNumber  
        - Description: A human readable number to identify the room.
        - Type: Number
        - Unique: Yes
        - Require: Yes
    + clinicSessions
        - Description: The list of upcoming Clinic Sessions upto one month that wil be held in this Room.
        - Type:  ObjectId (MongoDB ObjectId)

### Model: Clinic Session
- Description: Clinic Session for a specif Room. 
- Fields: 
    + **id** 
        - Description: Unique identifier for the Doctors document.
        - Type:  ObjectId (MongoDB ObjectId)
    + doctorId 
        - Description: id of the Doctor document related to the Clinic Session.
        - Type: ObjectId(MongoDB ObjectId)
        - Required: Yes
    +    roomId
        - Description: id of the Room document related to this Clinic Session.
        - Type: ObjectId (MongoDB ObjectId)
        -  Required: Yes
    + startsAt
        - Type: Date Time
        - Required: Yes
    + endsAt
        - Type: Date Time
        -  Required: Yes
    + currentQueueSize: number of patients registered at the moment
    + maxQueueSize : (patientsPerHour from ClinicSessionDetail)*clinicHours

### Model: Appointment
- Description: Appointment details
- Fields: 
    + **id** 
        - Description: Unique identifier for the Doctors document.
        - Type:  ObjectId (MongoDB ObjectId)
    + patientName
        - Description: Name of the patient.
        - Type: String
        - Required: Yes
    + contactNo
        - Description: Contact number
        - Type: String
        - Required: Yes
    + address
        - Description: Contact number
        - Type: String
        - Required: Yes
    + doctorId 
        - Description: doctor's id from the **doctors** collection.
        - Type:  ObjectId (MongoDB ObjectId)
        - Required: Yes
    + queueNumber
        - Description: queue number
        - Type: Number
        - Required: Yes
    + description 
        - Description: any additional information about patient, example:- Symptoms, Disease
        - Type: String
        - Required: No
    + clinicSession 
        - Descritpion: id from related Clinic Sessio document.
        - Type: ObjectId (MongoDB ObjectId)
        - Required: Yes

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





