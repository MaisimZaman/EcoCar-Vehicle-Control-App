import firebase_admin
from firebase_admin import credentials
from firebase_admin import db


#We will replace these with signals read from the actual car
drive_status = "Parked"
battery_range = 268
longitude_lattitude = [43.473071781737666, -80.54019785684477]



firebase_admin.initialize_app(cred, {
    
})

is_locked_status_ref = db.reference('isLocked/')
temp_status_ref = db.reference('temperature/')
drive_status_ref = db.reference('drive_status/')
battery_range_ref = db.reference('battery_range/')
car_location_ref = db.reference('car_location/')

drive_status_ref.set({
    'status': drive_status
})

battery_range_ref.set({
    'range': battery_range
})

car_location_ref.set({
    'position': longitude_lattitude
})




while True:
    #Will need to write these values into the car
    print(is_locked_status_ref.get())
    print(temp_status_ref.get())