import React, { useState } from 'react';

function ProfilePage() {
  // State for holding user details
  const [userDetails, setUserDetails] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+123456789',
    address: '123 Main St, City, Country',
  });

  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit mode

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handler to toggle editing mode
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // Handler to save the changes
  const handleSave = () => {
    // Save user details (you can add a function to save it to a database)
    console.log('Saved details: ', userDetails);
    setIsEditing(false); // Exit editing mode after saving
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      
      <div className="border rounded-lg p-4 shadow-lg max-w-md mx-auto">
        {/* First Name */}
        <div className="mb-4">
          <label className="block font-bold">First Name</label>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          ) : (
            <p>{userDetails.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block font-bold">Last Name</label>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          ) : (
            <p>{userDetails.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-bold">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          ) : (
            <p>{userDetails.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block font-bold">Phone</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          ) : (
            <p>{userDetails.phone}</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block font-bold">Address</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={userDetails.address}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          ) : (
            <p>{userDetails.address}</p>
          )}
        </div>

        {/* Edit/Save Button */}
        <div className="flex justify-end gap-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          ) : (
            <button
              onClick={toggleEditing}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
          )}
          {isEditing && (
            <button
              onClick={toggleEditing}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
