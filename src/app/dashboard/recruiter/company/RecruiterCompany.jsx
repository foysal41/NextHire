"use client";

import React, { useEffect, useState } from "react";
import { Card, Input, Button } from "@heroui/react";
import { Icon } from "@gravity-ui/uikit";
import { Xmark, MapPin, ArrowUpFromLine, Pencil } from "@gravity-ui/icons";
import Image from "next/image";
import { toast } from "react-toastify";
import { createCompany } from "@/lib/api/companies";

const formLabelClass = "mb-2 block text-sm font-medium text-gray-700";

function RecruiterCompany({recruiter, recruiterCompany}) {
  /*
    STEP 1: Core State Section
    কেন লিখলাম?
    - companyProfile: company create/update হওয়ার পর data এখানে থাকবে
    - isEditMode: edit button চাপলে true হবে
    - errors: validation/upload error দেখানোর জন্য
    - logoUrl: ImgBB upload হওয়ার পর image URL এখানে save হবে
    - isUploading: image upload চলাকালীন loading text দেখানোর জন্য
  */
  const [companyProfile, setCompanyProfile] = useState(recruiterCompany);
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [logoUrl, setLogoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);




  /*
    STEP 2: Demo Existing Data Load
    কেন লিখলাম?
    - পরে backend/database থেকে company data আনলে এখানে setCompanyProfile(data) করবে
    - এখন null রাখা হয়েছে, তাই প্রথমে Register form দেখাবে
  */
  useEffect(() => {
    const existingCompanyData = null;

    if (existingCompanyData) {
      setCompanyProfile(existingCompanyData);
      setLogoUrl(existingCompanyData.logo || "");
    }
  }, []);




  /*
    STEP 3: Image Upload Function
     কোথা থেকে কাজ করে?
     - file input এর onChange={handleLogoUpload} থেকে run হয়
     - user image select করলেই এই function automatically call হয়

  //   Flow:
  //   User selects image
  //     ↓
  //   handleLogoUpload()
  //     ↓
  //   ImgBB upload
  //     ↓
  //   setLogoUrl(data.data.url)
  // */



 const handleLogoUpload = async (e) => {
  const file = e.target.files[0];

 console.log("DEBUG 2 - Selected File:", file);

  if (!file) return;

     /*
     STEP 3.1: File validation
       কেন?
      - 5MB এর বেশি image হলে upload না করার জন্য
    */

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        logo: "File size exceeds 5MB limit",
      }));

      console.log("DEBUG 3 - File too large"); // todo - add toast message is file too large
      return;
    }

    setIsUploading(true);



    /*
      STEP 3.2: FormData তৈরি
      কেন?
      - ImgBB image file FormData format এ নেয়
    */

    const imageData = new FormData();
    imageData.append("image", file);

    try {
      const imageUploadKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

      console.log("DEBUG 4 - ImgBB API Key Exists:", !!imageUploadKey);

      if (!imageUploadKey) {
        throw new Error("ImgBB API key missing. Check .env.local");
      }



      /*
        STEP 3.3: ImgBB API call
        এখান থেকেই actual upload হচ্ছে
      */
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageUploadKey}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const data = await response.json();

      console.log("DEBUG 5 - ImgBB Full Response:", data);


      /*
        STEP 3.4: Upload success হলে URL save
        কেন?
        - database এ file না, image URL save করবো
      */



      if (data.success) {
        setLogoUrl(data.data.url);

        setErrors((prev) => ({
          ...prev,
          logo: "",
        }));

        console.log("DEBUG 6 - Uploaded Logo URL:", data.data.url);
      } else {
        setErrors((prev) => ({
          ...prev,
          logo: "Upload failed. Try again.",
        }));

        console.log("DEBUG 7 - Upload failed:", data);
      }
    } catch (error) {
      console.error("DEBUG 8 - ImgBB Upload Error:", error);

      setErrors((prev) => ({
        ...prev,
        logo: "Network error during logo upload",
      }));
    } finally {
      setIsUploading(false);
    }
 };

  /*
    STEP 4: Submit Function
    কোথা থেকে কাজ করে?
    - <form onSubmit={handleSubmit}> থেকে কাজ করে
    - Register Company / Update Company button click করলে run হয়
  */


  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
      STEP 4.1: FormData দিয়ে সব input data collect
      কেন?
      -  input state আলাদা না রেখে submit এর সময় form থেকে value নিচ্ছি
    */
    const formData = new FormData(e.currentTarget);
    const companyName = formData.get("companyName");
    const industry = formData.get("industry");
    const website = formData.get("website");
    const location = formData.get("location");
    const employeeRange = formData.get("employeeRange");
    const description = formData.get("description");
    

    console.log("DEBUG 9 - Raw FormData:", {
      companyName,
      industry,
      website,
      location,
      employeeRange,
      description,
      logoUrl,
    });

    /*
      STEP 4.2: Validation
      কেন?
      - required field empty হলে submit বন্ধ করার জন্য
    */
    const newErrors = {};

    if (!companyName) newErrors.companyName = "Company name is required";
    if (!website) newErrors.website = "Website is required";
    if (!location) newErrors.location = "Location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      console.log("DEBUG 10 - Validation Errors:", newErrors);
      return;
    }

    /*
      STEP 4.3: Final company object তৈরি
      কেন?
      - backend/database এ clean object পাঠানোর জন্য
      - logo হিসেবে ImgBB uploaded URL যাচ্ছে
    */


  const companyData = {
   companyName,
       industry,
       website,
       location,
       employeeRange,
       description,
       logo: logoUrl || companyProfile?.logo || "",
       status: companyProfile?.status || "Pending",
       recruiterId: recruiter.id
    };


    const payload = await createCompany(companyData)
    if(payload.insertId){
      toast.success("Company Profile created Successfully");
    }
  //   console.log("DEBUG 11 - Final Company Data:", companyData);

    /*
      STEP 4.4: Create / Update logic
      কেন?
      - company না থাকলে create
      - company থাকলে update
    */


    if (companyProfile && isEditMode) {
      console.log("DEBUG 12 - Updating Company Profile");

      setCompanyProfile(companyData);
      setIsEditMode(false);
    } else {
      console.log("DEBUG 13 - Creating Company Profile");

      setCompanyProfile(companyData);
   }

    setErrors({});
 };

  /*
    STEP 5: Edit mode start
    কোথা থেকে কাজ করে?
    - Edit button এর onPress থেকে
  */

    
  const startEditing = () => {
    console.log("DEBUG 14 - Edit Mode Started");

    setLogoUrl(companyProfile?.logo || "");
    setIsEditMode(true);
  };

  // /*
  //   STEP 6: Cancel edit
  //   কোথা থেকে কাজ করে?
  //   - Cancel button এর onPress থেকে
  // */


  const cancelEditing = () => {
    console.log("DEBUG 15 - Edit Cancelled");

    setLogoUrl(companyProfile?.logo || "");
    setIsEditMode(false);
  };

  /*
    STEP 7: Empty Profile View
    companyProfile না থাকলে এই register form দেখাবে
    companyProfile থাকলে view mode দেখাবে
  */


  const isViewMode = companyProfile && !isEditMode;



  return (
    <section className="min-h-screen bg-white p-4 md:p-8">
      <Card className="mx-auto overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
        {/* HEADER SECTION */}
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-950">
              {companyProfile ? "Company Profile" : "Register New Company"}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {companyProfile
                ? "View or update your company profile."
                : "Enter your business details to start hiring on NextHire."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* EDIT BUTTON */}
            {companyProfile && !isEditMode && (
              <Button
                type="button"
                size="sm"
                className="bg-[#5120E2] text-white"
                startContent={<Icon data={Pencil} size={16} />}
                onPress={startEditing}
              >
                Edit
              </Button>
            )}

            <button
              type="button"
              className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <Icon data={Xmark} size={18} />
            </button>
          </div>
        </div>

        {/* FORM SECTION */}
       
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 px-6 py-7 md:grid-cols-2">
            {/* COMPANY NAME */}
            <div>
              <Input
                name="companyName"
                label="Company Name"
                placeholder="e.g. Acme Corp"
                defaultValue={companyProfile?.companyName || ""}
                isReadOnly={isViewMode}
              />

              {errors.companyName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* INDUSTRY */}
            <div>
              <label className={formLabelClass}>Industry / Category</label>

              <select
                name="industry"
                defaultValue={companyProfile?.industry || "Technology"}
                disabled={isViewMode}
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none focus:border-[#5120E2]"
              >
                <option>Technology</option>
                <option>Finance</option>
                <option>Marketing</option>
                <option>Education</option>
                <option>Healthcare</option>
              </select>
            </div>

            {/* WEBSITE */}
            <div>
              <label className={formLabelClass}>Website URL</label>

              <div className="flex h-12 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:border-[#5120E2]">
                <span className="flex items-center border-r border-gray-200 px-4 text-sm text-gray-500">
                  https://
                </span>

                <input
                  name="website"
                  defaultValue={companyProfile?.website || ""}
                  readOnly={isViewMode}
                  placeholder="www.company.com"
                  className="w-full bg-transparent px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
              </div>

              {errors.website && (
                <p className="mt-1 text-xs text-red-500">{errors.website}</p>
              )}
            </div>

            {/* LOCATION */}
            <div>
              <Input
                name="location"
                label="Location"
                placeholder="City, Country"
                startContent={<Icon data={MapPin} size={18} />}
                defaultValue={companyProfile?.location || ""}
                isReadOnly={isViewMode}
              />

              {errors.location && (
                <p className="mt-1 text-xs text-red-500">{errors.location}</p>
              )}
            </div>

            {/* EMPLOYEE RANGE */}
            <div>
              <label className={formLabelClass}>Employee Count Range</label>

              <select
                name="employeeRange"
                defaultValue={companyProfile?.employeeRange || "1-10 employees"}
                disabled={isViewMode}
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-gray-900 outline-none focus:border-[#5120E2]"
              >
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>51-200 employees</option>
                <option>201-500 employees</option>
                <option>500+ employees</option>
              </select>
            </div>

            {/* LOGO UPLOAD */}
            <div>
              <label className={formLabelClass}>Company Logo</label>

              <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-3 transition hover:border-[#5120E2]/40">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-white text-gray-500">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt="Company Logo"
                       width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Icon data={ArrowUpFromLine} size={18} />
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {isUploading ? "Uploading image..." : "Upload image"}
                  </p>

                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>

                  {errors.logo && (
                    <p className="mt-1 text-xs text-red-500">{errors.logo}</p>
                  )}
                </div>

                {/*
                  IMPORTANT:
                  এই input থেকে image upload function call হচ্ছে
                  user file select করলে handleLogoUpload run হবে
                */}
                <input
                  name="logo"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleLogoUpload}
                  disabled={isViewMode || isUploading}
                  className="hidden"
                />
              </label>
            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <label className={formLabelClass}>Brief Description</label>

              <textarea
                name="description"
                rows={5}
                defaultValue={companyProfile?.description || ""}
                readOnly={isViewMode}
                placeholder="Tell us about your company's mission and culture..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#5120E2]"
              />
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-5">
            {isEditMode && (
              <Button
                type="button"
                variant="bordered"
                className="border-gray-300 text-gray-700"
                onPress={cancelEditing}
              >
                Cancel
              </Button>
            )}

            {(!companyProfile || isEditMode) && (
              <Button
                type="submit"
                disabled={isUploading}
                className="bg-[#5120E2] px-6 font-semibold text-white"
              >
                {companyProfile ? "Update Company" : "Register Company"}
              </Button>
            )}
          </div>
        </form>
      </Card>
    </section>
  );
}


export default RecruiterCompany;
