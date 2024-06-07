# MeetYourDoctor
This is a web application for a medical appointment center to manage appointments. This is a Readme-Driven **MERN Stack** project.

## Collections 

### 1. Doctors 
+ **id** : ObjectId
+ name
+ contactNumber
+ whatsapp
+ email
+ specialization
+ educationAbbrivation : ex-: (MBBS / MD)
+ generalSlotDuration : general time taken by the doctor to examine one person.


### 2. General clinic hours details 
This collection stores the clinic details of doctors.

+ **id** : ObjectId
+ doctorId : doctor's id from the **doctors** collection.
+ roomNumber
+ clinicHours
+ maxPatients: maximum number patients per clinic session

### 3. Clinic Sessions
+ **id** : ObjectId
+ doctorId : id (from **doctors** collection) of the doctor to whom this session belongs.
+ roomNumber 
+ clinicHours : clinic hours of this clinic session.

### 4. Appointments
+ **id** : ObjectId
+ patientName
+ contactNo
+ address
+ doctorId : doctor's id from the **doctors** collection.
+ queueNumber
+ description 
+ clinicSession : clinicSessionId from **clinicSessions** collection.

