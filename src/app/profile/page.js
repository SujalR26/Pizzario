"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import UserTabs from "../../components/layout/UserTabs";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image,setImage]=useState('');
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin,setIsAdmin] =useState(false);
  const [profileFetched,setProfileFetched]=useState(false);
  const status = session.status;
  const [userImage,setUserImage ]= useState(session.data?.user.image||'');
  function abc(){
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setUserImage(data.image);
        setUserName(data.name);
        setPhone(data.phone);
        setPostalCode(data.postalCode);
        setCity(data.city);
        setCountry(data.country);
        setStreetAddress(data.streetAddress);
        setIsAdmin(data.admin);
        setProfileFetched(true);
      });
    });
  }

  useEffect(() => {
    if (status === "authenticated") {
      abc();
    }
  }, [session, status]);

  async function handleImageUpdate(e) {
    e.preventDefault(); 
    const updatePromise = fetch("/api/upload", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }), 
    }).then(async (response) => {
      if (response.ok) {
        return await response.json().then((data) => {
          session.data.user.image=data.image;
          abc();
          setImage("");
        });
      }
      throw new Error("Failed to update image");
    });
  
    await toast.promise(updatePromise, {
      loading: "Updating image...",
      success: "Image updated!",
      error: "Image update failed.",
    });
  }
  async function handleProfileInfoUpdate(e) {
    e.preventDefault();
    const savingPromise = fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userName,
        streetAddress,
        phone,
        postalCode,
        city,
        country,
      }),
    }).then(async (response) => {
      if (response.ok) {
        return await response.json().then((data) => {
          setUserName(session.data.user.name);
        });
      }
      throw new Error("Something went wrong");
    });

    await toast.promise(savingPromise, {
      loading: "Saving...!",
      success: "Profile Saved!",
      error: "Some error occurred",
    });
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-4 ">
     <UserTabs isAdmin={isAdmin}></UserTabs>

      <div className="max-w-xl mx-auto mt-8">
        <div className="md:flex gap-4 items-start">
          <div >
            <div className=" rounded-lg p-2 relative ">
            {userImage ? (
              <>
                <img
                  className="rounded-lg max-w-44 mb-1"
                  src={userImage}
                  width={250}
                  height={250}
                  alt="avatar"
                />
                  <input type="text" className="max-w-44" placeholder="Enter Image URL to change" value={image} onChange={(e) => setImage(e.target.value)}></input>
                  <button className=" block border rounded-lg px-2 py-2 text-center bg-primary text-white whitespace-nowrap max-w-44" onClick={handleImageUpdate}>Update Image</button>
              </>
              ) : (
              <div className="placeholder-avatar">
                <div className="bg-gray-200 p-4 mb-2 rounded-lg text-center text-gray-600">No image</div>
                <input type="text" placeholder="Enter Image URL to change" value={image} onChange={(e) => setImage(e.target.value)}></input>
                <button type="button" onClick={handleImageUpdate}>Edit Image</button>
              </div>
              )}
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>First and last name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="First and last name"
            ></input>
            <label>Email</label>
            <input
              type="text"
              disabled={true}
              value={session.data?.user.email}
              placeholder="email"
            ></input>
            <label>Phone No.</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone no."
            ></input>
            <label>Street address</label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="Street address"
            ></input>
            <div className="flex gap-2 ">
                <div>
                    <label>Pin Code</label>
                    <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Postal code"
                    ></input>
                </div>
                <div>
                    <label>City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                    ></input>
                </div>
            </div>
            <label>Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            ></input>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
