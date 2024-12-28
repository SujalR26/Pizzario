'use client'
import { useEffect, useState } from "react";
import UserTabs from "../../../components/layout/UserTabs";
import { useProfile } from "../../../components/menu/UseProfile";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function EditUserPage(){
    const [userName, setUserName] = useState("");
    const [image,setImage]=useState('');
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [userImage,setUserImage ]= useState('');
    const [admin,setAdmin]=useState("");
    const [user,setUser]=useState(null);
    const {loading,data}=useProfile();
    const {id}=useParams();
    
    
    useEffect(()=>{
        fetch('/api/profile?_id='+id).then(res=>{
            res.json().then(user=>{
                setUser(user);
                setUserName(user?.name);
                setPhone(user?.phone);
                setCity(user?.city);
                setStreetAddress(user?.streetAddress);
                setCountry(user?.country);
                setPostalCode(user?.postalCode);
                setUserImage(user?.image);
                setAdmin(user?.admin);
            })
        })
    },[])
    
    async function handleImageUpdate(e) {
        e.preventDefault(); 
        const updatePromise = fetch("/api/upload?_id="+id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image }), 
        }).then(async (response) => {
          if (response.ok) {
            return await response.json().then((data) => {
                setImage("");
                setUserImage(data.image);
            });
          }
          throw new Error("Failed to update image");
        });
      
        await toast.promise(updatePromise, {
          loading: "Updating image...",
          success: "Image updated!",
          error: "Image update failed.",
        });
        setUserImage(image);
        // setImage("");
        
      }
      async function handleProfileInfoUpdate(e) {
        e.preventDefault();
        const savingPromise = fetch("/api/profile?_id="+id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userName,
            streetAddress,
            phone,
            postalCode,
            city,
            country,
            admin
          }),
        }).then(async (response) => {
          if (response.ok) {
            return await response.json().then((data) => {
                setUserName(data.name);
                setPhone(data.phone);
                setCity(data.city);
                setStreetAddress(data.streetAddress);
                setCountry(data.country);
                setPostalCode(data.postalCode);
                setAdmin(data.admin);
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
      

    if(loading){
        return 'Loading user profile...';
    }
    if(!data.admin){
        return 'Not an admin';
    }

    return(
        <section className="mt-4 ">
             <UserTabs isAdmin={true}></UserTabs>
        
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
                  <form className="grow">
                    <label>First and last name</label>
                    <input
                      type="text"
                      value={userName || ''}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="First and last name"
                    ></input>
                    <label>Email</label>
                    <input
                      type="text"
                      disabled={true}
                      value={user?.email || ''}
                      placeholder="email"
                    ></input>
                    <label>Phone No.</label>
                    <input
                      type="tel"
                      value={phone || ''}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone no."
                    ></input>
                    <label>Street address</label>
                    <input
                      type="text"
                      value={streetAddress || ''}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="Street address"
                    ></input>
                    <div className="flex gap-2 ">
                        <div>
                            <label>Pin Code</label>
                            <input
                                type="text"
                                value={postalCode || ''}
                                onChange={(e) => setPostalCode(e.target.value)}
                                placeholder="Postal code"
                            ></input>
                        </div>
                        <div>
                            <label>City</label>
                            <input
                                type="text"
                                value={city || ''}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                            ></input>
                        </div>
                    </div>
                    <label>Country</label>
                    <input
                      type="text"
                      value={country || ''}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Country"
                    ></input>
                    <div >
                    <label className="p-2 gap-2  inline-flex items-center mb-2 cursor-pointer" htmlFor="adminCb">
                        <input id="adminCb" type="checkbox" className="cursor-pointer" value={'1'} checked={admin} onChange={e=>setAdmin(e.target.checked)}></input>
                        <span>Admin</span>
                    </label>
                        
                        
                    </div>
                    <button type="submit" onClick={handleProfileInfoUpdate}>Save</button>
                  </form>
                </div>
              </div>
            </section>
    );
}