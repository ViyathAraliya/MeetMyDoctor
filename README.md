# MeetMyDoctor

## Overview

This web application enables the patients/people to book doctor's appointments at the medical appointment center which is registered with this application(Note : This application is exclusive to the medical appointment center, not shared among medical appointment centers). Patients can make doctor's appointments online  and the medical appointment center can manage relavant data collections by this application. This application uses **MongoDB** as the database, **Express.js** for backend API development, **React.js** for client-side and **Node.js** for server-side proccessiong. This Application does not perform highly regulated actions like finacial transacations. Therefore there is no need to have highly structured data schema,  hence I opted for MERN Stack methodolgy for fast development and flexibility. 


# Technical Info



## Collection Structure
*MongoDB* will be used to store data. The application will use following data collections.

### Model: Doctor
- Description: Doctors who visit the Medical Appointment Center.
- Fields: 
    + **id** : 
        - Description: Unique identifier to for the Doctor document.     
        - Type: ObjectId (MongoDB ObjectId)
    + contactNumber
        - Description: Doctor is uniquly identified by Contact number.
        - Type: String
        - Required: Yes
        - Unique: yes
    + name
        - Description: Name of the doctor.
        - Type: String
        - Required: Yes
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
    + generalSlotDuration : 
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
    + **clinicSessions**
        - Description: Array of clinic sessions associated with this room.
        - Type: Array
        - Items:
            - Description: References to a 'Clinic Session' documents related to this room.
            - Type: ObjectId (MongoDB ObjectId)
            - unique: yes

### Model: Clinic Session
- Description: Clinic Session for a specif Room. An Clini Session Document and there references in Other docuements will be automatically be deleted once the relevant Clici Session ends. 
- Note : composite unique index 
- Fields: 
    + **id** 
        - Description: Unique identifier for the Doctors document.
        - Type:  ObjectId (MongoDB ObjectId)
    + doctorId 
        - Description: ObjecId of the Doctor document related to the Clinic Session.
        - Type: ObjectId(MongoDB ObjectId)
        - Required: Yes
    + roomId
        - Desctiption: ObjectId of the Room , where this clinic session will be conducted.
        - Type: ObjectID(MongoDB ObjectId)
        - Required: Yes
    + startsAt
        - Type: Date 
        - Required: Yes 
    + endsAt
        - Type: Date 
        - Required: Yes
    + **appointments**
        - Description: list of ObjectId references of Appointment documents related to this Clinic Session. 
        - Type: Array
        - Items:
            - Description: References to the 'Appointment' documents releted to this 'Clinic Session'.
            - Type: Apppintment object
            - Default : []
   
    + maxQueueSize 
        -maximum number of Appoinments the doctor can hanlde



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
   
    + queueNumber
        - Description: queue number
        - Type: Number
        - Requied: Yes
        
    + description 
        - Description: any additional information about patient, example:- Symptoms, Disease
        - Type: String
        - Required: Yes
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

### Functionalities
- Creation of all four models.
- Retirieving of all docuements of each model.




